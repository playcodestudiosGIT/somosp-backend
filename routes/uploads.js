
const { Router } = require('express');
const { check } = require('express-validator');
const { cargarImagen, actualizarImagenCloudinary, agregarGaleria, cargarPdf } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers/db-validators-imagenes');
const { validarArchivoSubir, validarCampos } = require('../middlewares');


const router = Router();

router.post('/cargar-img', validarArchivoSubir, cargarImagen);
router.post('/cargar-pdf', cargarPdf);

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'No es un mongoID').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'propiedades', 'proyectos'])),
    validarCampos,
], actualizarImagenCloudinary);

router.put('/:coleccion/:id/:index', [
    validarArchivoSubir,
    check('id', 'No es un mongoID').isMongoId(),
    check('index', 'No hay index en la peticion'),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'propiedades', 'proyectos'])),
    validarCampos,
], agregarGaleria);

//actualizarImagen

module.exports = router;