import { Router } from 'express';
import favoritesController from '../controllers/favorites.controller';
import { isAuthenticated } from '../middlewares';
import { validateUUIDParam } from '../middlewares/validateUUIDParam';

const router = Router();

/**
 * GET /favorites
 * ➤ Liste tous les spots favoris de l'utilisateur connecté
 */
router.get('/', isAuthenticated, favoritesController.getAll);

/**
 * POST /favorites
 * ➤ Ajoute un spot aux favoris de l'utilisateur connecté
 * Body attendu : { spotId: string }
 */
router.post('/', isAuthenticated, favoritesController.addFavorite);

/**
 * DELETE /favorites/:spotId
 * ➤ Supprime un favori (spot) pour l'utilisateur connecté
 */
router.delete(
    '/:spotId',
    validateUUIDParam('spotId'),
    isAuthenticated,
    favoritesController.removeFavorite
);

export default router;
