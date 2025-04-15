import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

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
    
    console.log('Attempting to send email with:', {
      to: process.env.CONTACT_EMAIL,
      from: 'onboarding@resend.dev',
      subject: `Mesaj nou de la ${name}`,
      reply_to: email
    });
    
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [process.env.CONTACT_EMAIL as string],
      subject: `Mesaj nou de la ${name}`,
      reply_to: email,
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
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
} 