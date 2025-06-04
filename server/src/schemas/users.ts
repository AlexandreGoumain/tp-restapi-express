import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

// ici users est un schéma de la table users, qui aura 3 colonnes
export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(), // On précise la colonne id, qui sera un uuid avec une valeur par défaut aléatoire et qui sera la primary key de la table
    email: varchar("email", { length: 255 }).notNull().unique(),
    username: varchar("username", { length: 255 }).notNull().unique(), // On précise la colonne username qui est un varchar de taille 255 et non nul
    password: varchar("password", { length: 255 }).notNull()
})