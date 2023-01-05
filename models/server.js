
const express  = require('express');                                                           // Servidor de Express
const http     = require('http');
const socketio = require('socket.io');
const path     = require('path');
const cors     = require('cors');

const Sockets  = require('./sockets');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {

        this.app  = express();
        this.port = process.env.PORT || 8080;

        //Conectar a DB
        dbConnection();
        
        this.server = http.createServer( this.app );                                            // Http server
        
        // Configuraciones de sockets
        this.io = socketio( this.server, { /* configuraciones */ } );
    }

    middlewares() {
        
        // Desplegar el directorio público
        this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );

        // CORS
        this.app.use( cors() );

        //Lectura y parseo del body.
        this.app.use( express.json() );

        //API Endpoints
        this.app.use('/api/auth', require('../routes/auth') );
        this.app.use('/api/mensajes', require('../routes/mensajes') );

    }

    // Esta configuración se puede tener aquí o como propieda de clase depende mucho de lo que necesites
    configurarSockets() {
        new Sockets( this.io );
    }

    execute() {

        // Inicializar Middlewares
        this.middlewares();

        // Inicializar sockets
        this.configurarSockets();

        // Inicializar Server
        this.server.listen( this.port, () => {
            console.log('Server corriendo en puerto:', this.port );
        });
    }

}

module.exports = Server;