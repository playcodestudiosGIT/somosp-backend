const Role = require('../models/role');
const Usuario = require('../models/usuario')



const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({rol});
    if (!existeRol) {
        throw new Error(`el rol ${rol} no esta registrado`);   
    }
    }

   // Verificar si el correo existe
const emailExiste = async ( correo ) => {
   const existeEmail = await Usuario.findOne({ correo })
   if(existeEmail) {
       throw new Error(`${correo} ya existe, intenta recuperar tu contraseña ó elige otro`);
   }
}

const existeUsuarioPorId = async (id) => {
    const existeUsuario = await Usuario.findById(id)
    if (!existeUsuario){
        throw new Error(`El id ${id} no existe`);
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}
