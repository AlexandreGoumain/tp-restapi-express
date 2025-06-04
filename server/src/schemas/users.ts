import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";


export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    username: varchar("username", { length: 50 }).notNull().unique(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull().unique(),
    pictureUrl: varchar("picture_url", { length: 2048 }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    modifiedAt: timestamp("modified_at").notNull().defaultNow(),
});