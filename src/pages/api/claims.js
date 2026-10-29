import { db } from '../../db/index.js';
import { claims } from '../../db/schema.js';

const RECIPIENT_EMAILS = [
  'legal@alphasoftinnovation.com'
];

async function sendClaimEmailNotification(claimData) {
  const resendApiKey = typeof process !== 'undefined' && process.env.RESEND_API_KEY
    ? process.env.RESEND_API_KEY
    : import.meta.env?.RESEND_API_KEY;

  const claimTypeLabel = (claimData.claimType || 'reclamo').toUpperCase();
  const subject = `[LIBRO DE RECLAMACIONES - ${claimTypeLabel}] ${claimData.fullName} (${claimData.documentType}: ${claimData.documentNumber})`;

  // 1. Envío mediante Resend API si RESEND_API_KEY está configurada
  if (resendApiKey) {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; background: #0f172a; color: #f8fafc; padding: 24px; border-radius: 12px; border: 1px solid #ef4444;">
        <h2 style="color: #f87171; margin-top: 0;">Hoja de Reclamación Virtual (${claimTypeLabel})</h2>
        <p style="font-size: 12px; color: #94a3b8; margin-bottom: 16px;">Alphasoft Innovation — RUC: 20612026387</p>
        
        <h3 style="color: #fb923c; font-size: 14px; border-bottom: 1px solid #334155; padding-bottom: 6px;">1. Identificación del Consumidor</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 16px;">
          <tr><td style="padding: 6px 0; color: #94a3b8; width: 180px;"><strong>Documento:</strong></td><td style="padding: 6px 0; color: #ffffff;">${claimData.documentType} - ${claimData.documentNumber}</td></tr>
          <tr><td style="padding: 6px 0; color: #94a3b8;"><strong>Nombre / Razón Social:</strong></td><td style="padding: 6px 0; color: #ffffff;">${claimData.fullName}</td></tr>
          <tr><td style="padding: 6px 0; color: #94a3b8;"><strong>Domicilio:</strong></td><td style="padding: 6px 0; color: #ffffff;">${claimData.address}</td></tr>
          <tr><td style="padding: 6px 0; color: #94a3b8;"><strong>Teléfono:</strong></td><td style="padding: 6px 0; color: #ffffff;">${claimData.phone || 'No especificado'}</td></tr>
          <tr><td style="padding: 6px 0; color: #94a3b8;"><strong>Correo Electrónico:</strong></td><td style="padding: 6px 0; color: #ffffff;">${claimData.email}</td></tr>
        </table>

        <h3 style="color: #fb923c; font-size: 14px; border-bottom: 1px solid #334155; padding-bottom: 6px;">2. Identificación del Bien Contratado</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 16px;">
          <tr><td style="padding: 6px 0; color: #94a3b8; width: 180px;"><strong>Tipo de Bien:</strong></td><td style="padding: 6px 0; color: #ffffff;">${claimData.goodsType}</td></tr>
          <tr><td style="padding: 6px 0; color: #94a3b8;"><strong>Monto Reclamado (S/):</strong></td><td style="padding: 6px 0; color: #ffffff;">${claimData.claimedAmount || '0.00'}</td></tr>
          <tr><td style="padding: 6px 0; color: #94a3b8;"><strong>Descripción:</strong></td><td style="padding: 6px 0; color: #ffffff;">${claimData.goodsDescription}</td></tr>
        </table>

        <h3 style="color: #fb923c; font-size: 14px; border-bottom: 1px solid #334155; padding-bottom: 6px;">3. Detalle de la Reclamación y Pedido</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 12px;">
          <tr><td style="padding: 6px 0; color: #94a3b8; width: 180px;"><strong>Tipo:</strong></td><td style="padding: 6px 0; color: #fbbf24; font-weight: bold;">${claimTypeLabel}</td></tr>
          <tr><td style="padding: 6px 0; color: #94a3b8;"><strong>Fecha del Incidente:</strong></td><td style="padding: 6px 0; color: #ffffff;">${claimData.incidentDate}</td></tr>
        </table>
        <div style="margin-top: 10px; padding: 12px; background: #020617; border-radius: 8px; border: 1px solid #1e293b;">
          <strong style="color: #fbbf24; display: block; margin-bottom: 4px; font-size: 12px;">Detalle del Reclamo / Queja:</strong>
          <p style="margin: 0 0 12px 0; color: #e2e8f0; white-space: pre-wrap; font-size: 13px;">${claimData.details}</p>
          <strong style="color: #fbbf24; display: block; margin-bottom: 4px; font-size: 12px;">Pedido Concreto del Consumidor:</strong>
          <p style="margin: 0; color: #e2e8f0; white-space: pre-wrap; font-size: 13px;">${claimData.request}</p>
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
        from: 'AlphaSoft Reclamaciones <notificaciones@alphasoftinnovation.com>',
        to: RECIPIENT_EMAILS,
        cc: [claimData.email],
        reply_to: claimData.email,
        subject,
        html: htmlContent
      })
    });

    if (resendRes.ok) return;
  }

  // 2. Envío mediante FormSubmit AJAX a legal@alphasoftinnovation.com con copia al consumidor
  await fetch('https://formsubmit.co/ajax/legal@alphasoftinnovation.com', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Origin': 'https://alphasoftinnovation.com',
      'Referer': 'https://alphasoftinnovation.com/libro-de-reclamaciones'
    },
    body: JSON.stringify({
      _subject: subject,
      _cc: claimData.email,
      _replyto: claimData.email,
      _template: 'table',
      'Tipo de Registro': claimTypeLabel,
      'Fecha del Incidente': claimData.incidentDate,
      'Tipo y N° de Documento': `${claimData.documentType} - ${claimData.documentNumber}`,
      'Nombre / Razón Social': claimData.fullName,
      'Domicilio': claimData.address,
      'Teléfono': claimData.phone || 'No especificado',
      'Correo del Consumidor': claimData.email,
      'Bien Contratado': claimData.goodsType,
      'Monto Reclamado (S/)': claimData.claimedAmount || '0.00',
      'Descripción del Bien': claimData.goodsDescription,
      'Detalle del Reclamo / Queja': claimData.details,
      'Pedido del Consumidor': claimData.request
    })
  });
}

export const POST = async ({ request }) => {
  try {
    const body = await request.json();

    // Basic server-side validation
    if (!body.documentType || !body.documentNumber || !body.fullName || !body.address || !body.email || !body.incidentDate || !body.details || !body.request || !body.goodsType || !body.goodsDescription) {
      return new Response(JSON.stringify({ error: 'Faltan campos obligatorios' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Insert into database
    await db.insert(claims).values({
      documentType: body.documentType,
      documentNumber: body.documentNumber,
      fullName: body.fullName,
      address: body.address,
      email: body.email,
      phone: body.phone || null,
      goodsType: body.goodsType,
      claimedAmount: body.claimedAmount || null,
      goodsDescription: body.goodsDescription,
      claimType: body.claimType || 'reclamo',
      incidentDate: body.incidentDate,
      details: body.details,
      request: body.request,
      status: 'pending'
    });

    // Enviar notificación por correo a hola@alphasoftinnovation.com, rubenesteban@alphasoftinnovation.com y copia al cliente
    try {
      await sendClaimEmailNotification(body);
    } catch (emailErr) {
      console.error('Error sending claim email notification:', emailErr);
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Reclamo guardado y notificado exitosamente',
      recipients: RECIPIENT_EMAILS
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error saving claim:', error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor al guardar el reclamo' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
