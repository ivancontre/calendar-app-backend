/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/

import { Router } from 'express';
import { loginUser, registerUser, renewToken } from '../controllers/auth';

const router: Router = Router();

router.post('/register', registerUser);
router.post('/', loginUser);
router.get('/renew-token', renewToken);

module.exports = router;