const { Router } = require('express');
const { buscarPorProyecto } = require('../controllers/buscarxp');

const router = Router();


router.get('/:idproyecto', buscarPorProyecto),



module.exports = router