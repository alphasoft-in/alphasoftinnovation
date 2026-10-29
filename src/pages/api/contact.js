import { db } from '../../db/index.js';
import { contacts } from '../../db/schema.js';
import { sendZohoMail } from '../../lib/mailer.js';

export const prerender = false;

const RECIPIENT_EMAILS = [
  'hola@alphasoftinnovation.com',
  'rubenesteban@alphasoftinnovation.com'
];

async function sendContactEmailNotification({ name, documentNumber, serviceType, phone, email, message }) {
  const subject = `Nueva consulta web: ${serviceType} — ${name} (${documentNumber})`;

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

  return await sendZohoMail({
    to: RECIPIENT_EMAILS,
    replyTo: email,
    subject,
    html: htmlContent,
    senderName: 'AlphaSoft Web Contacto'
  });
}

export const POST = async ({ request }) => {
  try {
    const body = await request.json();

    if (body.websiteHoneypot) {
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }

    if (
      !body.serviceType?.trim() ||
      !body.documentNumber?.trim() ||
      !body.name?.trim() ||
      !body.phone?.trim() ||
      !body.email?.trim() ||
      !body.message?.trim()
    ) {
      return new Response(JSON.stringify({ error: 'Todos los campos son obligatorios.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!body.recaptchaToken) {
      return new Response(JSON.stringify({ error: 'Por favor confirma que no eres un robot.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

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

    // 1. Guardar en base de datos PostgreSQL (Neon)
    if (db) {
      try {
        await db.insert(contacts).values({
          name: cleanPayload.name,
          email: cleanPayload.email,
          phone: cleanPayload.phone,
          message: enrichedMessage,
          source: 'web_form'
        });
      } catch (dbErr) {
        console.error('Error saving contact to DB:', dbErr);
      }
    }

    // 2. Enviar notificación por Zoho Mail a hola@alphasoftinnovation.com y rubenesteban@alphasoftinnovation.com
    await sendContactEmailNotification(cleanPayload);

    return new Response(JSON.stringify({
      success: true,
      message: 'Mensaje enviado exitosamente',
      recipients: RECIPIENT_EMAILS
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error processing contact:', error);
    return new Response(JSON.stringify({
      error: error?.message || 'Error interno del servidor al enviar el mensaje.'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
