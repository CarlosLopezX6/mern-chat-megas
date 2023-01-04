const { Schema, model } = require('mongoose');

const MensajeSchema = Schema({
    de: {                                       //Hara referencia al modelo Usuario
        type: Schema.Types.ObjectId,         
        ref: 'Usuario',
        required: true
    },
    para: {                                     //Hara referencia al modelo Usuario
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    mensaje: {
        type: String,
        required: true
    }
}, {
    timestamps: true                            //Le asigna fecha de creación y fecha de ultima modificación al schema.
})


/*
    Hacemos algo para eliminar un campo que se manda en la respuesta, como tal no lo eliminamos de la base de datos solo como
    que no los mandamos, asi las respuestas se veran mas limpias.
    
    OJO: esto es solo para que se vea bien en la respuesta de las peticiones, los campos anteriores mencionados no se cambian
    ni se eliminan del registro de la base de datos con este metodo.
*/

MensajeSchema.method('toJSON', function() {
    const { __v, ...object} = this.toObject();         //Referencia a todo el objeto que se guarda en la DB.
    return object;
});


module.exports = model( 'Mensaje', MensajeSchema );         //Mongoose le pondra la "s" al final a Mensaje, cuando se grabe dira: Mensajes