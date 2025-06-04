import { relations } from "drizzle-orm";
import { users, spots, evaluations } from "./";

export const userRelations = relations(users, ({ many }) => ({
    posts: many(spots), // Un user peut avoir plusieurs spots
    comments: many(evaluations) // Un user peut avoir plusieurs commentaires
}));

export const spotRelations = relations(spots, ({ one, many }) => ({
    // Un spot n'a qu'un seul user (créateur) 
    user: one(users, {
        fields: [spots.userId],
        references: [users.id]
    }),
    comments: many(evaluations) // Un spot peut avoir plusieurs commentaires
}));

export const evaluationRelation = relations(evaluations, ({ one, many }) => ({
    // Une evalution n'est faite que par un seul user
    user: one(users, {
        fields: [evaluations.userId],
        references: [users.id]
    }),
    // Une evaluation concerne un seul spot
    spot: one(spots, {
        fields: [evaluations.spotId],
        references: [spots.id]
    })
}))