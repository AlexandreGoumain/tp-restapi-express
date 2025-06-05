import { and, eq } from 'drizzle-orm';
import { db } from '../config/pool';
import { NewEvaluation } from '../entities/Evaluation';
import { evaluations, spots, users } from '../schemas';
import logger from '../utils/logger';

export const evaluationModel = {
    create: (evaluation: NewEvaluation) => {
        try {
            return db
                .insert(evaluations)
                .values(evaluation)
                .returning({
                    id: evaluations.id,
                })
                .execute();
        } catch (err: any) {
            logger.error('Impossible de créer le commentaire: +', err.message);
            throw new Error('Le commentaire ne peut pas être crée');
        }
    },

    delete: (evaluationId: string, authorId: string) => {
        try {
            return db
                .delete(evaluations)
                .where(
                    and(
                        eq(evaluations.id, evaluationId),
                        eq(evaluations.authorId, authorId)
                    )
                );
        } catch (err: any) {
            logger.error(
                'Impossible de supprimer le commentaire: +',
                err.message
            );
            throw new Error('Le commentaire ne peut pas être supprimé');
        }
    },

    getAll: () => {
        try {
            return db
                .select({
                    id: evaluations.id,
                    comment: evaluations.comment,
                    author: {
                        id: users.id,
                        username: users.username,
                    },
                    spot: {
                        id: spots.id,
                        description: spots.description,
                    },
                })
                .from(evaluations)
                .leftJoin(users, eq(evaluations.authorId, users.id))
                .leftJoin(spots, eq(evaluations.spotId, spots.id))
                .execute();
        } catch (err: any) {
            logger.error(
                'Impossible de récupérer les commentaires: +',
                err.message
            );
            return [];
        }
    },

    get: (evaluationId: string) => {
        try {
            return db
                .select({
                    id: evaluations.id,
                    comment: evaluations.comment,
                    author: {
                        id: users.id,
                        username: users.username,
                    },
                })
                .from(evaluations)
                .leftJoin(users, eq(evaluations.authorId, users.id))
                .where(eq(evaluations.id, evaluationId))
                .execute();
        } catch (err: any) {
            logger.error(
                'Impossible de récupérer le commentaire: +',
                err.message
            );
            throw new Error('Le commentaire ne peut pas être récupéré');
        }
    },

    update: (
        evaluationId: string,
        authorId: string,
        evaluation: NewEvaluation
    ) => {
        try {
            return db
                .update(evaluations)
                .set(evaluation)
                .where(
                    and(
                        eq(evaluations.id, evaluationId),
                        eq(evaluations.authorId, authorId)
                    )
                )
                .execute();
        } catch (err: any) {
            logger.error("Impossible d'update le commentaire: +", err.message);
            throw new Error('Le commentaire ne peut pas être màj');
        }
    },
};
