/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/

import { Router } from 'express';
import { check } from 'express-validator';
import { loginUser, registerUser, renewToken } from '../controllers/auth';
import { fieldsValidator } from '../middlewares/fields-validator';
import { verifyJWT } from '../middlewares/verify-jwt';

const router: Router = Router();

router.post(
    '/register',
    // middlewares
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({min: 6}),
        fieldsValidator
    ],
    registerUser
);

router.post(
    '/', 
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({min: 6}),
        fieldsValidator
    ],
    loginUser
);

router.get(
    '/renew-token', 
    verifyJWT,
    renewToken
);

module.exports = router;