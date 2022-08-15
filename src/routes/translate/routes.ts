import { Router } from 'express';

import { postTranslate, getLanguages } from '../../controllers/translate';
import { authorize, validateReqBody } from '../../middleware';

const router = Router();

router.get('/languages', authorize, getLanguages);
router.post('/translate', authorize, validateReqBody, postTranslate);

export default router;
