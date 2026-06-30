// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';

// ✅ Option 1 : Utiliser Resend (recommandé pour Next.js)
// npm install resend
// Puis ajouter RESEND_API_KEY dans .env.local

// ✅ Option 2 : Utiliser Nodemailer (plus classique)
// npm install nodemailer @types/nodemailer

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // ─── Validation ──────────────────────────────────
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      );
    }

    // ─── Envoi avec Resend ───────────────────────────
    // const { Resend } = await import('resend');
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // 
    // await resend.emails.send({
    //   from: 'Portfolio <noreply@ton-domaine.com>',
    //   to: ['ton-email@email.com'],
    //   reply_to: email,
    //   subject: `[Portfolio] ${subject}`,
    //   html: `
    //     <h3>Nouveau message de contact</h3>
    //     <p><strong>Nom :</strong> ${name}</p>
    //     <p><strong>Email :</strong> ${email}</p>
    //     <p><strong>Sujet :</strong> ${subject}</p>
    //     <p><strong>Message :</strong></p>
    //     <p>${message}</p>
    //   `,
    // });

    // ─── Envoi avec Nodemailer ──────────────────────
    // const nodemailer = await import('nodemailer');
    // const transporter = nodemailer.createTransport({
    //   host: process.env.SMTP_HOST,
    //   port: parseInt(process.env.SMTP_PORT || '587'),
    //   secure: false,
    //   auth: {
    //     user: process.env.SMTP_USER,
    //     pass: process.env.SMTP_PASS,
    //   },
    // });
    // 
    // await transporter.sendMail({
    //   from: `"Portfolio" <${process.env.SMTP_FROM}>`,
    //   to: process.env.CONTACT_EMAIL,
    //   replyTo: email,
    //   subject: `[Portfolio] ${subject}`,
    //   text: `Nom: ${name}\nEmail: ${email}\nMessage: ${message}`,
    //   html: `
    //     <h3>Nouveau message de contact</h3>
    //     <p><strong>Nom :</strong> ${name}</p>
    //     <p><strong>Email :</strong> ${email}</p>
    //     <p><strong>Sujet :</strong> ${subject}</p>
    //     <p><strong>Message :</strong></p>
    //     <p>${message}</p>
    //   `,
    // });

    // ─── Mode développement (log seulement) ────────
    /* console.log('📧 Nouveau message de contact :');
    console.log(`👤 Nom: ${name}`);
    console.log(`📧 Email: ${email}`);
    console.log(`📝 Sujet: ${subject}`);
    console.log(`💬 Message: ${message}`); */

    // Simuler un délai d'envoi
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json(
      { message: 'Message envoyé avec succès' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur API contact:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}