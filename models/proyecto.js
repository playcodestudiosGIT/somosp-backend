const { Schema, model } = require('mongoose');

const ProyectoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El Nombre del Proyecto es obligatorio'],
        unique: true
    },
    direccion: {
        type: String,
        default: 'no set'
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    img: {
        type: String,
        default: ''
    },
    galeria: {
        type: Array
    }
});


ProyectoSchema.methods.toJSON = function() {
    const {_id, __v, estado, ...proyecto  } = this.toObject();
    proyecto.uid = _id;
    return proyecto;
}

module.exports = model( 'Proyecto', ProyectoSchema );
