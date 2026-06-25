import { pgTable, integer, date, bigserial, primaryKey } from 'drizzle-orm/pg-core';

// Table des visites quotidiennes
export const dailyVisits = pgTable('daily_visits', {
  id: bigserial('id', { mode: 'bigint' }).primaryKey(),
  visitDate: date('visit_date').notNull().unique(),
  visitorCount: integer('visitor_count').notNull().default(1),
});

// Table du total cumulé (une seule ligne)
export const totalVisitors = pgTable('total_visitors', {
  id: integer('id').primaryKey().default(1),
  totalCount: integer('total_count').notNull().default(0),
});