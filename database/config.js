const mongoose = require('mongoose');

const dbConnection = async() => {

    try {

        mongoose.set('strictQuery', true);   //Habia un warning que decia que debia de arreglar esta linea para preparar el codigo a mongoose 7
        await mongoose.connect( process.env.DB_CNN );
        
        console.log('Base de Datos Conectada');
        
    } catch (error) {

        console.log(error);
        throw new Error('Error al iniciar la Base de Datos');

    }

}

module.exports = {
    dbConnection
}