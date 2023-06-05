import Router from 'express';

import { UserController } from '../controller/UserController';
import { AuthController } from '../controller/AuthController'; 
 
const userController = new UserController();
const authController = new AuthController();

const router = Router();

router.post('/create', userController.store);
router.get('/users', userController.index);
router.post('/auth', authController.authenticate);

export { router };