import { Router } from 'express';
import { getUser, register, login, logout } from '../../controllers/auth';

const router = Router();

router.get('/users', getUser);
router.post('/register', register);
router.post('/login', login);
router.delete('/logout', logout);

export default router;
