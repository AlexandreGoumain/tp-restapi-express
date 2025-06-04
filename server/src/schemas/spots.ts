import { pgTable, uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core';

import { users } from './users';

export const spots = pgTable('spot', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id')
        .references(() => users.id, { onDelete: 'cascade' })
        .notNull(),
    description: varchar('description', { length: 255 }),
    address: varchar('address', { length: 255 }),
    pictureUrl: varchar('picture_url', { length: 2048 }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    modifiedAt: timestamp('modified_at').notNull().defaultNow(),
});
