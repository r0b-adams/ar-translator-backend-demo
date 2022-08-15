import { Router } from 'express';
import translateRoutes from './translateRoutes';

const router = Router();
router.use('/translateAPI', translateRoutes);

export default router;
