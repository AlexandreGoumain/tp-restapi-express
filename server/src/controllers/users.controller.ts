import { Request, Response } from 'express';
import { z } from 'zod';
import { userModel } from '../models/users.model';
import logger from '../utils/logger';
import { hashPassword, verifyPassword } from '../utils/password';
import { APIResponse } from '../utils/response';
import { userUpdatePasswordValidation } from '../validations';

export const userController = {
    getAll: async (request: Request, response: Response) => {
        try {
            logger.info('[GET] Récupérer tous les utilisateurs');
            const users = await userModel.getAll();
            if (!users)
                return APIResponse(
                    response,
                    null,
                    'Utilisateur inexistant',
                    404
                );

            APIResponse(response, users, 'OK');
        } catch (err: any) {
            logger.error(
                `Erreur lors de la récupération des utilisateurs; ${err.message}`
            );
            APIResponse(
                response,
                null,
                'Erreur lors de la récupération des utilisateurs',
                500
            );
        }
    },

    get: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            logger.info('[GET] Récupérer un utilisateur');
            const user = await userModel.get(id);
            if (!user)
                return APIResponse(
                    response,
                    null,
                    'Utilisateur inexistant',
                    404
                );
            APIResponse(response, user, 'OK');
        } catch (err: any) {
            logger.error(
                `Erreur lors de la récupération de l'utilisateur; ${err.message}`
            );
            APIResponse(
                response,
                null,
                "Erreur lors de la récupération de l'utilisateur",
                500
            );
        }
    },

    update: async (request: Request, response: Response) => {
        try {
            const { idUserRequest } = request.params;
            const { email, username } = request.body;
            logger.info('[PUT] Mettre à jour un utilisateur');

            const user = await userModel.get(idUserRequest);

            if (!user || user.id !== idUserRequest)
                return APIResponse(
                    response,
                    null,
                    "Impossible de mettre à jour l'utilisateur",
                    403
                );

            await userModel.update(idUserRequest, email, username);
            APIResponse(response, null, 'OK', 201);
        } catch (err: any) {
            logger.error(
                `Erreur lors de la mise à jour de l'utilisateur; ${err.message}`
            );
            APIResponse(
                response,
                null,
                "Erreur lors de la mise à jour de l'utilisateur",
                500
            );
        }
    },

    updatePassword: async (request: Request, response: Response) => {
        try {
            const { idUserRequest } = request.params;

            logger.info("[PUT] Mettre à jour le mot de passe de l'utilisateur");

            // Zod
            const { currentPassword, newPassword } =
                userUpdatePasswordValidation.parse(request.body);

            // Récupérer user avec son mot de passe
            const user = await userModel.getWithPassword(idUserRequest);

            if (!user || user.id !== idUserRequest || !user.password) {
                return APIResponse(
                    response,
                    null,
                    'Utilisateur non trouvé ou non autorisé',
                    403
                );
            }

            // Vérifier ancien mot de passe
            const isCurrentPasswordValid = await verifyPassword(
                user.password!,
                currentPassword
            );
            if (!isCurrentPasswordValid) {
                return APIResponse(
                    response,
                    null,
                    'Mot de passe actuel incorrect',
                    400
                );
            }

            // nouveau mot de passe différent de l'ancien ?
            const isSamePassword = await verifyPassword(
                user.password!,
                newPassword
            );
            if (isSamePassword) {
                return APIResponse(
                    response,
                    null,
                    "Le nouveau mot de passe doit être différent de l'ancien",
                    400
                );
            }

            // Hasher nouveau mot de passe
            const hashedNewPassword = await hashPassword(newPassword);

            if (!hashedNewPassword) {
                return APIResponse(
                    response,
                    null,
                    'Erreur lors du hachage du mot de passe',
                    500
                );
            }

            // Mettre à jour le mot de passe
            await userModel.updatePassword(idUserRequest, hashedNewPassword);

            logger.info(
                `Mot de passe mis à jour pour l'utilisateur ${user.username}`
            );
            APIResponse(
                response,
                null,
                'Mot de passe mis à jour avec succès',
                200
            );
        } catch (err: any) {
            logger.error(
                `Erreur lors de la mise à jour du mot de passe de l'utilisateur; ${err.message}`
            );

            if (err instanceof z.ZodError) {
                return APIResponse(
                    response,
                    err.errors,
                    'Les données du formulaire sont invalides',
                    400
                );
            }

            APIResponse(
                response,
                null,
                "Erreur lors de la mise à jour du mot de passe de l'utilisateur",
                500
            );
        }
    },

    findByCredentials: async (request: Request, response: Response) => {
        try {
            const { email } = request.body;
            logger.info('[POST] Récupérer un utilisateur par email');
            const user = await userModel.findByCredentials(email);
            if (!user)
                return APIResponse(
                    response,
                    null,
                    'Utilisateur inexistant',
                    404
                );
            APIResponse(response, user, 'OK');
        } catch (err: any) {
            logger.error(
                `Erreur lors de la récupération de l'utilisateur; ${err.message}`
            );
            APIResponse(
                response,
                null,
                "Erreur lors de la récupération de l'utilisateur",
                500
            );
        }
    },

    delete: async (request: Request, response: Response) => {
        try {
            const { idUser } = request.params;

            logger.info('[DELETE] Supprimer un utilisateur');

            const user = await userModel.get(idUser);

            if (!user || user.id !== idUser)
                return APIResponse(
                    response,
                    null,
                    "Impossible de supprimer l'utilisateur",
                    403
                );

            await userModel.delete(idUser);
            APIResponse(response, null, 'OK', 201);
        } catch (err: any) {
            logger.error(
                `Erreur lors de la suppression de l'utilisateur; ${err.message}`
            );
            APIResponse(
                response,
                null,
                "Erreur lors de la suppression de l'utilisateur",
                500
            );
        }
    },
};
