/*
    Rutas de Usuarios / Auth:

    host + /api/auth
*/
const { Router } = require('express');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();


// Registro
// POST     localhost:8080/api/auth/new
router.post( '/new',
    [   //middlewares de errores.
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    crearUsuario );


// Login
// POST     localhost:8080/api/auth
router.post( '/',
    [   //middlewares de errores.
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos
    ],
    loginUsuario );


// Renovar Token
// GET     localhost:8080/api/auth/renew        Headers:  key -> x-token   value -> Un token valido
router.get( '/renew', validarJWT, revalidarToken );



module.exports = router;