import { NextFunction, Request, Response } from 'express';
import { UUID_REGEX } from '../utils/VerifyUuid';
import logger from '../utils/logger';
import { APIResponse } from '../utils/response';

export function validateUUIDParam(paramName: string) {
    return (request: Request, response: Response, next: NextFunction) => {
        const id = request.params[paramName];

        if (!id) {
            logger.warn(`Paramètre ${paramName} manquant dans la requête`);
            return APIResponse(
                response,
                null,
                `Paramètre ${paramName} requis`,
                400
            );
        }

        if (!UUID_REGEX.test(id)) {
            logger.warn(`UUID invalide pour le paramètre ${paramName}: ${id}`);
            return APIResponse(
                response,
                null,
                `Paramètre ${paramName} invalide (UUID attendu)`,
                400
            );
        }

        next();
    };
}

export function validateUUIDParams(paramNames: string[]) {
    return (request: Request, response: Response, next: NextFunction) => {
        for (const paramName of paramNames) {
            const id = request.params[paramName];

            if (!id) {
                logger.warn(`Paramètre ${paramName} manquant dans la requête`);
                return APIResponse(
                    response,
                    null,
                    `Paramètre ${paramName} requis`,
                    400
                );
            }

            if (!UUID_REGEX.test(id)) {
                logger.warn(
                    `UUID invalide pour le paramètre ${paramName}: ${id}`
                );
                return APIResponse(
                    response,
                    null,
                    `Paramètre ${paramName} invalide (UUID attendu)`,
                    400
                );
            }
        }

        next();
    };
}
