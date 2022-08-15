import { Router } from 'express';
import visionRoutes from './visionRoutes';

const router = Router();
router.use('/visionAPI', visionRoutes);

export default router;
