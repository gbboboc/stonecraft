import { Resend } from 'resend';

// Hardcodăm temporar cheia API pentru a rezolva problema de build
const apiKey = 're_Sub486y8_2xcgazzpXoqAJQmrEXscge4t';

// Creează o instanță Resend
export const resend = new Resend(apiKey);

// Funcție helper pentru a trimite emailuri
export async function sendEmail({ to, subject, text, replyTo }: {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
}) {
  return resend.emails.send({
    from: 'onboarding@resend.dev',
    to: [to],
    subject,
    reply_to: replyTo,
    text,
  });
} 