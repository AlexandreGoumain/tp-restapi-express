import { and, eq } from 'drizzle-orm';
import { db } from '../config/pool';
import { NewComment } from '../entities/Comment';
import { comments, spots, users } from '../schemas';
import logger from '../utils/logger';

export const commentModel = {
    create: (comment: NewComment) => {
        try {
            return db
                .insert(comments)
                .values(comment)
                .returning({
                    id: comments.id,
                })
                .execute();
        } catch (err: any) {
            logger.error('Impossible de créer le commentaire: +', err.message);
            throw new Error('Le commentaire ne peut pas être crée');
        }
    },

    delete: (id: string, authorId: string) => {
        try {
            return db
                .delete(comments)
                .where(
                    and(eq(comments.id, id), eq(comments.authorId, authorId))
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
                    id: comments.id,
                    comment: comments.comment,
                    author: {
                        id: users.id,
                        username: users.username,
                    },
                    spot: {
                        id: spots.id,
                        description: spots.description,
                    },
                })
                .from(comments)
                .leftJoin(users, eq(comments.authorId, users.id))
                .leftJoin(spots, eq(comments.spotId, spots.id))
                .execute();
        } catch (err: any) {
            logger.error(
                'Impossible de récupérer les commentaires: +',
                err.message
            );
            return [];
        }
    },

    get: (id: string) => {
        try {
            return db
                .select({
                    id: comments.id,
                    comment: comments.comment,
                    author: {
                        id: users.id,
                        username: users.username,
                    },
                })
                .from(comments)
                .leftJoin(users, eq(comments.authorId, users.id))
                .where(eq(comments.id, id))
                .execute();
        } catch (err: any) {
            logger.error(
                'Impossible de récupérer le commentaire: +',
                err.message
            );
            throw new Error('Le commentaire ne peut pas être récupéré');
        }
    },

    update: (id: string, authorId: string, comment: NewComment) => {
        try {
            return db
                .update(comments)
                .set(comment)
                .where(
                    and(eq(comments.id, id), eq(comments.authorId, authorId))
                )
                .execute();
        } catch (err: any) {
            logger.error("Impossible d'update le commentaire: +", err.message);
            throw new Error('Le commentaire ne peut pas être màj');
        }
    },
};
