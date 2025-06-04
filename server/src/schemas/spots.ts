import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { users } from './users';

export const spots = pgTable('spots', {
    id: uuid('id').defaultRandom().primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    content: text('content').notNull(),
    author: uuid('author_id')
        .references(() => users.id, { onDelete: 'cascade' })
        .notNull(), // la colonne author_id est une relation avec la table users,
    created_at: timestamp('created_at').defaultNow(),
});
