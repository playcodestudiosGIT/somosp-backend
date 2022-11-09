
const { Router } = require('express');
const { check } = require('express-validator');
const { cargarImagen, actualizarImagenCloudinary } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers/db-validators-imagenes');
const { validarArchivoSubir, validarCampos } = require('../middlewares');


const router = Router();

router.post('/cargar-img', validarArchivoSubir, cargarImagen);

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'No es un mongoID').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'propiedades', 'proyectos'])),
    validarCampos,
], actualizarImagenCloudinary);

//actualizarImagen

module.exports = router;