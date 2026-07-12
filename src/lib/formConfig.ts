/**
 * Form Submission Configuration — FormSubmit.co
 * 
 * FormSubmit.co is a free form backend that requires ZERO account setup.
 * No registration, no API keys, no dashboard — just point your form to their endpoint.
 * 
 * HOW IT WORKS:
 * 1. We POST form data to https://formsubmit.co/ajax/support@carrgo.co.uk
 * 2. FormSubmit forwards the submission to support@carrgo.co.uk
 * 3. The user stays on the page (no redirect) thanks to the AJAX endpoint
 * 
 * FREE TIER: Unlimited submissions (fair use: ~1,000+/month)
 * No paid plan needed for typical business use.
 * 
 * SETUP: None. Already configured below. Forms work immediately.
 */

export const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/support@carrgo.co.uk';

export const SUPPORT_EMAIL = 'support@carrgo.co.uk';

export interface FormSubmissionState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

/**
 * Submit form data to FormSubmit.co via their AJAX endpoint.
 * No account, no API key, no backend required.
 * 
 * @param formType - 'Contact Enquiry' or 'Quote Request' (added as subject)
 * @param fields - Object of field name → value pairs
 */
export async function submitToFormspree(
  formType: string,
  fields: Record<string, string>
): Promise<{ success: boolean; error?: string }> {
  const payload = {
    _subject: `New ${formType} — Carrgo Website`,
    _template: 'table',           // Nicely formatted email
    _captcha: 'false',            // No captcha needed
    _replyto: fields.from_email || fields.email || '',
    ...fields,
  };

  try {
    const response = await fetch(FORMSUBMIT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return { success: true };
    }

    const text = await response.text().catch(() => '');
    return {
      success: false,
      error: text || `Submission failed (${response.status})`,
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Network error. Please try again.',
    };
  }
}
