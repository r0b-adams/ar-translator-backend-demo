import { Router } from 'express';
import authRoutes from './routes';

const router = Router();
router.use('/translateAPI', authRoutes);

export default router;