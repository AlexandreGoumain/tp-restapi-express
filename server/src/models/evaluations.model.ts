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
            logger.error('Impossible de créer l\'évaluation: +', err.message);
            throw new Error('L\'évaluation ne peut pas être crée');
        }
    },

    delete: (evaluationId: string, userId: string) => {
        try {
            return db
                .delete(evaluations)
                .where(
                    and(
                        eq(evaluations.id, evaluationId),
                        eq(evaluations.userId, userId)
                    )
                );
        } catch (err: any) {
            logger.error(
                'Impossible de supprimer l\'évaluation: +',
                err.message
            );
            throw new Error('L\'évaluation ne peut pas être supprimé');
        }
    },

    getAllBySpot: (spotId: string) => {
        try {
            return db
                .select({
                    id: evaluations.id,
                    comment: evaluations.comment,
                    note: evaluations.note,
                    createdAt: evaluations.createdAt,
                    author: {
                        id: users.id,
                        username: users.username,
                    }
                }).from(evaluations)
                .leftJoin(users, eq(evaluations.userId, users.id))
                .where(eq(evaluations.spotId, spotId))
                .execute();
        } catch (err: any) {
            logger.error(
                'Impossible de récupérer les évaluations: +',
                err.message
            );
            throw new Error('Les évaluations ne peuvent pas être récupérées');
        }
    },

    getAllByUser: (userId: string) => {
        try {
            return db
                .select({
                    id: evaluations.id,
                    comment: evaluations.comment,
                    note: evaluations.note,
                    createdAt: evaluations.createdAt
                }).from(evaluations)
                .where(
                    eq(evaluations.userId, userId)
                ).execute();
        } catch (err: any) {
            logger.error(
                'Impossible de récupérer les évaluations: +',
                err.message
            );
            throw new Error('Les évaluations ne peuvent pas être récupérées');
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
                .leftJoin(users, eq(evaluations.userId, users.id))
                .where(eq(evaluations.id, evaluationId))
                .execute();
        } catch (err: any) {
            logger.error(
                'Impossible de récupérer l\'évaluation: +',
                err.message
            );
            throw new Error('L\'évaluation ne peut pas être récupéré');
        }
    },

    update: (
        evaluationId: string,
        userId: string,
        evaluation: NewEvaluation
    ) => {
        try {
            return db
                .update(evaluations)
                .set(evaluation)
                .where(
                    and(
                        eq(evaluations.id, evaluationId),
                        eq(evaluations.userId, userId)
                    )
                )
                .execute();
        } catch (err: any) {
            logger.error("Impossible d'update l\'évaluation: +", err.message);
            throw new Error('L\'évaluation ne peut pas être màj');
        }
    },
};
