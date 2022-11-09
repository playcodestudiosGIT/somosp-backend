
const {Router} = require('express');
const {check} = require('express-validator');
const { obtenerPropiedades, obtenerPropiedadesPorID, actualizarPropiedades, crearPropiedades, borrarPropiedades } = require('../controllers/propiedades');
const { existeProyecto, existePropiedadPorId } = require('../helpers');
const { validarJWT, tieneRol, validarCampos } = require('../middlewares');


const router = Router();

router.get('/obtener', obtenerPropiedades);

router.get('/:id', [
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom( existeProyecto ),
    validarCampos
], obtenerPropiedadesPorID);

router.put('/:id', [
    validarJWT,
    tieneRol('ADMIN_ROLE', 'AGENTE_ROLE' ),
    check('id', 'No es un id de Mongo').isMongoId(),
    check('id').custom( existePropiedadPorId ),
    validarCampos
], actualizarPropiedades);

router.post('/', [
    validarJWT,
    tieneRol('ADMIN_ROLE', 'AGENTE_ROLE' ),
    check('propiedadID', 'El nombre o numero de la propiedad es obligatorio').not().isEmpty(),
    check('sevendeoalquila', 'Obligatorio establecer si es de Venta o Alquiler').isIn(['Venta', 'Alquiler']),
    check('tipopropiedad', 'el tipo de propiedad es obligatorio').isIn(['Apartamento', 'Casa', 'Oficina', 'Lote', 'Local']),
    check('mts2', 'Las medidas 2 son obligatorias').not().isEmpty(),
    check('proyecto', 'No hay proyecto con este id').isMongoId(),
    check('proyecto').custom(existeProyecto),
    validarCampos
], crearPropiedades);

router.delete('/:id', [
    validarJWT,
    tieneRol('ADMIN_ROLE'),
    check('id', 'No es un id valido').isMongoId(),
    check('id', 'No es un id valido').custom( existePropiedadPorId ),
    validarCampos
], borrarPropiedades);

module.exports = router;