const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT, tieneRol, esAdminRol, validarCampos } = require('../middlewares');

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
router.get('/obtener', obtenerProyectos)

//Obtener un Proyecto por id - público
router.get('/:id', [ 
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom( existeProyecto ),
    validarCampos
 ], obtenerProyectosPorID)

//Crear un Proyecto - Privado - Cualquier persona con un token valido
router.post('/', [
    validarJWT,
    tieneRol('ADMIN_ROLE', 'AGENTE_ROLE' ),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatorio').not().isEmpty(),
    check('direccion', 'La direccion es obligatorio').not().isEmpty(),
    check('ciudadPais', 'La ciudad es obligatorio').not().isEmpty(),
    check('lat', 'La coordenada Latitud es obligatoria'),
    check('lon', 'La coordenada Longitud es obligatoria'),
    check('amenidades', 'Las amenindades son obligatorias'),
    validarCampos
], crearProyecto )

//Actualizar un Proyecto - Privado - Cualquier persona con un token valido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom( existeProyecto ),
    tieneRol('ADMIN_ROLE', 'AGENTE_ROL'),
    validarCampos
], actualizarProyecto )

//Borrar un Proyecto - Privado - Solo admin
router.delete('/:id', [
    validarJWT,
    esAdminRol,
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom( existeProyecto ),
    validarCampos
], deleteProyecto)

module.exports = router;