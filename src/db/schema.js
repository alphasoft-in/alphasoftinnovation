import { pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const contacts = pgTable('contacts', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }),
  message: text('message').notNull(),
  source: varchar('source', { length: 50 }).default('web_form'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const scans = pgTable('scans', {
  id: serial('id').primaryKey(),
  url: varchar('url', { length: 500 }).notNull(),
  score: varchar('score', { length: 10 }),
  issues: text('issues'), // JSON stringified issues
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const claims = pgTable('claims', {
  id: serial('id').primaryKey(),
  documentType: varchar('document_type', { length: 50 }).notNull(),
  documentNumber: varchar('document_number', { length: 50 }).notNull(),
  fullName: varchar('full_name', { length: 255 }).notNull(),
  address: varchar('address', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  
  // Identificación del Bien
  goodsType: varchar('goods_type', { length: 20 }).notNull(), // 'producto' or 'servicio'
  claimedAmount: varchar('claimed_amount', { length: 50 }),
  goodsDescription: text('goods_description').notNull(),

  // Detalle de Reclamo
  claimType: varchar('claim_type', { length: 50 }).notNull(), // 'reclamo' or 'queja'
  incidentDate: varchar('incident_date', { length: 20 }).notNull(),
  details: text('details').notNull(),
  request: text('request').notNull(),
  
  status: varchar('status', { length: 50 }).default('pending').notNull(),
  
  // Uso exclusivo de la empresa
  providerResponseDate: varchar('provider_response_date', { length: 50 }),
  providerResponse: text('provider_response'),

  createdAt: timestamp('created_at').defaultNow().notNull(),
});
