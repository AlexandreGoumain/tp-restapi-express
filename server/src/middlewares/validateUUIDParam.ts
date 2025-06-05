import { Request, Response, NextFunction } from 'express';
import { UUID_REGEX } from '../utils/VerifyUuid';
import { APIResponse } from '../utils/response';


export function validateUUIDParam(paramName: string) {
    return (request: Request, response: Response, next: NextFunction) => {
        const id = request.params[paramName];
        if (!UUID_REGEX.test(id)) {
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