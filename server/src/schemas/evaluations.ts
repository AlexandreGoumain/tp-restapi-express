import {
    pgTable,
    smallint,
    timestamp,
    uuid,
    varchar,
} from 'drizzle-orm/pg-core';

import { spots, users } from './';

export const evaluations = pgTable('evaluations', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id')
        .references(() => users.id)
        .references(() => users.id, { onDelete: 'cascade' }),
    spotId: uuid('spot_id')
        .references(() => spots.id)
        .references(() => spots.id, { onDelete: 'cascade' }),
    comment: varchar('comment', { length: 255 }),
    note: smallint('note').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    modifiedAt: timestamp('modified_at').notNull().defaultNow(),
});
