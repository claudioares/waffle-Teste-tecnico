import { 
  pgTable, serial, text, integer, timestamp, varchar, 
  uuid
} from 'drizzle-orm/pg-core';

// Tabela de Usuário (Leitor da Newsletter)
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email').notNull().unique(),
  streak: integer('streak').notNull().default(0),
  lastOpenedAt: timestamp('last_opened_at'),
});


// Tabela de Abertura (Opening)
export const openings = pgTable('openings', {
  id: uuid('id').defaultRandom().primaryKey(),
  date: timestamp('date').defaultNow(),
  postId: text('post_id').notNull(),
  utmSource: text('utm_source'),
  utmMedium: text('utm_medium'),
  utmCampaign: text('utm_campaign'),
  utmChannel: text('utm_channel'),
  userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }),
});

// Tabela de Badge (Conquista)
export const badges = pgTable('badges', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  dateEarned: timestamp('date_earned').defaultNow(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: "cascade" }),
});
