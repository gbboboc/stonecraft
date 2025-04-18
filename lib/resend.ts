import { Resend } from 'resend';

// Verifică dacă cheia API există
const apiKey = process.env.RESEND_API_KEY;
if (!apiKey) {
  console.error('RESEND_API_KEY is missing in environment variables');
}

// Creează o instanță Resend doar dacă cheia API există
export const resend = apiKey ? new Resend(apiKey) : null;

// Funcție helper pentru a trimite emailuri
export async function sendEmail({ to, subject, text, replyTo }: {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
}) {
  if (!resend) {
    throw new Error('Resend client is not initialized properly');
  }

  return resend.emails.send({
    from: 'onboarding@resend.dev',
    to: [to],
    subject,
    reply_to: replyTo,
    text,
  });
} 