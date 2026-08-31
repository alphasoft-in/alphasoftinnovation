import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema.js';

// process.env is available during build time / scripts
// import.meta.env is available during Astro runtime
const connectionString = typeof process !== 'undefined' && process.env.DATABASE_URL 
  ? process.env.DATABASE_URL 
  : import.meta.env?.DATABASE_URL;

const sql = neon(connectionString);
export const db = drizzle(sql, { schema });
