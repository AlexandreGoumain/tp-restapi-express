import { Request, Response } from "express";
import { APIResponse } from "../utils/response";
import logger from "../utils/logger";
import { commentModel } from "../models";

const commentsController = {
    get: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            logger.info("[GET] Récupérer un commentaire") // Log d'information en couleur
            const [ comment ] = await commentModel.get(id);
            APIResponse(response, comment, "OK");
        } catch (error: any) {
            logger.error("Erreur lors de la récupération du commentaire: " + error.message);
            APIResponse(response, null, "Erreur lors de la récupération du commentaire", 500);
        }
    },
    create: async (request: Request, response: Response) => {
        try {
            const { content, postId } = request.body;
            const { id } = response.locals.user; // { id: "xxx" }
            logger.info("[POST] Créer un commentaire") // Log d'information en couleur
            const comment = await commentModel.create({
                authorId: id,
                content,
                postId
            })
            APIResponse(response, comment, "OK", 201);
        } catch (error: any) {
            logger.error("Erreur lors de la récupération du commentaire: " + error.message);
            APIResponse(response, null, "Erreur lors de la récupération du commentaire", 500);
        }
    },
    delete: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const { user } = response.locals;
            logger.info("[DELETE] Supprimer un commentaire") // Log d'information en couleur
            await commentModel.delete(id, user.id);
            APIResponse(response, null, "OK", 201);
        } catch (error: any) {
            logger.error("Erreur lors de la suppression du commentaire: " + error.message);
            APIResponse(response, null, "Erreur lors de la suppression du commentaire", 500);
        }
    },
    update: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const { content, postId } = request.body;
            const { user } = response.locals;
            logger.info("[UPDATE] Update un commentaire") // Log d'information en couleur
            await commentModel.update(id, user.id, {
                authorId: user.id,
                content,
                postId
            })
            APIResponse(response, null, "OK", 201);
        } catch (error: any) {
            logger.error("Erreur lors de la màj du commentaire: " + error.message);
            APIResponse(response, null, "Erreur lors de la màj du commentaire", 500);
        }
    }
}

export default commentsController