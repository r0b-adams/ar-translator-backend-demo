import { Router } from 'express';

import { postTranslate, getLanguages } from '../../controllers/translate';
import { authorize, validate } from '../../middleware';

const router = Router();

router.get('/languages', authorize, getLanguages);
router.post('/translate', authorize, validate, postTranslate);

export default router;
