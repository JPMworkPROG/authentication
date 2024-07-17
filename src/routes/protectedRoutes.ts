import { Router } from 'express';
import ProtectedController from '../controllers/protectedController';
import authenticateJwt from '../middlewares/authMiddleware';

const router = Router();

router.get('/protected', authenticateJwt, ProtectedController.getProtectedData);

export default router;
