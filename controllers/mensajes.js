const Mensaje = require("../models/Mensaje");


const obtenerChat= async( req, res ) => {

    try {
        
        const miId = req.uid;                       //obtenemos el id del usuario logueado.
        const mensajesDe = req.params.de;           //obtenemos el id de la persona a la que abrimos el chat.

        /*
            Necesitamos obtener mensajes de la persona para esto buscamos en nuestro modelo Mensaje, para buscar le ponemos
            una condicion or, que en el modelo exista mensajes de (mi id) o para (del id de la persona a la que le quiero escribir) o
            viceversa, con esta condicion nos aseguramos que nos carguen los mensajes que solo hemos tenido con esa persona,
            despues que nos los traiga en orden de fechas de creación (como un chat normal) y que traiga solo un limite de 30. 
        */
        const last30Messages = await Mensaje.find({
            $or: [
                { de: miId, para: mensajesDe },
                { de: mensajesDe, para: miId }
            ]
        }).sort({ createdAt: 'desc' }).limit( 30 );

    
        res.json({
            ok: true,
            mensajes: last30Messages.reverse()
        })

    } catch(error) {
        console.log(error);
        res.status(500).json({                               
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
        
}

module.exports = { 
    obtenerChat
}