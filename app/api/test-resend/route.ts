import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    // Încercăm să trimitem un email de test
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'gabimelkakris@gmail.com',
      subject: 'Test Resend',
      text: 'Acesta este un email de test pentru a verifica funcționalitatea Resend.',
    });

    if (error) {
      console.error('Eroare Resend:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Email trimis cu succes!',
      data 
    });
  } catch (error) {
    console.error('Eroare server:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Eroare internă server' 
    }, { status: 500 });
  }
} 