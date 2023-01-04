const Mensaje = require("../models/Mensaje");
const Usuario = require("../models/Usuario");


/*
    funcion para poner el status de online al usuario, para este punto del codigo ya debemos de saber el uid.
*/
const usuarioConectado = async( uid ) => {          

    const usuario = await Usuario.findById( uid );
    usuario.online = true;
    await usuario.save();               //actualizando el usuario a online.

    return usuario;

}


/*
    funcion para poner el status de offline al usuario
*/
const usuarioDesconectado = async( uid ) => {
    const usuario = await Usuario.findById( uid );
    usuario.online = false;
    await usuario.save();               //actualizando el usuario a online.

    return usuario;
}


/*
    Obteniendo Usuarios de la DB.
*/
const getUsuarios = async() => {

    //Ordenando usuarios para que los que estan online aparescan primero. Al parecer el guion alado del online importa.
    const usuarios = await Usuario.find().sort('-online');  

    return usuarios;
}


/*
    Grabando mensaje en la DB.
*/
const grabarMensaje = async( payload ) => {

    try {

        const mensaje = new Mensaje( payload );
        await mensaje.save();

        return mensaje;

    } catch (error) {

        console.log( error );
        return false;

    }

}


module.exports = {
    usuarioConectado,
    usuarioDesconectado,
    getUsuarios,
    grabarMensaje
}