const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT, tieneRol, esAdminRol } = require('../middlewares');

const { 

    crearProyecto, 
    obtenerProyectos, 
    obtenerProyectosPorID, 
    actualizarProyecto, 
    deleteProyecto

} = require('../controllers/proyectos');

const { existeProyecto } = require('../helpers/db-validators-proyectos');

const router = Router();

/**{{url}}/api/proyectos */

//Obtener todas los proyectos - público
router.get('/', obtenerProyectos)

//Obtener un Proyecto por id - público
router.get('/:id', [ 
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom( existeProyecto ) //
 ], obtenerProyectosPorID)

//Crear un Proyecto - Privado - Cualquier persona con un token valido
router.post('/', [
    validarJWT,
    tieneRol('ADMIN_ROLE', 'AGENTE_ROLE' ),
    check('nombre', 'El nombre es obligatorio').not().isEmpty()

], crearProyecto )

//Actualizar un Proyecto - Privado - Cualquier persona con un token valido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom( existeProyecto ),
    tieneRol('ADMIN_ROLE', 'AGENTE_ROL')
], actualizarProyecto )

//Borrar un Proyecto - Privado - Solo admin
router.delete('/:id', [
    validarJWT,
    esAdminRol,
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom( existeProyecto )
], deleteProyecto)

module.exports = router;