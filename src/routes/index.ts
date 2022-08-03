import { Router } from 'express';
import translateAPI from './translate';
import visionAPI from './vision';

const router = Router();

router.use(translateAPI);
router.use(visionAPI);

export default router;
