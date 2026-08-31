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
