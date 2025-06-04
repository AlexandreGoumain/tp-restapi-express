import { pgTable, uuid, varchar, text, timestamp } from "drizzle-orm/pg-core";

import { users } from "./users";

export const posts = pgTable("posts", {
    id: uuid("id").defaultRandom().primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    content: text("content").notNull(),
    author: uuid("author_id").references(() => users.id, { onDelete: "cascade" }).notNull(), // la colonne author_id est une relation avec la table users,
                                // on chaîne avec la méthode references avec le schéma users: notre FK est donc author_id qui fait reférence a la col id de la table users
    created_at: timestamp("created_at").defaultNow()
});