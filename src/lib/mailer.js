import nodemailer from 'nodemailer';

function getEnv(key) {
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key];
  }
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
    return import.meta.env[key];
  }
  return undefined;
}

/**
 * Envía correos usando Zoho Mail SMTP (soporta tanto smtppro.zoho.com para dominios propios
 * como smtp.zoho.com automáticamente).
 */
export async function sendZohoMail({
  to,
  cc,
  replyTo,
  subject,
  html,
  senderName = 'AlphaSoft Innovation',
  useLegalAccount = false
}) {
  const user = (useLegalAccount && getEnv('ZOHO_LEGAL_USER')) || getEnv('ZOHO_USER') || getEnv('SMTP_USER');
  const pass = (useLegalAccount && getEnv('ZOHO_LEGAL_PASS')) || getEnv('ZOHO_PASS') || getEnv('SMTP_PASS');
  const customHost = getEnv('ZOHO_HOST') || getEnv('SMTP_HOST');
  const port = Number(getEnv('ZOHO_PORT') || getEnv('SMTP_PORT') || 465);

  if (!user || !pass) {
    throw new Error(
      'Faltan las credenciales de Zoho Mail (ZOHO_USER y ZOHO_PASS) en las variables de entorno.'
    );
  }

  // Zoho Mail para dominios personalizados (@alphasoftinnovation.com) usa smtppro.zoho.com o smtp.zoho.com
  const hostsToTry = customHost
    ? [customHost]
    : ['smtppro.zoho.com', 'smtp.zoho.com'];

  let lastError = null;

  for (const host of hostsToTry) {
    try {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: {
          user: user.trim(),
          pass: pass.trim()
        }
      });

      // Zoho exige que el remitente (from) coincida exactamente con la cuenta autenticada (user)
      const info = await transporter.sendMail({
        from: `"${senderName}" <${user.trim()}>`,
        to: Array.isArray(to) ? to.join(', ') : to,
        ...(cc ? { cc: Array.isArray(cc) ? cc.join(', ') : cc } : {}),
        ...(replyTo ? { replyTo } : {}),
        subject,
        html
      });

      return { success: true, messageId: info.messageId, host };
    } catch (err) {
      lastError = err;
      console.error(`[Zoho SMTP Error con ${host}]:`, err?.message || err);
    }
  }

  throw lastError;
}
