import { Router } from 'express';
import translateRoutes from './routes';

const router = Router();
router.use('/translateAPI', translateRoutes);

export default router;
