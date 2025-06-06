import { and, eq } from 'drizzle-orm';
import { db } from '../config/pool';
import { favorites, spots } from '../schemas';
import logger from '../utils/logger';

export const favoriteModel = {
    getAllByUser: (userId: string) => {
        try {
            return db
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
            return db
                .insert(favorites)
                .values({
                    userId,
                    spotId,
                })
                .execute();
        } catch (err: any) {
            logger.error(`Erreur lors de l'ajout du favoris; ${err.message}`);
            throw new Error("Impossible d'ajouter le favori");
        }
    },

    remove: (userId: string, spotId: string) => {
        try {
            return db
                .delete(favorites)
                .where(
                    and(
                        eq(favorites.userId, userId),
                        eq(favorites.spotId, spotId)
                    )
                )
                .execute();
        } catch (err: any) {
            logger.error(
                `Erreur lors de la suppression du favoris; ${err.message}`
            );
            throw new Error('Impossible de supprimer le favori');
        }
    },
};
