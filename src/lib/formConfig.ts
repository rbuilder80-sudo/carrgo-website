/**
 * Form Submission Configuration — Carrgo Resend endpoint
 *
 * Forms post to a server-side function so the Resend API key is never exposed
 * in the public browser bundle. On Netlify this lives at:
 * /.netlify/functions/send-form
 *
 * For any other hosting route, set VITE_FORM_ENDPOINT at build time to the
 * serverless endpoint URL.
 */

export const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || '/.netlify/functions/send-form';

export const SUPPORT_EMAIL = 'support@carrgo.co.uk';

export interface FormSubmissionState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

/**
 * Submit Carrgo website form data through the private Resend backend.
 *
 * @param formType - 'Contact Enquiry' or 'Quote Request'
 * @param fields - Object of field name → value pairs
 */
export async function submitCarrgoForm(
  formType: string,
  fields: Record<string, string>
): Promise<{ success: boolean; error?: string }> {
  const payload = {
    formType,
    ...fields,
  };

  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => null) as { error?: string } | null;

    if (response.ok && !data?.error) {
      return { success: true };
    }

    return {
      success: false,
      error: data?.error || `Submission failed (${response.status})`,
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Network error. Please try again.',
    };
  }
}

// Backwards-compatible alias used by existing pages.
export const submitToFormspree = submitCarrgoForm;
