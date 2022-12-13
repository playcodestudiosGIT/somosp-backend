const { Router } = require('express');
const { check } = require('express-validator');
const {validarJWT}= require('../middlewares')

const {login, googleSingIn, validarTokenUsuario}  = require('../controllers/auth');

const router = Router();

router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'la contraseña es obligatorio').not().isEmpty(),
],login );

router.post('/google', [
    check('id_token', 'ID Token de google requerido').not().isEmpty(),
],googleSingIn );

router.get('/',[
    validarJWT
], validarTokenUsuario );

module.exports = router;