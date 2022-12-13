const { Schema, model } = require('mongoose');

const ProyectoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El Nombre del Proyecto es obligatorio'],
        unique: true
    },
    direccion: {
        type: String,
        default: '-'
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    ciudad: {
        type: String,
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

    // Descripcion del proyecto

    
});


ProyectoSchema.methods.toJSON = function() {
    const {_id, __v, estado, ...proyecto  } = this.toObject();
    proyecto.uid = _id;
    return proyecto;
}

module.exports = model( 'Proyecto', ProyectoSchema );
