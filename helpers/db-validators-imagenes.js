
const Proyecto = require('../models/proyecto')

const coleccionesPermitidas = ( coleccion = '', colecciones = [] ) => {
    
    const incluida = colecciones.includes(coleccion);
    if (!incluida) {
        throw new Error(`La coleccion ${colecion} no es permitida, ${colecciones} `);

    }
    return true;
}


module.exports = {
    coleccionesPermitidas
}