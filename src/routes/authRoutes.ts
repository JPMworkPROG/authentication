import { Router } from 'express';
import AuthController from '../controllers/authController';
import UserService from '../services/userService';
import AuthService from '../services/authService';

const router = Router();
const userService = new UserService();
const authService = new AuthService();
const authController = new AuthController(userService, authService);

router.post('/login', authController.login.bind(authController));
router.post('/register', authController.register.bind(authController));

export default router;