import { relations } from 'drizzle-orm';
import { evaluations, spots, users } from './';
import { favorites } from './favorites';

export const userRelations = relations(users, ({ many }) => ({
    spots: many(spots), // Un user peut avoir plusieurs spots
    evaluations: many(evaluations), // Un user peut avoir plusieurs commentaires
    favorites: many(favorites), // Un user peut avoir plusieurs favoris
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
        fields: [evaluations.userId],
        references: [users.id],
    }),
    // Une evaluation est faite pour un seul spot
    spot: one(spots, {
        fields: [evaluations.spotId],
        references: [spots.id],
    }),
}));

export const favoriteRelation = relations(favorites, ({ one }) => ({
    // Un favori n'est fait que par un seul user
    user: one(users, {
        fields: [favorites.userId],
        references: [users.id],
    }),
    // Un favori est fait pour un seul spot
    spot: one(spots, {
        fields: [favorites.spotId],
        references: [spots.id],
    }),
}));
