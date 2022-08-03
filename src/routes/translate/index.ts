import { Router } from 'express';
import translateRoutes from './translate-routes';

const router = Router();
router.use('/translateAPI', translateRoutes);

export default router;
