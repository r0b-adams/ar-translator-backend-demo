import { Router } from 'express';

import { getUser, register, login, logout } from '../../controllers/auth';
import {
  authorize,
  validateReqBody,
  checkUniqueness,
} from '../../middleware';

const router = Router();

router.get('/users', authorize, getUser);
router.post('/register', validateReqBody, checkUniqueness, register);
router.post('/login', validateReqBody, login);
router.delete('/logout', authorize, logout);

export default router;
