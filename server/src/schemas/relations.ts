import { relations } from 'drizzle-orm';
import { comments, evaluations, spots, users } from './';

export const userRelations = relations(users, ({ many }) => ({
    spots: many(spots), // Un user peut avoir plusieurs spots
    comments: many(evaluations), // Un user peut avoir plusieurs commentaires
}));

export const commentRelations = relations(comments, ({ one }) => ({
    user: one(users, {
        // Le nom de la table est ref ici, un commentaire lié à 1 seul user
        // 1erement, on recup la colonne qui fait ref à users dans la table comment
        fields: [comments.authorId],
        // 2emement on recup la colonne/table qui fait ref à la colonne authorId de la table comments
        references: [users.id],
    }),
}));

export const spotRelations = relations(spots, ({ one, many }) => ({
    // Un spot n'a qu'un seul user (créateur)
    user: one(users, {
        fields: [spots.userId],
        references: [users.id],
    }),
    comments: many(evaluations), // Un spot peut avoir plusieurs commentaires
}));

export const evaluationRelation = relations(evaluations, ({ one, many }) => ({
    // Une evalution n'est faite que par un seul user
    user: one(users, {
        fields: [evaluations.userId],
        references: [users.id],
    }),
    comments: many(comments),
}));
