const validaJWT = require('../middlewares/validar-jwt');
const validaRoles = require('../middlewares/validar-roles');
const validarArchivoSubir = require('../middlewares/validar-archivo');
const validarCampos = require('../middlewares/validar-campos');

module.exports = {
    ...validaJWT,
    ...validaRoles,
    ...validarArchivoSubir,
    ...validarCampos

}