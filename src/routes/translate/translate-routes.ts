import { Router } from 'express';
const { postTranslate, getLanguages } = require('../../controllers/translate');

const router = Router();
router.get('/languages', getLanguages);
router.post('/translate', postTranslate);

export default router;
