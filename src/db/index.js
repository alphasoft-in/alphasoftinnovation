import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema.js';

const DEFAULT_NEON_URL =
  'postgresql://neondb_owner:npg_qD6LM8VKgHTd@ep-odd-mud-ay3tj6qq-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require';

function getConnectionString() {
  const envObj = typeof process !== 'undefined' && process.env ? process.env : {};
  const raw =
    envObj['DATABASE_URL'] ||
    envObj['POSTGRES_URL'] ||
    (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DATABASE_URL) ||
    DEFAULT_NEON_URL;

  // @neondatabase/serverless HTTP driver funciona mejor sin channel_binding=require en entornos serverless
  return raw ? raw.replace('&channel_binding=require', '').replace('?channel_binding=require&', '?') : '';
}

let cachedDb = null;

export function getDb() {
  if (cachedDb) return cachedDb;
  const conn = getConnectionString();
  if (!conn) return null;
  const sql = neon(conn);
  cachedDb = drizzle(sql, { schema });
  return cachedDb;
}

export const db = getDb();
