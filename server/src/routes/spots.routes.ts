import { Router } from 'express';
import controller from '../controllers/spots.controller';
import { validateUUIDParam } from '../middlewares/validateUUIDParam';
import { isAuthenticated } from '../middlewares';

const router = Router();

// GET http:///localhost:3000/spots -> récupérer tout les spots
router.get('/', controller.getAll);

// GET http:///localhost:3000/spots/user -> récupérer les spots d'un utilisateur
router.get('/user', controller.getSpotsByUser);

// GET http:///localhost:3000/spots/25 -> récupérer un spot en fonction de son id
router.get('/:id', validateUUIDParam("id"), controller.get);

// [POST] -     http://localhost:3000/spots -> créer un spot
router.post('/', isAuthenticated, controller.create);

// [PUT] -     http://localhost:3000/spots/25 -> éditer un spot
router.put('/:id', validateUUIDParam("id"), isAuthenticated, controller.update); // TODO TESTER AVEC AUTH

// [DELETE] -     http://localhost:3000/spots/25 -> supprimer un spot
router.delete('/:idSpot', validateUUIDParam("idSpot"), isAuthenticated, controller.delete); // TODO TESTER AVEC AUTH

export default router;
