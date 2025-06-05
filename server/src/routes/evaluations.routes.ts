import { Router } from 'express';
import evaluationsController from '../controllers/evaluations.controller';
import { isAuthenticated } from '../middlewares';

const router = Router();

// GET http:///localhost:3000/evaluations/25 -> récupérer un commentaire en fonction de son id
router.get('/:id', evaluationsController.get);

// GET http:///localhost:3000/evaluations/spots/{id_spot} -> récupérer toutes les evaluations d'un spot en fonction de l'id du spot
router.get('/spots/:id_spot', evaluationsController.getAllBySpot);

// GET http:///localhost:3000/evaluations/users/{id_user} -> récupérer toutes les evaluations d'un user en fonction de l'id du user
router.get('/users/:id_user', evaluationsController.getAllByUser);

// [POST] -     http://localhost:3000/evaluations -> créer un commentaire
router.post('/', isAuthenticated, evaluationsController.create);

// [PUT] -     http://localhost:3000/evaluations/25 -> éditer un commentaire
router.put('/:id', isAuthenticated, evaluationsController.update);

// [DELETE] -     http://localhost:3000/evaluations/25 -> supprimer un commentaire
router.delete('/:id', isAuthenticated, evaluationsController.delete);

export default router;

/* 
GET http:///localhost:3000/evaluations/spots/{id_spot}
    get toutes les evaluations d'un spot d'id {id_spot}
GET http:///localhost:3000/evaluations/users/{id_user}
    get toutes les evaluations d'un user d'id {id_user}
*/
