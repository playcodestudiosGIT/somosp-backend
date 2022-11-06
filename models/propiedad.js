const { Schema, model } = require('mongoose');

const PropiedadSchema = Schema({
    propiedadID: {
        type: String,
        required: [true, 'El nombre o numero de la propiedad es obligatorio']
    },
    sevendeoalquila: {
        type: String,
        required: [true, 'El tipo es obligatorio'],
        enum: ['Venta', 'Alquiler']
    },
    tipopropiedad: {
        type: String,
        required: [true, 'La propiedad es obligatoria'],
        enum: ['Apartamento', 'Casa', 'Oficina', 'Local', 'Lote']
    },
    mts2: {
        type: String,
        required: true,
        default: 'No Value'
    },
    proyecto: {
        type: Schema.Types.ObjectId,
        ref: 'Proyecto',
        required: true,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    descripcion:{
        type: String,
    },
    disponible:{
        type: Boolean,
        default: true
    },
    img: {
        type: String,
    },
    habitaciones: {
        type: String,
        default: 'No hab',
    },
    precio: {
        type: Number,
        default: 0,
    },
    banos: {
        type: String,
        default: 'No Value'
    },
    altura: {
        type: String,
        default: 'No Value'
    },
    estacionamientos: {
        type: String,
        default: 'No Value'
    },
    galeria: {
        type: ['foto1', 'foto2', 'foto3'],
        default: ['https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg', 'https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg', 'https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg']
    },
    estado: {
        type: Boolean,
        default: true
    },
    
    

});

PropiedadSchema.methods.toJSON = function() {
    const { __v, _id, estado, ...propiedad  } = this.toObject();
    propiedad.uid = _id;
    return propiedad;
}

module.exports = model( 'Propiedad', PropiedadSchema );