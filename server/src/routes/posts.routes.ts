import { Router } from "express";
import controller from "../controllers/posts.controller";

import { isAuthenticated } from "../middlewares";

const router = Router();

// GET http:///localhost:3000/posts -> récupérer tout les posts
router.get('/', controller.getAll);

// GET http:///localhost:3000/posts/25 -> récupérer un post en fonction de son id
router.get('/:id', controller.get);

// [POST] -     http://localhost:3000/posts -> créer un post
router.post('/', isAuthenticated, controller.create);

// [PUT] -     http://localhost:3000/posts/25 -> éditer un post
router.put('/:id', isAuthenticated, controller.update);

// [DELETE] -     http://localhost:3000/posts/25 -> supprimer un post
router.delete('/:id', isAuthenticated, controller.delete);

export default router;