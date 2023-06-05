import Router from 'express';
import { UserController } from '../controller/UserController';

const userController = new UserController();

const router = Router();

router.post('/create', userController.store);
router.get('/users', userController.index);

export { router };