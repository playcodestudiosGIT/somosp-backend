const { Router } = require('express');
const { check } = require('express-validator');
const { mostrarImagen } = require('../controllers/img');
const { coleccionesPermitidas } = require('../helpers/db-validators-imagenes');
const { validarCampos } = require('../middlewares')

const router = Router();

router.get('/:coleccion/:id', [
    check('id', 'No es un mongoID').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'propiedades', 'proyectos'])),
    validarCampos,
], mostrarImagen )

module.exports = router;