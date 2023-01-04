const Server = require("./models/server");               // Server Model: Contiene todo el servidor de express + socket.io configurado
require('dotenv').config();                              // Configuracion de variables globales para tenerlas en toda la app.

const server = new Server();                             // Inicializar la instancia del server
server.execute();                                        // Ejecutar el server





