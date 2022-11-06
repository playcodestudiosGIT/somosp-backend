

const { Router } = require('express');
const { check } = require('express-validator');

const { 
    emailExiste, 
    existeUsuarioPorId, 
    esRoleValido 
} = require('../helpers/db-validators-usuarios');

const { 
    usuariosGet, 
    usuariosPut, 
    usuariosPost, 
    usuariosDelete 
} = require('../controllers/usuarios');


const {
    validarCampos,
    esAdminRol,
    tieneRol,
    validarJWT
} = require('../middlewares')

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
    validarJWT,
    // esAdminRol,
    tieneRol('ADMIN_ROLE', 'AGENTE_ROLE' ),
    check('id', 'No es un id valido').isMongoId(),
    check('id', 'No es un id valido').custom( existeUsuarioPorId ),
], usuariosPut);

router.post('/', [
    validarJWT,
    // esAdminRol,
    tieneRol('ADMIN_ROLE', 'AGENTE_ROLE' ),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo', 'El correo ya existe').custom( emailExiste ),
    check('rol').custom( esRoleValido ),
], usuariosPost );

router.delete('/:id', [
    validarJWT,
    // esAdminRol,
    tieneRol('ADMIN_ROLE'),
    check('id', 'No es un id valido').isMongoId(),
    check('id', 'No es un id valido').custom( existeUsuarioPorId ),
    // check('rol').custom( esAdmin ), 
    
], usuariosDelete);

module.exports = router;

