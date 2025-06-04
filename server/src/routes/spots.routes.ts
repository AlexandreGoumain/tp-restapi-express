import { Router } from 'express';
import controller from '../controllers/posts.controller';

import { isAuthenticated } from '../middlewares';

const router = Router();

// GET http:///localhost:3000/spots -> récupérer tout les spots
router.get('/', controller.getAll);

// GET http:///localhost:3000/spots/25 -> récupérer un spot en fonction de son id
router.get('/:id', controller.get);

// [POST] -     http://localhost:3000/spots -> créer un spot
router.post('/', isAuthenticated, controller.create);

// [PUT] -     http://localhost:3000/spots/25 -> éditer un spot
router.put('/:id', isAuthenticated, controller.update);

// [DELETE] -     http://localhost:3000/spots/25 -> supprimer un spot
router.delete('/:id', isAuthenticated, controller.delete);

export default router;
