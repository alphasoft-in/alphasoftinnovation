import crypto from 'node:crypto';
import { desc, eq } from 'drizzle-orm';
import { db } from '../../db/index.js';
import { claims, contacts, scans } from '../../db/schema.js';
import { sendZohoMail } from '../../lib/mailer.js';

export const prerender = false;

function getEnv(key, fallback = '') {
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key];
  }
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
    return import.meta.env[key];
  }
  return fallback;
}

const ADMIN_EMAIL = getEnv('ADMIN_EMAIL', 'rtipiani@gmail.com').toLowerCase().trim();
const ADMIN_PASSWORD = getEnv('ADMIN_PASSWORD', 'admin123');
const SECRET_SALT = getEnv('ADMIN_SECRET', 'alphasoft_superadmin_secret_2026');

function generateToken(email) {
  const payload = `${email.toLowerCase().trim()}:${ADMIN_PASSWORD}`;
  const hmac = crypto.createHmac('sha256', SECRET_SALT).update(payload).digest('hex');
  return `${Buffer.from(email.toLowerCase().trim()).toString('base64')}.${hmac}`;
}

function verifyToken(token) {
  if (!token || typeof token !== 'string' || !token.includes('.')) return false;
  const [b64Email] = token.split('.');
  try {
    const email = Buffer.from(b64Email, 'base64').toString('utf-8').toLowerCase().trim();
    if (email !== ADMIN_EMAIL) return false;
    const expected = generateToken(email);
    return token === expected;
  } catch {
    return false;
  }
}

function getAuthToken(request) {
  const authHeader = request.headers.get('authorization') || '';
  if (authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7).trim();
  }
  return '';
}

// POST: Login de Superadministrador
export const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const email = (body.email || '').toLowerCase().trim();
    const password = body.password || '';

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const token = generateToken(email);
      return new Response(
        JSON.stringify({
          success: true,
          token,
          user: {
            email: ADMIN_EMAIL,
            role: 'Superadministrador'
          }
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Credenciales inválidas. Verifica tu correo de superadministrador y contraseña.' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Error al procesar el inicio de sesión.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

// GET: Obtener todos los reclamos, contactos y escaneos
export const GET = async ({ request }) => {
  const token = getAuthToken(request);
  if (!verifyToken(token)) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    if (!db) {
      return new Response(
        JSON.stringify({
          error: 'La base de datos (DATABASE_URL) no está configurada en este entorno.',
          claims: [],
          contacts: [],
          scans: []
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const [claimsList, contactsList, scansList] = await Promise.all([
      db.select().from(claims).orderBy(desc(claims.createdAt)),
      db.select().from(contacts).orderBy(desc(contacts.createdAt)),
      db.select().from(scans).orderBy(desc(scans.createdAt))
    ]);

    return new Response(
      JSON.stringify({
        success: true,
        claims: claimsList,
        contacts: contactsList,
        scans: scansList
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, no-cache, must-revalidate'
        }
      }
    );
  } catch (error) {
    console.error('Error fetching admin data:', error);
    return new Response(
      JSON.stringify({ error: 'Error al consultar la base de datos: ' + (error?.message || '') }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

// PATCH: Actualizar estado y respuesta oficial de un Reclamo / Queja (Sección 4)
export const PATCH = async ({ request }) => {
  const token = getAuthToken(request);
  if (!verifyToken(token)) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const body = await request.json();
    const { id, status, providerResponse, sendEmailToCustomer } = body;

    if (!id) {
      return new Response(JSON.stringify({ error: 'ID de reclamo requerido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const responseDate = new Intl.DateTimeFormat('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(new Date());

    if (db) {
      await db
        .update(claims)
        .set({
          status: status || 'resolved',
          providerResponse: providerResponse || null,
          providerResponseDate: providerResponse ? responseDate : null
        })
        .where(eq(claims.id, Number(id)));
    }

    // Si se solicita enviar la respuesta oficial por correo al consumidor
    let emailSent = false;
    let emailError = null;

    if (sendEmailToCustomer && providerResponse && body.customerEmail) {
      try {
        const claimCode = `LR-${String(id).padStart(5, '0')}`;
        const claimTypeLabel = (body.claimType || 'reclamo').toUpperCase();
        const subject = `Respuesta Oficial a su ${claimTypeLabel} (${claimCode}) — AlphaSoft Innovation`;

        const htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; background: #0f172a; color: #f8fafc; padding: 24px; border-radius: 12px; border: 1px solid #f97316;">
            <div style="border-bottom: 1px solid #334155; padding-bottom: 12px; margin-bottom: 16px;">
              <h2 style="color: #fb923c; margin: 0; font-size: 18px;">Respuesta a Hoja de Reclamación ${claimCode}</h2>
              <p style="font-size: 12px; color: #94a3b8; margin: 6px 0 0 0;">Fecha de respuesta: ${responseDate} • AlphaSoft Innovation — RUC: 20612026387</p>
            </div>
            <p style="font-size: 13px; color: #e2e8f0;">Estimado(a) <strong>${body.fullName || 'Consumidor'}</strong>,</p>
            <p style="font-size: 13px; color: #cbd5e1; line-height: 1.5;">
              Por medio de la presente le comunicamos las observaciones y acciones adoptadas respecto a su ${claimTypeLabel.toLowerCase()} registrado en nuestro Libro de Reclamaciones:
            </p>
            <div style="margin: 16px 0; padding: 14px; background: #020617; border-radius: 8px; border: 1px solid #f97316;">
              <strong style="color: #fbbf24; display: block; margin-bottom: 6px; font-size: 12px;">4. Observaciones y Acciones Adoptadas por el Proveedor:</strong>
              <p style="margin: 0; color: #ffffff; white-space: pre-wrap; font-size: 13px; line-height: 1.5;">${providerResponse}</p>
            </div>
            <p style="font-size: 11px; color: #64748b; margin-top: 18px; text-align: center;">
              Atentamente,<br/>Área Legal — AlphaSoft Innovation Technology (legal@alphasoftinnovation.com)
            </p>
          </div>
        `;

        await sendZohoMail({
          to: body.customerEmail.trim(),
          cc: ['legal@alphasoftinnovation.com', 'rubenesteban@alphasoftinnovation.com'],
          replyTo: 'legal@alphasoftinnovation.com',
          subject,
          html: htmlContent,
          senderName: 'AlphaSoft Área Legal',
          useLegalAccount: true
        });
        emailSent = true;
      } catch (err) {
        emailError = err?.message || 'No se pudo enviar el correo';
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        providerResponseDate: responseDate,
        emailSent,
        emailError
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error updating claim:', error);
    return new Response(
      JSON.stringify({ error: 'Error al actualizar el reclamo.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

