import { and, eq } from 'drizzle-orm';
import { db } from '../config/pool';
import { favorites, spots } from '../schemas';
import logger from '../utils/logger';

export const favoriteModel = {
    getAllByUser: async (userId: string) => {
        try {
            if (!userId) {
                throw new Error('User ID requis');
            }

            return await db
                .select({
                    spotId: favorites.spotId,
                    description: spots.description,
                    address: spots.address,
                    createdAt: spots.createdAt,
                })
                .from(favorites)
                .leftJoin(spots, eq(favorites.spotId, spots.id))
                .where(eq(favorites.userId, userId))
                .execute();
        } catch (err: any) {
            logger.error(
                `Erreur lors de la récupération des favoris; ${err.message}`
            );
            throw new Error('Impossible de récupérer les favoris');
        }
    },

    add: async (userId: string, spotId: string) => {
        try {
            if (!userId || !spotId) {
                throw new Error('User ID et Spot ID requis');
            }

            // Vérifier si le favori existe déjà
            const existingFavorite = await db
                .select()
                .from(favorites)
                .where(
                    and(
                        eq(favorites.userId, userId),
                        eq(favorites.spotId, spotId)
                    )
                )
                .execute();

            if (existingFavorite.length > 0) {
                throw new Error('Ce spot est déjà dans vos favoris');
            }

            return await db
                .insert(favorites)
                .values({
                    userId,
                    spotId,
                })
                .execute();
        } catch (err: any) {
            logger.error(`Erreur lors de l'ajout du favori; ${err.message}`);
            throw err; // Rethrow pour garder le message original
        }
    },

    remove: async (userId: string, spotId: string) => {
        try {
            if (!userId || !spotId) {
                throw new Error('User ID et Spot ID requis');
            }

            const result = await db
                .delete(favorites)
                .where(
                    and(
                        eq(favorites.userId, userId),
                        eq(favorites.spotId, spotId)
                    )
                )
                .execute();

            return result;
        } catch (err: any) {
            logger.error(
                `Erreur lors de la suppression du favori; ${err.message}`
            );
            throw new Error('Impossible de supprimer le favori');
        }
    },

    isFavorite: async (userId: string, spotId: string): Promise<boolean> => {
        try {
            const result = await db
                .select()
                .from(favorites)
                .where(
                    and(
                        eq(favorites.userId, userId),
                        eq(favorites.spotId, spotId)
                    )
                )
                .execute();

            return result.length > 0;
        } catch (err: any) {
            logger.error(
                `Erreur lors de la vérification du favori; ${err.message}`
            );
            return false;
        }
    },
};
