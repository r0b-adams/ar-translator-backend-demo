import { Router } from 'express';

import { localizeAndTranslate } from '../../controllers/vision';
import { authorize, validate } from '../../middleware';

const router = Router();

router.post('/objects', authorize, validate, localizeAndTranslate);

export default router;
