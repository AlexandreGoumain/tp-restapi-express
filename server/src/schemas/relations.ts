import { relations } from 'drizzle-orm';
import { comments, spots, users } from './';

export const userRelations = relations(users, ({ many }) => ({
    spots: many(spots), // un user peut avoir plusieurs posts
    comments: many(comments), // un user peut avoir plusieurs commentaires
}));

export const commentRelations = relations(comments, ({ one }) => ({
    user: one(users, {
        // Le nom de la table est ref ici, un commentaire lié à 1 seul user
        // 1erement, on recup la colonne qui fait ref à users dans la table comment
        fields: [comments.authorId],
        // 2emement on recup la colonne/table qui fait ref à la colonne authorId de la table comments
        references: [users.id],
    }),

    spot: one(spots, {
        fields: [comments.spotId],
        references: [spots.id],
    }),
}));

export const spotRelation = relations(spots, ({ one, many }) => ({
    user: one(users, {
        fields: [spots.author],
        references: [users.id],
    }),
    comments: many(comments),
}));
