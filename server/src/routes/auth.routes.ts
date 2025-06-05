import { Router } from 'express';
import controller from '../controllers/auth.controller';
import { upload } from '../middlewares/uploadMiddleware';

const router = Router();

// POST http://localhost:3000/auth/login
router.post('/login', controller.login);

// POST http://localhost:3000/auth/register
router.post('/register', upload.single("picture"), controller.register);

// GET http://localhost:3000/auth/logout
router.get('/logout', controller.logout);

export default router;
