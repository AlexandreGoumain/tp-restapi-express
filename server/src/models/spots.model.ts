import { and, eq } from 'drizzle-orm';
import { db } from '../config/pool';
import { NewSpot } from '../entities/Spots';
import { spots } from '../schemas';
import logger from '../utils/logger';

export const spotModel = {
    create: (spot: NewSpot) => {
        try {
            return db
                .insert(spots)
                .values(spot)
                .returning({
                    id: spots.id,
                    userId: spots.userId,
                    description: spots.description,
                    address: spots.address,
                    createdAt: spots.createdAt,
                    modifiedAt: spots.modifiedAt,
                })
                .execute();
        } catch (err: any) {
            logger.error('Impossible de créer le post: +', err.message);
            throw new Error('Le post ne peut pas être crée');
        }
    },

    delete: (id: string, authorId: string) => {
        try {
            return db
                .delete(spots)
                .where(and(eq(spots.id, id), eq(spots.userId, authorId)));
        } catch (err: any) {
            logger.error('Impossible de supprimer le spot: +', err.message);
            throw new Error('Le spot ne peut pas être supprimé');
        }
    },

    getAll: () => {
        try {
            return db.query.spots.findMany({
                with: {
                    user: {
                        columns: {
                            id: true,
                            username: true,
                        },
                    },
                },
            });
        } catch (err: any) {
            logger.error('Impossible de récupérer les spots: +', err.message);
            return [];
        }
    },

    get: (id: string) => {
        try {
            return db.query.spots.findFirst({
                where: eq(spots.id, id),
                columns: {
                    id: true,
                    userId: true,
                    description: true,
                    address: true,
                    createdAt: true,
                    modifiedAt: true,
                },
                with: {
                    user: {
                        columns: {
                            id: true,
                            username: true,
                        },
                    },
                },
            });
        } catch (err: any) {
            logger.error('Impossible de récupérer le spot: +', err.message);
            throw new Error('Le spot ne peut pas être récupéré');
        }
    },

    getSpotsByUser: (userId: string) => {
        try {
            return db.query.spots.findMany({
                where: eq(spots.userId, userId),
                with: {
                    user: {
                        columns: {
                            id: true,
                            username: true,
                        },
                    },
                },
            });
        } catch (err: any) {
            logger.error(
                `Impossible de récupérer les spots de l'utilisateur: ${err.message}`
            );
            return [];
        }
    },

    update: (id: string, authorId: string, spot: NewSpot) => {
        try {
            return db
                .update(spots)
                .set(spot)
                .where(and(eq(spots.id, id), eq(spots.userId, authorId)))
                .execute();
        } catch (err: any) {
            logger.error("Impossible d'update le post: +", err.message);
            throw new Error('Le post ne peut pas être màj');
        }
    },
};
