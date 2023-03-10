
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
        //this.io = socketio( this.server, { /* configuraciones */ } );
        this.io = socketio( this.server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"],
                credentials: true
            }
        } );
    }

    middlewares() {
        
        // Desplegar el directorio público
        //this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );
        this.app.use( express.static( 'public' ) );

        // CORS
        this.app.use( cors() );

        //Lectura y parseo del body.
        this.app.use( express.json() );

        //API Endpoints
        this.app.use('/api/auth', require('../routes/auth') );
        this.app.use('/api/mensajes', require('../routes/mensajes') );

        //Comodin para arreglar el error de rutas en produccion, cualquier ruta que no sean las de arriba las va a servir el index.html.
        this.app.get('*', (req, res) => {
            //res.sendFile('index.html', { root: path.join(__dirname, '../public') });
            res.sendFile( path.join(__dirname, '../public', 'index.html') );
        })

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