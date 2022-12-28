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
    },
    ciudadPais: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    amenidades: {
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
    },
    lat: {
        type: String,
        require: true,
        default: '0'
    },
    lon: {
        type: String,
        require: true,
        default: '0'
    },
    piscina: {
        type: Boolean,
        default: false
    },
    estac: {
        type: Boolean,
        default: false
    },
    roomParty: {
        type: Boolean,
        default: false
    },
    gym: {
        type: Boolean,
        default: false
    },
    roomPlay: {
        type: Boolean,
        default: false
    },
    parque: {
        type: Boolean,
        default: false
    },
    tenis: {
        type: Boolean,
        default: false
    },
    squash: {
        type: Boolean,
        default: false
    },
    raquetball: {
        type: Boolean,
        default: false
    },
    futbol: {
        type: Boolean,
        default: false
    },



    // Descripcion del proyecto

    
});


ProyectoSchema.methods.toJSON = function() {
    const {_id, __v, estado, ...proyecto  } = this.toObject();
    proyecto.uid = _id;
    return proyecto;
}

module.exports = model( 'Proyecto', ProyectoSchema );
