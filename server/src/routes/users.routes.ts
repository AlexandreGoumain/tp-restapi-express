import { Router } from 'express';
import { userController } from '../controllers/users.controller';
import { validateUUIDParam } from '../middlewares/validateUUIDParam';

const router = Router();

// GET http://localhost:3000/users
router.get('/', userController.getAll);

// GET http://localhost:3000/users/:id
router.get('/:id', validateUUIDParam('id'), userController.get);

// PUT http://localhost:3000/users/:id
router.put(
    '/:idUserRequest',
    validateUUIDParam('idUserRequest'),
    userController.update
);

// PUT http://localhost:3000/users/:id/password
router.put(
    '/:idUserRequest/password',
    validateUUIDParam('idUserRequest'),
    userController.updatePassword
);

// DELETE http://localhost:3000/users/:id
router.delete('/', userController.delete);

export default router;
