const Role = require('../models/role');



const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({rol});
    if (!existeRol) {
        throw new Error('el rol ${rol} no esta registrado');   
    }
    }

module.exports = {
    esRoleValido
}