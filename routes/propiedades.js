
const {Router} = require('express');
const {check} = require('express-validator');
const { propiedadesGet, propiedadesPut, propiedadesPost, propiedadesDelete } = require('../controllers/propiedades');
const {validarCampos} = require('../middlewares/validar-campos');


const router = Router();

router.get('/', propiedadesGet);

router.put('/:id', propiedadesPut);

router.post('/', [
    check('proyecto', 'El nombre del proyecto es obligatorio').not().isEmpty(),
    check('sevendeoalquila', 'Obligatorio establecer si es de Venta o Alquiler').isIn(['Venta', 'Alquiler']),
    check('tipopropiedad', 'el tipo de propiedad es obligatorio').isIn(['Apartamento', 'Casa', 'Oficina', 'Lote']),
    check('mts2', 'Las medidas 2 son obligatorias').not().isEmpty(),
    check('sector', 'El sector es obligatorio').isIn(['Sector Centro', 'Sector Norte', 'Sector Este', 'Sector Oeste']),
    validarCampos
], propiedadesPost);

router.delete('/', propiedadesDelete);

module.exports = router;