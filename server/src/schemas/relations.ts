import { relations } from "drizzle-orm";
import { users, comments, posts } from "./";

export const userRelations = relations(users, ({ many }) => ({
    posts: many(posts), // un user peut avoir plusieurs posts
    comments: many(comments) // un user peut avoir plusieurs commentaires
}));

export const commentRelations = relations(comments, ({ one }) => ({
    user: one(users, { // Le nom de la table est ref ici, un commentaire lié à 1 seul user
        // 1erement, on recup la colonne qui fait ref à users dans la table comment
        fields: [comments.authorId],
        // 2emement on recup la colonne/table qui fait ref à la colonne authorId de la table comments
        references: [users.id]
    }),

    post: one(posts, {
        fields: [comments.postId],
        references: [posts.id]
    })
}));

export const postRelation = relations(posts, ({ one, many }) => ({
    user: one(users, {
        fields: [posts.author],
        references: [users.id]
    }),
    comments: many(comments)
}))