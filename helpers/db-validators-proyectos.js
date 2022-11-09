
const Proyecto = require('../models/proyecto')

const existeProyecto = async (id) => {
    const existeProyecto = await Proyecto.findById(id)
    if (!existeProyecto){
        throw new Error(`No existe proyecto con el id: ${id}`);
    }
}


module.exports = {
    existeProyecto
}