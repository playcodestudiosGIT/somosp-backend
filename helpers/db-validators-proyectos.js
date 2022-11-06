
const Proyecto = require('../models/proyecto')

const existeProyecto = async (id) => {
    const existeProyecto = await Proyecto.findById(id)
    if (!existeProyecto){
        throw new Error(`El id ${id} no existe`);
    }
}


module.exports = {
    existeProyecto
}