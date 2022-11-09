const { Router } = require('express');
const { buscar, buscarPorProyecto } = require('../controllers/buscar');

const router = Router();


router.get('/:coleccion/:termino', buscar),



module.exports = router