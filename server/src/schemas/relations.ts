import { relations } from 'drizzle-orm';
import { evaluations, spots, users } from './';

export const userRelations = relations(users, ({ many }) => ({
    spots: many(spots), // Un user peut avoir plusieurs spots
    evaluations: many(evaluations), // Un user peut avoir plusieurs commentaires
}));

export const spotRelations = relations(spots, ({ one, many }) => ({
    // Un spot n'a qu'un seul user (créateur)
    user: one(users, {
        fields: [spots.userId],
        references: [users.id],
    }),
    evaluations: many(evaluations), // Un spot peut avoir plusieurs commentaires
}));

export const evaluationRelation = relations(evaluations, ({ one }) => ({
    // Une evalution n'est faite que par un seul user
    user: one(users, {
        fields: [evaluations.authorId],
        references: [users.id],
    }),
    // Une evaluation est faite pour un seul spot
    spot: one(spots, {
        fields: [evaluations.spotId],
        references: [spots.id],
    }),
}));
