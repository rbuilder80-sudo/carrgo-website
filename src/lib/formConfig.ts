export const SUPPORT_EMAIL = 'support@carrgo.co.uk';

export interface FormSubmissionState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

export async function submitToFormspree(
  formType: string,
  fields: Record<string, string>
): Promise<{ success: boolean; error?: string }> {
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
      return { success: true };
    }

    const body = await response.json().catch(() => null);
    return {
      success: false,
      error: body?.error || `Submission failed (${response.status})`,
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Network error. Please try again.',
    };
  }
}
