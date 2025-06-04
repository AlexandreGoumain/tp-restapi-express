import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

import { spots, users } from './';

export const comments = pgTable('comments', {
    id: uuid('id').defaultRandom().primaryKey(),
    spotId: uuid('spot_id')
        .references(() => spots.id, { onDelete: 'cascade' })
        .notNull(),
    authorId: uuid('user_id')
        .references(() => users.id, { onDelete: 'cascade' })
        .notNull(),
    content: text('content').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
});
