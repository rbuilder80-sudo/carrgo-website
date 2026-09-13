export const SUPPORT_EMAIL = 'support@carrgo.co.uk';
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${SUPPORT_EMAIL}`;

export interface FormSubmissionState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

export type FormDeliveryMethod = 'formsubmit';

interface FormSubmitResult {
  success: boolean;
  error?: string;
  deliveryMethod?: FormDeliveryMethod;
}

export async function submitToFormspree(
  formType: string,
  fields: Record<string, string>
): Promise<FormSubmitResult> {
  const replyTo = fields.email || fields.from_email || fields.Email || fields.reply_to || '';
  const sourcePage = typeof window !== 'undefined'
    ? `${window.location.origin}${window.location.pathname}`
    : 'carrgo.co.uk';

  const payload = new FormData();
  payload.append('_subject', `${formType} from carrgo.co.uk`);
  payload.append('_template', 'table');
  payload.append('_captcha', 'false');
  payload.append('_replyto', replyTo);
  payload.append('form_type', formType);
  payload.append('source_page', fields.source_page || sourcePage);
  payload.append('submitted_at', new Date().toISOString());

  Object.entries(fields).forEach(([key, value]) => {
    if (key === 'source_page') return;
    const label = key
      .replace(/[_-]+/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
    payload.append(label, value);
  });

  try {
    const response = await fetch(FORMSUBMIT_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: payload,
    });

    if (response.ok) {
      return { success: true, deliveryMethod: 'formsubmit' };
    }

    const body = await response.json().catch(() => null);
    return {
      success: false,
      error: body?.error || `Submission failed (${response.status})`,
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error
        ? err.message
        : 'Submission could not be sent. Please email support@carrgo.co.uk.',
    };
  }
}

export function trackLead(formLabel: string, deliveryMethod: FormDeliveryMethod = 'formsubmit') {
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
  }
}
