/*
    Rutas de User
    host + /api/user
*/

import { Router } from 'express';
import { getUsers } from '../controllers/user';
import { verifyJWT } from '../middlewares/verify-jwt';

const router: Router = Router();

// Todos los endpoints que estén abajo de router.use(verifyJWT) tendrán que verificar el token
router.use(verifyJWT);

router.get(
    '/',
    getUsers
);

module.exports = router;