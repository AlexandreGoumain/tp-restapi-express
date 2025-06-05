import {
    pgTable,
    uuid,
    primaryKey
} from 'drizzle-orm/pg-core';

import { spots, users } from './';

export const favorites = pgTable('favorites', {
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),

  spotId: uuid('spot_id')
    .notNull()
    .references(() => spots.id, { onDelete: 'cascade' }),
}, (table) => [
  primaryKey({ columns: [table.userId, table.spotId] }),
]);