import { Router } from 'express';
import { localizeAndTranslate } from '../../controllers/vision';

const router = Router();
router.post('/objects', localizeAndTranslate);

export default router;
