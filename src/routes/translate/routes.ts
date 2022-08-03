import { Router } from 'express';
import { postTranslate, getLanguages } from '../../controllers/translate';

const router = Router();
router.get('/languages', getLanguages);
router.post('/translate', postTranslate);

export default router;
