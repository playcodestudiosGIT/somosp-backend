
const {Router} = require('express');
const {check} = require('express-validator');
const { propiedadesGet, propiedadesPut, propiedadesPost, propiedadesDelete } = require('../controllers/propiedades');
const { existePropiedadPorId } = require('../helpers/db-validators-propiedades');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRol, tieneRol } = require('../middlewares/validar-roles');
// const { esRoleValido } = require('../helpers/db-validators-usuarios');


const router = Router();

router.get('/', propiedadesGet);

router.put('/:id', [
    validarJWT,
    // esAdminRol,
    tieneRol('ADMIN_ROLE', 'AGENTE_ROLE' ),
    check( 'id', 'No es un id valido' ).isMongoId(),
    check('id', 'El id no existe').custom( existePropiedadPorId ),
    // check('rol').custom( esRoleValido ), 
], propiedadesPut);

router.post('/', [
    validarJWT,
    // esAdminRol,
    tieneRol('ADMIN_ROLE', 'AGENTE_ROLE' ),
    check('proyecto', 'El nombre del proyecto es obligatorio').not().isEmpty(),
    check('sevendeoalquila', 'Obligatorio establecer si es de Venta o Alquiler').isIn(['Venta', 'Alquiler']),
    check('tipopropiedad', 'el tipo de propiedad es obligatorio').isIn(['Apartamento', 'Casa', 'Oficina', 'Lote']),
    check('mts2', 'Las medidas 2 son obligatorias').not().isEmpty(),
    check('sector', 'El sector es obligatorio').isIn(['Sector Centro', 'Sector Norte', 'Sector Este', 'Sector Oeste']),
], propiedadesPost);

router.delete('/:id', [
    validarJWT,
    // esAdminRol,
    tieneRol('ADMIN_ROLE'),
    check('id', 'No es un id valido').isMongoId(),
    check('id', 'No es un id valido').custom( existePropiedadPorId ),
    // check('rol').custom( esRoleValido ), 
], propiedadesDelete);

module.exports = router;