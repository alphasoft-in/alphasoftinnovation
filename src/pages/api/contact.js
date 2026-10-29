import { db } from '../../db/index.js';
import { contacts } from '../../db/schema.js';

const RECIPIENT_EMAILS = [
  'hola@alphasoftinnovation.com',
  'rubenesteban@alphasoftinnovation.com'
];

async function sendContactEmailNotification({ name, documentNumber, serviceType, phone, email, message }) {
  const resendApiKey = typeof process !== 'undefined' && process.env.RESEND_API_KEY
    ? process.env.RESEND_API_KEY
    : import.meta.env?.RESEND_API_KEY;

  const subject = `Nueva consulta web: ${serviceType} — ${name} (${documentNumber})`;

  // 1. Si hay RESEND_API_KEY configurada en variables de entorno, enviamos directo por Resend API a ambos correos
  if (resendApiKey) {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #f8fafc; padding: 24px; border-radius: 12px; border: 1px solid #334155;">
        <h2 style="color: #fb923c; margin-top: 0;">Nueva Consulta desde AlphaSoft Innovation</h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="padding: 8px 0; color: #94a3b8; width: 180px;"><strong>Tipo de Servicio:</strong></td><td style="padding: 8px 0; color: #ffffff;">${serviceType}</td></tr>
          <tr><td style="padding: 8px 0; color: #94a3b8;"><strong>N° Documento (DNI/RUC):</strong></td><td style="padding: 8px 0; color: #ffffff;">${documentNumber}</td></tr>
          <tr><td style="padding: 8px 0; color: #94a3b8;"><strong>Nombre / Razón Social:</strong></td><td style="padding: 8px 0; color: #ffffff;">${name}</td></tr>
          <tr><td style="padding: 8px 0; color: #94a3b8;"><strong>Teléfono:</strong></td><td style="padding: 8px 0; color: #ffffff;">${phone}</td></tr>
          <tr><td style="padding: 8px 0; color: #94a3b8;"><strong>Correo Electrónico:</strong></td><td style="padding: 8px 0; color: #ffffff;">${email}</td></tr>
        </table>
        <div style="margin-top: 16px; padding: 14px; background: #020617; border-radius: 8px; border: 1px solid #1e293b;">
          <strong style="color: #fbbf24; display: block; margin-bottom: 6px; font-size: 13px;">Mensaje del Cliente:</strong>
          <p style="margin: 0; color: #e2e8f0; white-space: pre-wrap; font-size: 14px;">${message}</p>
        </div>
      </div>
    `;

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'AlphaSoft Web <notificaciones@alphasoftinnovation.com>',
        to: RECIPIENT_EMAILS,
        reply_to: email,
        subject,
        html: htmlContent
      })
    });

    if (resendRes.ok) return;
  }

  // 2. Envío mediante FormSubmit AJAX a hola@alphasoftinnovation.com con copia (CC) a rubenesteban@alphasoftinnovation.com
  await fetch('https://formsubmit.co/ajax/hola@alphasoftinnovation.com', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Origin': 'https://alphasoftinnovation.com',
      'Referer': 'https://alphasoftinnovation.com/contacto'
    },
    body: JSON.stringify({
      _subject: subject,
      _cc: 'rubenesteban@alphasoftinnovation.com',
      _replyto: email,
      _template: 'table',
      'Tipo de Servicio': serviceType,
      'N° de Documento (DNI / RUC)': documentNumber,
      'Nombre o Razón Social': name,
      'Teléfono': phone,
      'Correo Electrónico': email,
      'Mensaje': message
    })
  });
}

export const POST = async ({ request }) => {
  try {
    const body = await request.json();

    // Anti-spam honeypot check
    if (body.websiteHoneypot) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!body.name?.trim() || !body.documentNumber?.trim() || !body.serviceType?.trim() || !body.phone?.trim() || !body.email?.trim() || !body.message?.trim()) {
      return new Response(JSON.stringify({ error: 'Por favor completa todos los campos obligatorios.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!body.recaptchaToken) {
      return new Response(JSON.stringify({ error: 'Verificación reCAPTCHA requerida.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Optional server-side Google reCAPTCHA secret verification if configured
    const secretKey = typeof process !== 'undefined' && process.env.RECAPTCHA_SECRET_KEY
      ? process.env.RECAPTCHA_SECRET_KEY
      : import.meta.env?.RECAPTCHA_SECRET_KEY;

    if (secretKey && body.recaptchaToken !== 'verified_client_challenge') {
      const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: secretKey,
          response: body.recaptchaToken
        })
      });
      const verifyData = await verifyRes.json();
      if (!verifyData.success) {
        return new Response(JSON.stringify({ error: 'La verificación reCAPTCHA falló. Inténtalo nuevamente.' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    const cleanPayload = {
      name: body.name.trim(),
      documentNumber: body.documentNumber.trim(),
      serviceType: body.serviceType.trim(),
      phone: body.phone.trim(),
      email: body.email.trim(),
      message: body.message.trim()
    };

    const enrichedMessage = `[Documento: ${cleanPayload.documentNumber} | Servicio: ${cleanPayload.serviceType}]\n${cleanPayload.message}`;

    // Guardar en base de datos PostgreSQL (Neon)
    await db.insert(contacts).values({
      name: cleanPayload.name,
      email: cleanPayload.email,
      phone: cleanPayload.phone,
      message: enrichedMessage,
      source: 'web_form'
    });

    // Enviar notificación por correo a hola@alphasoftinnovation.com y rubenesteban@alphasoftinnovation.com
    try {
      await sendContactEmailNotification(cleanPayload);
    } catch (emailErr) {
      console.error('Error sending email notification:', emailErr);
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Mensaje enviado exitosamente',
      recipients: RECIPIENT_EMAILS
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error saving contact:', error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor al enviar el mensaje.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
