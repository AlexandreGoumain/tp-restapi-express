import { Request, Response } from 'express';
import { spotModel } from '../models';
import logger from '../utils/logger';
import { APIResponse } from '../utils/response';

const postsController = {
    get: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            logger.info('[GET] Récupérer un post'); // Log d'information en couleur
            const post = await spotModel.get(id);
            if (!post)
                return APIResponse(response, null, 'Post inexistant', 404);
            APIResponse(response, post, 'OK');
        } catch (error: any) {
            logger.error(
                'Erreur lors de la récupération du post: ' + error.message
            );
            APIResponse(
                response,
                null,
                'Erreur lors de la récupération du post',
                500
            );
        }
    },
    create: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const { description, address, pictureUrl } = request.body;
            logger.info('[POST] Créer un post'); // Log d'information en couleur
            await spotModel.create({
                userId: id,
                description,
                address,
                pictureUrl,
            });
            APIResponse(response, null, 'OK', 201);
        } catch (error: any) {
            logger.error(
                'Erreur lors de la récupération du post: ' + error.message
            );
            APIResponse(
                response,
                null,
                'Erreur lors de la récupération du post',
                500
            );
        }
    },
    delete: async (request: Request, response: Response) => {
        try {
            const { id, userId } = request.params;

            logger.info('[DELETE] Supprimer un post'); // Log d'information en couleur
            await spotModel.delete(id, userId);
            APIResponse(response, null, 'OK', 201);
        } catch (error: any) {
            logger.error(
                'Erreur lors de la suppression du post: ' + error.message
            );
            APIResponse(
                response,
                null,
                'Erreur lors de la suppression du post',
                500
            );
        }
    },
    update: async (request: Request, response: Response) => {
        try {
            const { id, userId } = request.params;
            const { description, address, pictureUrl } = request.body;

            logger.info('[UPDATE] Update un post'); // Log d'information en couleur
            await spotModel.update(id, userId, {
                userId,
                description,
                address,
                pictureUrl,
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
};

export default postsController;
