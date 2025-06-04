// http://localhost:3000

import { Router } from 'express';
import authRouter from './auth.routes';
import commentRouter from './comments.routes';
import spotRouter from './spots.routes';
import userRouter from './users.routes';

const router = Router();

// http://localhost:3000/posts
router.use('/spots', spotRouter);

// http://localhost:3000/comments
router.use('/comments', commentRouter);

// http://localhost:3000/auth
router.use('/auth', authRouter);

// http://localhost:3000/users
router.use('/users', userRouter);

export default router;

// SERVER -> ROUTER (ce fichier) -> ROUTES (/users, /posts, ...) -> CONTROLLERS -> [MODELS] <-> DB
