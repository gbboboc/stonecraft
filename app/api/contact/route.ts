import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/resend';

export async function POST(request: Request) {
  console.log('Contact API route called');
  
  try {
    const body = await request.json();
    console.log('Received request body:', { 
      ...body, 
      captchaToken: body.captchaToken ? 'token-hidden' : 'no-token' 
    });

    const { name, email, message, captchaToken } = body;

    // Basic validation
    if (!name || !email || !message) {
      console.log('Missing required fields');
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate captcha token here if needed
    
    const contactEmail = process.env.CONTACT_EMAIL;
    if (!contactEmail) {
      console.error('CONTACT_EMAIL is missing in environment variables');
      return NextResponse.json(
        { error: 'Email service is not configured properly' },
        { status: 500 }
      );
    }
    
    console.log('Attempting to send email with:', {
      to: contactEmail,
      from: 'onboarding@resend.dev',
      subject: `Mesaj nou de la ${name}`,
      reply_to: email
    });
    
    try {
      const { data, error } = await sendEmail({
        to: contactEmail,
        subject: `Mesaj nou de la ${name}`,
        replyTo: email,
        text: `
Nume: ${name}
Email: ${email}

Mesaj:
${message}
        `,
      });

      if (error) {
        console.error('Resend error:', error);
        return NextResponse.json(
          { error: `Failed to send email: ${error.message}` },
          { status: 500 }
        );
      }

      console.log('Email sent successfully:', data);
      return NextResponse.json(
        { success: true, data },
        { status: 200 }
      );
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
} 