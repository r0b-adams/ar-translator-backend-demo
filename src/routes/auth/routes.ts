import { Router } from 'express';

import { getUser, register, login, logout } from '../../controllers/auth';
import { authorize, validate } from '../../middleware';

const router = Router();

router.get('/users', authorize, getUser);
router.post('/register', validate, register);
router.post('/login', validate, login);
router.delete('/logout', authorize, logout);

export default router;
