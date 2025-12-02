export async function sendWaitlistConfirmationEmail(to: string) {
  // TODO: Wire this to your real email provider (Postmark, Resend, Mailgun...)
  console.log(`[waitlist] Confirmation email would be sent to ${to}`);
}

export async function sendContactNotificationEmail(payload: {
  email: string;
  message: string;
}) {
  console.log(
    `[contact] New contact submission from ${payload.email}: ${payload.message}`
  );
}

export async function sendNewsletterSubscriptionEmail(to: string) {
  console.log(`[newsletter] New subscriber: ${to}`);
}
