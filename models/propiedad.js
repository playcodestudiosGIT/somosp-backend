const { Schema, model } = require('mongoose');

const PropiedadSchema = Schema({
    nombreProp: {
        type: String,
        required: [true, 'El nombre o numero de la propiedad es obligatorio']
    },
    direccion: {
        type: String,
        required: [true, 'La direccion es obligatoria']
    },
    detalles: {
        type: String,
        default: 'Sin detalles'
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
        required: true,
    },
    disponible:{
        type: Boolean,
        default: true
    },
    img: {
        type: String,
        default: 'https://res.cloudinary.com/dnejayiiq/image/upload/v1671851591/no-image_xb946x.jpg',
    },
    habitaciones: {
        type: String,
        default: '0',
    },
    precio: {
        type: Number,
        default: 0,
    },
    banos: {
        type: String,
        default: '0'
    },
    altura: {
        type: String,
        default: '0'
    },
    estacionamientos: {
        type: String,
        default: '0'
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