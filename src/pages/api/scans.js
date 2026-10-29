import { db } from '../../db/index.js';
import { scans } from '../../db/schema.js';

export const prerender = false;

export const POST = async ({ request }) => {
  try {
    const body = await request.json();

    if (!body.url?.trim()) {
      return new Response(JSON.stringify({ error: 'La URL es obligatoria.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (db) {
      await db.insert(scans).values({
        url: body.url.trim(),
        score: body.score !== undefined ? String(body.score) : null,
        issues: body.issues ? JSON.stringify(body.issues) : null
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error saving scan:', error);
    return new Response(JSON.stringify({ error: 'Error al guardar el escaneo.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

