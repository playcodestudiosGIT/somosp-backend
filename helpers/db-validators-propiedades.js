const Role = require('../models/role');
const Propiedad = require('../models/propiedad');

const existePropiedadPorId = async (id) => {
    const existePropiedad = await Propiedad.findById(id)
    if (!existePropiedad){
        throw new Error(`El id ${id} no existe`);
    }
}

module.exports = {

    existePropiedadPorId,
}
