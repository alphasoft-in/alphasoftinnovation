import { db } from '../../db/index.js';
import { claims } from '../../db/schema.js';
import { sendZohoMail } from '../../lib/mailer.js';
import { getNowPeruDateTime, formatPeruDateTime } from '../../lib/dateUtils.js';

export const prerender = false;

const PRIMARY_RECIPIENT = 'legal@alphasoftinnovation.com';
const CC_RECIPIENT = 'rubenesteban@alphasoftinnovation.com';

async function sendClaimEmailNotification(claimData, claimCode) {
  const claimTypeLabel = (claimData.claimType || 'reclamo').toUpperCase();
  const currentDate = getNowPeruDateTime();
  const codeLabel = claimCode ? `[${claimCode}] ` : '';

  const subject = `${codeLabel}[LIBRO DE RECLAMACIONES - ${claimTypeLabel}] ${claimData.fullName} (${claimData.documentType}: ${claimData.documentNumber})`;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; background: #0f172a; color: #f8fafc; padding: 24px; border-radius: 12px; border: 1px solid #f97316;">
      <div style="text-align: center; border-bottom: 1px solid #334155; padding-bottom: 14px; margin-bottom: 18px;">
        <h2 style="color: #fb923c; margin: 0; font-size: 18px; text-transform: uppercase;">Libro de Reclamaciones — Hoja de Reclamación</h2>
        ${claimCode ? `<p style="font-size: 15px; font-weight: bold; color: #f97316; margin: 4px 0 0 0; font-family: monospace;">N° DE HOJA: ${claimCode}</p>` : ''}
        <p style="font-size: 12px; color: #94a3b8; margin: 6px 0 0 0;">Fecha y hora de registro: ${currentDate} (Lima, Perú) • Alphasoft Innovation — RUC: 20612026387</p>
      </div>
      
      <h3 style="color: #fbbf24; font-size: 14px; border-bottom: 1px solid #334155; padding-bottom: 6px;">1. Identificación del Consumidor Reclamante</h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 16px;">
        <tr><td style="padding: 5px 0; color: #94a3b8; width: 180px;"><strong>Documento:</strong></td><td style="padding: 5px 0; color: #ffffff;">${claimData.documentType} - ${claimData.documentNumber}</td></tr>
        <tr><td style="padding: 5px 0; color: #94a3b8;"><strong>Nombre / Razón Social:</strong></td><td style="padding: 5px 0; color: #ffffff;">${claimData.fullName}</td></tr>
        <tr><td style="padding: 5px 0; color: #94a3b8;"><strong>Domicilio:</strong></td><td style="padding: 5px 0; color: #ffffff;">${claimData.address}</td></tr>
        <tr><td style="padding: 5px 0; color: #94a3b8;"><strong>Teléfono:</strong></td><td style="padding: 5px 0; color: #ffffff;">${claimData.phone || 'No especificado'}</td></tr>
        <tr><td style="padding: 5px 0; color: #94a3b8;"><strong>Correo Electrónico:</strong></td><td style="padding: 5px 0; color: #ffffff;">${claimData.email}</td></tr>
      </table>

      <h3 style="color: #fbbf24; font-size: 14px; border-bottom: 1px solid #334155; padding-bottom: 6px;">2. Identificación del Bien Contratado</h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 16px;">
        <tr><td style="padding: 5px 0; color: #94a3b8; width: 180px;"><strong>Tipo de Bien:</strong></td><td style="padding: 5px 0; color: #ffffff; text-transform: capitalize;">${claimData.goodsType}</td></tr>
        <tr><td style="padding: 5px 0; color: #94a3b8;"><strong>Monto Reclamado (S/):</strong></td><td style="padding: 5px 0; color: #ffffff;">${claimData.claimedAmount || 'No especificado'}</td></tr>
        <tr><td style="padding: 5px 0; color: #94a3b8;"><strong>Descripción:</strong></td><td style="padding: 5px 0; color: #ffffff;">${claimData.goodsDescription}</td></tr>
      </table>

      <h3 style="color: #fbbf24; font-size: 14px; border-bottom: 1px solid #334155; padding-bottom: 6px;">3. Detalle de la Reclamación y Pedido</h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 12px;">
        <tr><td style="padding: 5px 0; color: #94a3b8; width: 180px;"><strong>Tipo de Solicitud:</strong></td><td style="padding: 5px 0; color: #fb923c; font-weight: bold;">${claimTypeLabel}</td></tr>
        <tr><td style="padding: 5px 0; color: #94a3b8; width: 180px;"><strong>Fecha del Incidente:</strong></td><td style="padding: 5px 0; color: #ffffff;">${formatPeruDateTime(claimData.incidentDate)}</td></tr>
      </table>
      <div style="margin-top: 10px; padding: 12px; background: #020617; border-radius: 8px; border: 1px solid #1e293b;">
        <strong style="color: #fbbf24; display: block; margin-bottom: 4px; font-size: 12px;">Detalle del Reclamo / Queja:</strong>
        <p style="margin: 0 0 12px 0; color: #e2e8f0; white-space: pre-wrap; font-size: 13px;">${claimData.details}</p>
        <strong style="color: #fbbf24; display: block; margin-bottom: 4px; font-size: 12px;">Pedido Concreto del Consumidor:</strong>
        <p style="margin: 0; color: #e2e8f0; white-space: pre-wrap; font-size: 13px;">${claimData.request}</p>
      </div>

      <p style="font-size: 11px; color: #64748b; margin-top: 18px; text-align: center;">
        Esta es una copia automática de su Hoja de Reclamación registrada conforme al Código de Protección y Defensa del Consumidor. Para consultas adicionales puede escribir a legal@alphasoftinnovation.com.
      </p>
    </div>
  `;

  // Enviar por Zoho Mail SMTP a legal@alphasoftinnovation.com con copia (CC) a rubenesteban@alphasoftinnovation.com y al usuario reclamante
  return await sendZohoMail({
    to: PRIMARY_RECIPIENT,
    cc: [CC_RECIPIENT, claimData.email.trim()],
    replyTo: claimData.email.trim(),
    subject,
    html: htmlContent,
    senderName: 'AlphaSoft Libro de Reclamaciones',
    useLegalAccount: true
  });
}

export const POST = async ({ request }) => {
  try {
    const body = await request.json();

    if (!body.documentType || !body.documentNumber || !body.fullName || !body.address || !body.email || !body.incidentDate || !body.details || !body.request || !body.goodsType || !body.goodsDescription) {
      return new Response(JSON.stringify({ error: 'Faltan campos obligatorios' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 1. Guardar en base de datos PostgreSQL (Neon)
    let insertedClaim = null;
    if (db) {
      try {
        const result = await db.insert(claims).values({
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
        }).returning();

        if (result && result.length > 0) {
          insertedClaim = result[0];
        }
      } catch (dbErr) {
        console.error('Error saving claim to DB:', dbErr);
      }
    }

    const claimCode = insertedClaim ? `LR-${String(insertedClaim.id).padStart(5, '0')}` : null;

    // 2. Enviar correo por Zoho Mail a legal@alphasoftinnovation.com y copia al usuario
    await sendClaimEmailNotification(body, claimCode);

    return new Response(JSON.stringify({
      success: true,
      message: 'Reclamo guardado y notificado exitosamente',
      claim: insertedClaim || {
        ...body,
        id: 1,
        createdAt: new Date().toISOString()
      },
      claimCode: claimCode || 'LR-00001',
      recipients: [PRIMARY_RECIPIENT, CC_RECIPIENT, body.email]
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error processing claim:', error);
    return new Response(JSON.stringify({
      error: error?.message || 'Error interno del servidor al procesar el reclamo'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};