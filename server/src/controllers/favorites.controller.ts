import { Request, Response } from 'express';
import { z } from 'zod';
import { favoriteModel } from '../models/favorites.model';
import logger from '../utils/logger';
import { APIResponse } from '../utils/response';
import { addFavoriteValidation } from '../validations/favorites.validations';

const favoritesController = {
    getAll: async (request: Request, response: Response) => {
        try {
            const { id: userId } = response.locals.user;

            logger.info("[GET] Récupérer les favoris de l'utilisateur");

            const favorites = await favoriteModel.getAllByUser(userId);

            APIResponse(response, favorites, 'OK');
        } catch (error: any) {
            logger.error(
                'Erreur lors de la récupération des favoris: ' + error.message
            );
            APIResponse(
                response,
                null,
                'Erreur lors de la récupération des favoris',
                500
            );
        }
    },
    addFavorite: async (request: Request, response: Response) => {
        try {
            const { id: userId } = response.locals.user;
            const { spotId } = addFavoriteValidation.parse(request.body);

            logger.info('[POST] Ajouter un spot aux favoris');

            await favoriteModel.add(userId, spotId);

            APIResponse(response, null, 'Favori ajouté avec succès', 201);
        } catch (error: any) {
            logger.error("Erreur lors de l'ajout du favori: " + error.message);

            if (error instanceof z.ZodError) {
                return APIResponse(
                    response,
                    error.errors,
                    'Données invalides',
                    400
                );
            }

            APIResponse(
                response,
                null,
                "Erreur lors de l'ajout du favori",
                500
            );
        }
    },
    removeFavorite: async (request: Request, response: Response) => {
        try {
            const { id: userId } = response.locals.user;
            const { spotId } = request.params;

            logger.info('[DELETE] Supprimer un favori');

            await favoriteModel.remove(userId, spotId);

            APIResponse(response, null, 'Favori supprimé avec succès');
        } catch (error: any) {
            logger.error(
                'Erreur lors de la suppression du favori: ' + error.message
            );
            APIResponse(
                response,
                null,
                'Erreur lors de la suppression du favori',
                500
            );
        }
    },
    checkFavorite: async (request: Request, response: Response) => {
        try {
            const { id: userId } = response.locals.user;
            const { spotId } = request.params;

            logger.info('[GET] Vérifier si le spot est en favori');

            const isFavorite = await favoriteModel.isFavorite(userId, spotId);

            APIResponse(response, { isFavorite }, 'OK');
        } catch (error: any) {
            logger.error(
                'Erreur lors de la vérification du favori: ' + error.message
            );
            APIResponse(
                response,
                null,
                'Erreur lors de la vérification du favori',
                500
            );
        }
    },
};

export default favoritesController;
