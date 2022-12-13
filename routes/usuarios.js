

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
    tieneRol,
    validarJWT
} = require('../middlewares')

const router = Router();

router.get('/obtener', usuariosGet);

router.put('/:id', [
    validarJWT,
    // esAdminRol,
    tieneRol('ADMIN_ROLE', 'AGENTE_ROLE' ),
    check('id', 'No es un id valido').isMongoId(),
    check('id', 'No es un id valido').custom( existeUsuarioPorId ),
    validarCampos
], usuariosPut);

router.post('/', [
    // validarJWT,
    // esAdminRol,

    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo', 'El correo ya existe').custom( emailExiste ),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPost );

router.delete('/:id', [
    validarJWT,
    tieneRol('ADMIN_ROLE'),
    check('id', 'No es un id valido').isMongoId(),
    check('id', 'No es un id valido').custom( existeUsuarioPorId ),
    validarCampos
], usuariosDelete);

module.exports = router;

