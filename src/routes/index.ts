import { Router } from 'express';
import authEndpoints from './auth';
import translateAPI from './translate';
import visionAPI from './vision';

const router = Router();

router.use(authEndpoints);
router.use(translateAPI);
router.use(visionAPI);

export default router;
