import { Router } from 'express';

import { getUser, register, login, logout } from '../../controllers/auth';
import { authorize, validate, checkUniqueness } from '../../middleware';

const router = Router();

router.get('/users', authorize, getUser);
router.post('/register', validate, checkUniqueness, register);
router.post('/login', validate, login);
router.delete('/logout', authorize, logout);

export default router;
