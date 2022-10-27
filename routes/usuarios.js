

const { Router } = require('express');
const { check } = require('express-validator');

const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators-usuarios');

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/usuarios');



const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id', 'No es un id valido').custom( existeUsuarioPorId ),
    check('rol').custom( esRoleValido ), 
], usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo', 'El correo ya existe').custom( emailExiste ),
    check('rol').custom( esRoleValido ), 
], usuariosPost );

router.delete('/', usuariosDelete);

module.exports = router;

