
const {Router} = require('express');
const {check} = require('express-validator');
const { obtenerPropiedades, obtenerPropiedadesPorID, actualizarPropiedades, crearPropiedades, borrarPropiedades } = require('../controllers/propiedades');
const { existePropiedadPorId } = require('../helpers/db-validators-propiedades');
const { existeProyecto } = require('../helpers/db-validators-proyectos');
const { esRoleValido } = require('../helpers/db-validators-usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');
const { tieneRol } = require('../middlewares/validar-roles');


const router = Router();

router.get('/', obtenerPropiedades);

router.get('/:id', [
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom( existeProyecto )
], obtenerPropiedadesPorID);

router.put('/:id', [
    validarJWT,
    tieneRol('ADMIN_ROLE', 'AGENTE_ROLE' ),
    check('id', 'No es un id de Mongo').isMongoId(),
    check('id').custom( existePropiedadPorId )
    
], actualizarPropiedades);

router.post('/', [
    validarJWT,
    // esAdminRol,
    tieneRol('ADMIN_ROLE', 'AGENTE_ROLE' ),
    check('propiedadID', 'El nombre o numero de la propiedad es obligatorio').not().isEmpty(),
    check('sevendeoalquila', 'Obligatorio establecer si es de Venta o Alquiler').isIn(['Venta', 'Alquiler']),
    check('tipopropiedad', 'el tipo de propiedad es obligatorio').isIn(['Apartamento', 'Casa', 'Oficina', 'Lote', 'Local']),
    check('mts2', 'Las medidas 2 son obligatorias').not().isEmpty(),
    check('proyecto', 'No es un ID de mongo').isMongoId(),
    check('proyecto').custom(existeProyecto)
    // validarCampos
], crearPropiedades);

router.delete('/:id', [
    validarJWT,
    tieneRol('ADMIN_ROLE'),
    check('id', 'No es un id valido').isMongoId(),
    check('id', 'No es un id valido').custom( existePropiedadPorId ),
    // check('rol').custom( esRoleValido ), 
], borrarPropiedades);

module.exports = router;