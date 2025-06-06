import { Request, Response } from 'express';
import { z } from 'zod';
import { evaluationModel } from '../models';
import logger from '../utils/logger';
import { APIResponse } from '../utils/response';
import { createEvaluationValidation, updateEvaluationValidation } from '../validations/evaluations.validations';

// TODO tester toute les evaluations controllers dans postman

const evaluationsController = {
    get: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;

            logger.info('[GET] Récupérer une évaluation'); // Log d'information en couleur

            const evaluation = await evaluationModel.get(id);

            if (!evaluation || evaluation.length === 0) {
                return APIResponse(
                    response,
                    null,
                    'Évaluation inexistante',
                    404
                );
            }

            APIResponse(response, evaluation[0], 'OK');
        } catch (error: any) {
            logger.error(
                "Erreur lors de la récupération de l'évaluation: " + error
            );
            APIResponse(
                response,
                null,
                "Erreur lors de la récupération de l'évaluation",
                500
            );
        }
    },
    getAllBySpot: async (request: Request, response: Response) => {
        try {
            const { id_spot } = request.params;

            logger.info("[GET] Récupérer toutes les évaluations d'un spot"); // Log d'information en couleur
            const evaluations = await evaluationModel.getAllBySpot(id_spot);
            APIResponse(response, evaluations, 'OK');
        } catch (error: any) {
            logger.error(
                'Erreur lors de la récupération des évaluations du spot: ' +
                error.message
            );
            APIResponse(
                response,
                null,
                'Erreur lors de la récupération des évaluations du spot',
                500
            );
        }
    },
    getAllByUser: async (request: Request, response: Response) => {
        try {
            const { id_user } = request.params;

            logger.info(
                "[GET] Récupérer toutes les évaluations d'un utilisateur"
            ); // Log d'information en couleur
            const evaluations = await evaluationModel.getAllByUser(id_user);
            APIResponse(response, evaluations, 'OK');
        } catch (error: any) {
            logger.error(
                "Erreur lors de la récupération des évaluations de l'utilisateur: " +
                    error.message
            );
            APIResponse(
                response,
                null,
                "Erreur lors de la récupération des évaluations de l'utilisateur",
                500
            );
        }
    },
    create: async (request: Request, response: Response) => {
        try {
            const { note, comment, spotId } = createEvaluationValidation.parse(request.body);
            const { id } = response.locals.user;

            logger.info('[POST] Créer une évaluation');
            const newEvaluation = await evaluationModel.create({
                userId: id,
                spotId: spotId,
                note: note,
                comment: comment,
            });
            APIResponse(response, newEvaluation, 'OK', 201);
        } catch (error: any) {
            logger.error(
                "Erreur lors de la récupération de l'évaluation: " +
                    error.message
            );
            if (error instanceof z.ZodError) {
                return APIResponse(
                    response,
                    error.errors,
                    'Le formulaire est invalide',
                    400
                );
            }
            APIResponse(
                response,
                null,
                "Erreur lors de la récupération de l'évaluation",
                500
            );
        }
    },
    delete: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const { user } = response.locals;

            logger.info('[DELETE] Supprimer une évaluation'); // Log d'information en couleur
            await evaluationModel.delete(id, user.id);
            APIResponse(response, null, 'OK', 201);
        } catch (error: any) {
            logger.error(
                "Erreur lors de la suppression de l'évaluation: " +
                    error.message
            );
            APIResponse(
                response,
                null,
                "Erreur lors de la suppression de l'évaluation",
                500
            );
        }
    },
    update: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;

            const { note, comment } = updateEvaluationValidation.parse(request.body);
            const { user } = response.locals;

            logger.info('[UPDATE] Update une évaluation'); // Log d'information en couleur
            await evaluationModel.update(id, user.id, {
                note,
                comment,
                modifiedAt: new Date(),
            });
            APIResponse(response, null, 'OK', 201);
        } catch (error: any) {
            logger.error(
                "Erreur lors de la màj de l'évaluation: " + error.message
            );
            if (error instanceof z.ZodError) {
                return APIResponse(
                    response,
                    error.errors,
                    'Le formulaire est invalide',
                    400
                );
            }
            APIResponse(
                response,
                null,
                "Erreur lors de la màj de l'évaluation",
                500
            );
        }
    },
};

export default evaluationsController;
