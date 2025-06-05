import { Request, Response } from 'express';
import { z } from 'zod';
import { evaluationModel } from '../models';
import logger from '../utils/logger';
import { APIResponse } from '../utils/response';
import { createEvaluationValidation, updateEvaluationValidation } from '../validations/evaluations.validations';
import { favoriteModel } from '../models/favorites.model';

// TODO tester toute les evaluations controllers dans postman

const favoritesController = {
    getAll: async (request: Request, response: Response) => {
        try {
            const { id: userId } = response.locals.user;

            logger.info('[GET] Récupérer les favoris'); // Log d'information en couleur

            const favorites = await favoriteModel.getAllByUser(userId);

            APIResponse(response, favorites, 'OK');
        } catch (error: any) {
            logger.error(
                "Erreur lors de la récupération des favoris: " + error
            );
            APIResponse(
                response,
                null,
                "Erreur lors de la récupération des favoris",
                500
            );
        }
    },
    addFavorite: async (request: Request, response: Response) => {
        try {
            const { id: userId } = response.locals.user;
            const { spotId } = request.body;

            logger.info("[GET] Récupérer toutes les évaluations d'un spot"); // Log d'information en couleur

            await favoriteModel.add(userId, spotId);

            APIResponse(response, null, 'OK');
        } catch (error: any) {
            logger.error(
                'Erreur lors de la création du favoris: ' +
                error.message
            );
            APIResponse(
                response,
                null,
                'Erreur lors de la création du favoris',
                500
            );
        }
    },
    removeFavorite: async (request: Request, response: Response) => {
        try {
            const { id: userId } = response.locals.user;
            const { spotId } = request.params;

            logger.info("[GET] Récupérer toutes les évaluations d'un utilisateur"); // Log d'information en couleur

            await favoriteModel.remove(userId, spotId);

            APIResponse(response, null, 'OK');
        } catch (error: any) {
            logger.error(
                "Erreur lors de la suppression du favoris: " +
                error.message
            );
            APIResponse(
                response,
                null,
                "Erreur lors de la suppression du favoris",
                500
            );
        }
    },
};

export default favoritesController;
