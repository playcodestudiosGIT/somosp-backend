const { Schema, model } = require('mongoose');

const PropiedadSchema = Schema({
    proyecto: {
        type: String,
        required: [true, 'El nombre del proyecto es obligatorio']
    },
    sevendeoalquila: {
        type: String,
        required: [true, 'El tipo es obligatorio'],
        enum: ['Venta', 'Alquiler']
    },
    tipopropiedad: {
        type: String,
        required: [true, 'La propiedad es obligatoria'],
        enum: ['Apartamento', 'Casa', 'Oficina', 'Lote']
    },
    mts2: {
        type: String,
        required: true,
        default: 'No Value'
    },
    sector: {
        type: String,
        required: true,
        enum: ['Sector Centro', 'Sector Norte', 'Sector Este', 'Sector Oeste']
    },
    img: {
        type: String,
    },
    habitaciones: {
        type: String,
        default: 'No hab',
    },
    precio: {
        type: String,
        default: 'No Price'
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
    }
    

});


module.exports = model( 'Propiedad', PropiedadSchema );