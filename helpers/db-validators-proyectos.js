
const Proyecto = require('../models/proyecto')

const existeProyecto = async (id) => {
    const existeProyecto = await Proyecto.findById(id)
    if (!existeProyecto){
        throw new Error(`El Proyecto de esta propiedad fue borrado. Proyecto:  ${id}`);
    }
}


module.exports = {
    existeProyecto
}