/*
    Rutas de Mensajes

    host + /api/mensajes
*/
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { obtenerChat } = require('../controllers/mensajes');


const router = Router();


// Obtiene mensajes del chat que se requiere.
// GET   localhost:8080/api/mensajes/de  (id de la persona que se requieran los mensajes)   Headers:  key -> x-token   value -> Un token valido    
router.get( '/:de', validarJWT, obtenerChat );



module.exports = router;