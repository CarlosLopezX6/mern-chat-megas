const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    online: {
        type: Boolean,
        default: false
    }
})


/*
    Hacemos algo para eliminar un campo que se manda en la respuesta, como tal no lo eliminamos de la base de datos solo como
    que no los mandamos, asi las respuestas se veran mas limpias, el _id de cada peticion hecha lo renombraremos a uid nadamas.
    uid es como un estandar para llamar al id del usuario.
    
    OJO: esto es solo para que se vea bien en la respuesta de las peticiones, los campos anteriores mencionados no se cambian
    ni se eliminan del registro de la base de datos con este metodo.
*/

UsuarioSchema.method('toJSON', function() {
    const { __v, _id, password, ...object} = this.toObject();         //Referencia a todo el objeto que se guarda en la DB
    object.uid = _id;
    return object;
});


module.exports = model( 'Usuario', UsuarioSchema );       //Mongoose le pondra la "s" al final a Usuario, cuando se grabe dira: Usuarios