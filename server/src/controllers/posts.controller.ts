import { Request, Response } from 'express';
import { postModel } from '../models';
import logger from '../utils/logger';
import { APIResponse } from '../utils/response';

const postsController = {
    get: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            logger.info('[GET] Récupérer un post'); // Log d'information en couleur
            const post = await postModel.get(id);
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
            const { content, title } = request.body;
            const { user } = response.locals;
            logger.info('[POST] Créer un post'); // Log d'information en couleur
            await postModel.create({
                author: user.id,
                content,
                title,
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
            const { id } = request.params;
            const { user } = response.locals;

            logger.info('[DELETE] Supprimer un post'); // Log d'information en couleur
            await postModel.delete(id, user.id);
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
            const { id } = request.params;
            const { title, content } = request.body;

            const { user } = response.locals;
            logger.info('[UPDATE] Update un post'); // Log d'information en couleur
            await postModel.update(id, user.id, {
                author: user.id,
                content,
                title,
            });
            APIResponse(response, null, 'OK', 201);
        } catch (error: any) {
            logger.error('Erreur lors de la màj du post: ' + error.message);
            APIResponse(response, null, 'Erreur lors de la màj du post', 500);
        }
    },
    getAll: async (request: Request, response: Response) => {
        try {
            logger.info('[GET] Récupérer tout les posts'); // Log d'information en couleur
            const posts = await postModel.getAll();
            APIResponse(response, posts, 'OK');
        } catch (error: any) {
            logger.error(
                'Erreur lors de la récupération des posts: ' + error.message
            );
            APIResponse(
                response,
                null,
                'Erreur lors de la récupération des posts',
                500
            );
        }
    },
};

export default postsController;
