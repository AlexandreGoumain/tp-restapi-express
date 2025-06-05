import { Request, Response } from 'express';
import { spotModel } from '../models';
import logger from '../utils/logger';
import { APIResponse } from '../utils/response';

const postsController = {
    get: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            logger.info('[GET] Récupérer un spot'); // Log d'information en couleur
            const spot = await spotModel.get(id);
            if (!spot)
                return APIResponse(response, null, 'Spot inexistant', 404);
            APIResponse(response, spot, 'OK');
        } catch (error: any) {
            logger.error(
                'Erreur lors de la récupération du spot: ' + error.message
            );
            APIResponse(
                response,
                null,
                'Erreur lors de la récupération du spot',
                500
            );
        }
    },
    create: async (request: Request, response: Response) => {
        try {
            const { description, address, idUser } = request.body;
            logger.info('[POST] Créer un spot');
            await spotModel.create({
                userId: idUser,
                description,
                address,
            });
            APIResponse(response, null, 'OK', 201);
        } catch (error: any) {
            logger.error(
                'Erreur lors de la récupération du spot: ' + error.message
            );
            APIResponse(
                response,
                null,
                'Erreur lors de la récupération du spot',
                500
            );
        }
    },
    delete: async (request: Request, response: Response) => {
        try {
            const { idSpot } = request.params;
            const { userId } = request.body;

            console.log('idSpot', idSpot);
            console.log('userId', userId);

            logger.info('[DELETE] Supprimer un spot'); // Log d'information en couleur
            await spotModel.delete(idSpot, userId);
            APIResponse(response, null, 'OK', 201);
        } catch (error: any) {
            logger.error(
                'Erreur lors de la suppression du spot: ' + error.message
            );
            APIResponse(
                response,
                null,
                'Erreur lors de la suppression du spot',
                500
            );
        }
    },
    update: async (request: Request, response: Response) => {
        try {
            const { idSpot, userId, description, address } = request.body;

            logger.info('[UPDATE] Update un spot'); // Log d'information en couleur
            await spotModel.update(idSpot, userId, {
                userId,
                description,
                address,
            });
            APIResponse(response, null, 'OK', 201);
        } catch (error: any) {
            logger.error('Erreur lors de la màj du post: ' + error.message);
            APIResponse(response, null, 'Erreur lors de la màj du post', 500);
        }
    },
    getAll: async (request: Request, response: Response) => {
        try {
            logger.info('[GET] Récupérer tout les spots'); // Log d'information en couleur
            const spots = await spotModel.getAll();

            if (!spots)
                return APIResponse(response, null, 'Aucun spot trouvé', 404);

            APIResponse(response, spots, 'OK');
        } catch (error: any) {
            logger.error(
                'Erreur lors de la récupération des spots: ' + error.message
            );
            APIResponse(
                response,
                null,
                'Erreur lors de la récupération des spots',
                500
            );
        }
    },
    getSpotsByUser: async (request: Request, response: Response) => {
        try {
            const { userId } = request.body;
            const spots = await spotModel.getSpotsByUser(userId);
            APIResponse(response, spots, 'OK');
        } catch (error: any) {
            logger.error(
                'Erreur lors de la récupération des spots: ' + error.message
            );
            APIResponse(
                response,
                null,
                'Erreur lors de la récupération des spots',
                500
            );
        }
    },
};

export default postsController;
