export const SUPPORT_EMAIL = 'support@carrgo.co.uk';

export interface FormSubmissionState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

export type FormDeliveryMethod = 'api' | 'email_client';

interface FormSubmitResult {
  success: boolean;
  error?: string;
  deliveryMethod?: FormDeliveryMethod;
}

function formatEmailBody(formType: string, fields: Record<string, string>) {
  const lines = [
    `${formType} from carrgo.co.uk`,
    '',
    ...Object.entries(fields)
      .filter(([, value]) => value.trim().length > 0)
      .map(([key, value]) => `${key}: ${value}`),
  ];

  return lines.join('\n');
}

function openEmailFallback(formType: string, fields: Record<string, string>) {
  if (typeof window === 'undefined') return false;

  trackLead(`${formType.toLowerCase().replace(/\s+/g, '_')}_email_fallback`, 'email_client');

  const subject = encodeURIComponent(`${formType} from carrgo.co.uk`);
  const body = encodeURIComponent(formatEmailBody(formType, fields));
  window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
  return true;
}

export async function submitToFormspree(
  formType: string,
  fields: Record<string, string>
): Promise<FormSubmitResult> {
  try {
    const response = await fetch('/.netlify/functions/send-form-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ formType, fields }),
    });

    if (response.ok) {
      return { success: true, deliveryMethod: 'api' };
    }

    if (response.status === 404 || response.status === 405) {
      const opened = openEmailFallback(formType, fields);
      if (opened) {
        return { success: true, deliveryMethod: 'email_client' };
      }
    }

    const body = await response.json().catch(() => null);
    return {
      success: false,
      error: body?.error || `Submission failed (${response.status})`,
    };
  } catch (err) {
    const opened = openEmailFallback(formType, fields);
    if (opened) {
      return { success: true, deliveryMethod: 'email_client' };
    }

    return {
      success: false,
      error: err instanceof Error ? err.message : 'Network error. Please try again.',
    };
  }
}

export function trackLead(formLabel: string, deliveryMethod: FormDeliveryMethod = 'api') {
  const isCarrgoHost = typeof window !== 'undefined'
    && /(^|\.)carrgo\.co\.uk$/i.test(window.location.hostname);

  if (!isCarrgoHost) return;

  const analyticsWindow = window as Window & {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  };

  const eventId = `lead_${formLabel}_${deliveryMethod}`;
  try {
    const dedupeKey = `carrgo_${eventId}`;
    const deliveryDedupeKey = `carrgo_lead_${deliveryMethod}`;
    const lastTrackedAt = Number(window.sessionStorage.getItem(dedupeKey) || 0);
    const lastDeliveryTrackedAt = Number(window.sessionStorage.getItem(deliveryDedupeKey) || 0);
    const now = Date.now();
    if (now - lastTrackedAt < 3000 || now - lastDeliveryTrackedAt < 3000) return;
    window.sessionStorage.setItem(dedupeKey, String(now));
    window.sessionStorage.setItem(deliveryDedupeKey, String(now));
  } catch {
    // sessionStorage can be unavailable in strict privacy modes; still send the lead event.
  }

  analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
  analyticsWindow.gtag = analyticsWindow.gtag || ((...args: unknown[]) => {
    analyticsWindow.dataLayer?.push(args);
  });

  if (analyticsWindow.gtag) {
    analyticsWindow.gtag('event', 'generate_lead', {
      event_id: eventId,
      event_category: 'form',
      event_label: formLabel,
      form_name: formLabel,
      method: deliveryMethod,
      transport_type: 'beacon',
      value: 1,
      currency: 'GBP',
    });

    if (deliveryMethod === 'email_client') {
      analyticsWindow.gtag('event', 'email_fallback_opened', {
        event_category: 'form',
        event_label: formLabel,
        method: deliveryMethod,
        transport_type: 'beacon',
      });
    }
  }
}
