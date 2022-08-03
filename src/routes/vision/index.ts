import { Router } from 'express';
import visionRoutes from './routes';

const router = Router();
router.use('/visionAPI', visionRoutes);

export default router;
