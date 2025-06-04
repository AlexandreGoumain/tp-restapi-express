import { Router } from "express";
import controller from "../controllers/comments.controller";
import { isAuthenticated } from "../middlewares";

const router = Router();

// GET http:///localhost:3000/comments/25 -> récupérer un commentaire en fonction de son id
router.get('/:id', controller.get);

// [POST] -     http://localhost:3000/comments -> créer un commentaire
router.post('/', isAuthenticated, controller.create);

// [PUT] -     http://localhost:3000/comments/25 -> éditer un commentaire
router.put('/:id', isAuthenticated, controller.update);

// [DELETE] -     http://localhost:3000/comments/25 -> supprimer un commentaire
router.delete('/:id', isAuthenticated, controller.delete);

export default router;