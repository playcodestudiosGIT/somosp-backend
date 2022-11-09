

const dbValidatorsPropiedades = require('./db-validators-propiedades');
const dbValidatorsProyectos = require('./db-validators-proyectos');
const dbValidatorsUsuarios = require('./db-validators-usuarios');
const generarJWT = require('./generar_jwt');
const googleVerify = require('./google-verify');
const subirArchivo = require('./subir-archivo');


module.exports = {
    ...dbValidatorsPropiedades,
    ...dbValidatorsProyectos,
    ...dbValidatorsUsuarios,
    ...generarJWT,
    ...googleVerify,
    ...subirArchivo
}