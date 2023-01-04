const jwt = require('jsonwebtoken');

const generarJWT = ( uid ) => {       //Para este proyecto de chat, meteremos al JWT solo el uid

    //Creamos una promesa a mano ya que el paquete de JWT hasta ahora aun no trabaja por si solo con promesas.
    return new Promise( ( resolve, reject ) => {
        
        const payload = { uid };

        //generamos y firmamos el jwt, la SECRET_JWT_SEED es una variable de entorno que yo mismo cree.
        //Si se cambia la SECRET_JWT_SEED deshabilita todos los tokens existentes.
        //Recibe el payload, la secret seed y las opciones que solo ponemos que el token dure 2 horas.
        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, ( err, token ) => {

            if( err ){
                console.log(err);
                reject('No se pudo generar el token.');
            }

            resolve( token );

        })

        
    })

}

const comprobarJWT = ( token = '' ) => { //Compruebo el Token para usarlo en el archivo sockets.js

    try {
        
        const { uid } = jwt.verify( token, process.env.SECRET_JWT_SEED );
        return [ true, uid ];

    } catch (error) {
        return [ false, null ];
    }

}


module.exports = {
    generarJWT,
    comprobarJWT
}