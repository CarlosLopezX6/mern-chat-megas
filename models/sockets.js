const { usuarioConectado, usuarioDesconectado, getUsuarios, grabarMensaje } = require("../controllers/sockets");
const { comprobarJWT } = require("../helpers/jwt");

class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        
        // On connection
        this.io.on('connection', async( socket ) => {


            //VALIDANDO JWT PARA CONEXION DE CLIENTE  //Si el token no es valido, desconectarlo.
            /*
                Trae la info de la query al momento de una conexion de socket, recuerda que la query la mandamos desde el frontend
                y el nombre de la query tambien se lo ponemos en el frontend, decidi ponerle x-token para que sea mas identificable.
            */
            //console.log( socket.handshake.query['x-token'] );  
            const [ valido, uid ] = comprobarJWT( socket.handshake.query['x-token'] );

            if( !valido ) {
                console.log('socket no identificado');
                return socket.disconnect();
            }

            await usuarioConectado( uid );

            //Tambien podemos saber el nombre ya del usuario conectado.
            //const usuario = await usuarioConectado( uid );
            //console.log("Se conectó", usuario.name )

            //console.log("Cliente Conectado!");
            console.log("Cliente Conectado!", uid );



            //UNIENDO AL USUARIO A UNA SALA DE socket.io
            /*  
                Notas acerca de las salas:
                    -Se puede unir a muchas salas cuanto sean necesarias.
                    Ejemplo de creacion de sala y emitir solo en esa sala:

                    socket.join('sala-gamer');

                    this.io.to('sala-gamer').emit( algo_a_emitir );
            */
            socket.join( uid );  //El nombre de la sala será el uid del usuario.


            
            //EMITIR TODOS LOS USUARIOS CONECTADOS
            this.io.emit('lista-usuarios', await getUsuarios() );



            //ESCUCHAR CUANDO UN CLIENTE MANDA UN MENSAJE PERSONAL.
            /* 
                payload es el objeto del mensaje
                {
                    de:             //  uid del usuario que envia el mensaje
                    para:           //  uid del usuario que recibe el mensaje
                    mensaje:        //  Lo que quiero enviar
                }
            */
            socket.on('mensaje-personal', async( payload ) => {
                const mensaje = await grabarMensaje( payload );
                this.io.to( payload.para ).emit('mensaje-personal', mensaje);
                this.io.to( payload.de ).emit('mensaje-personal', mensaje);
            })



            //DISCONNECT            Se marca en la DB que el usuario se desconecto.
            socket.on('disconnect', async() => {

                await usuarioDesconectado( uid );
                console.log("Cliente Desconectado");
                this.io.emit('lista-usuarios', await getUsuarios() );  //Cada que se desconecte un cliente emite dicho cambio.
            })
            
        });
    }

}

module.exports = Sockets;