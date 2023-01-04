const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = ( req, res = response, next) => {

    try {
        
        // x-token HEADERS  // x-token es el header que le vamos a tener que mandar para que el GET del token sea valido.
        const token = req.header('x-token');
    
        if( !token ){
            return res.status(401).json({                   //status para cuando no esta autenticado o no esta autorizado.
                ok: false,
                msg: 'No hay token en la petición.'
            });
        }


        //Verificamos que el payload este exactamente igual a como se verifico, cualquier manipulacion invalida el token.
        //tambien el token se invalida cuando ya paso el tiempo de expiracion del mismo.

        //const payload = jwt.verify(
        const { uid } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        req.uid = uid;
        
    } catch (error) {
        return res.status(401).json({                    //Error 401 es que no esta autorizado.
            ok: false,
            msg: 'Token no válido.'
        });
    }

    next();

}

module.exports = {
    validarJWT
}