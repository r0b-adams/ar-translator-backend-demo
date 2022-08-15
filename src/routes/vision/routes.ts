import { Router } from 'express';

import { localizeAndTranslate } from '../../controllers/vision';
import { authorize, validateReqBody } from '../../middleware';

const router = Router();

router.post('/objects', authorize, validateReqBody, localizeAndTranslate);

export default router;
