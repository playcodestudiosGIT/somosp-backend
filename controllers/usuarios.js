const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const {validationResult} = require('express-validator');

const usuariosGet = ( req = request, res = response ) => {

    const { q, nombre, apikey } = req.query;

    res.json({
        msg: 'GET API USUARIOS - CONTROLADOR',
        q,
        nombre,
        apikey
    });
}

const usuariosPut = (req,res = response) => {

    

    const id = req.params.id;

    res.json({
        msg: 'PUT API DE ACTUALIZACIONES - CONTROLADOR',
        id
    });
}

const usuariosPost = async (req,res) => {

    // middleware de validacion de errores
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({
            msg:'error en el validation result',
            errors 
        })
    }

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo })
    if(existeEmail) {
        return res.status(400).json(
            {
                msg: 'Ese correo ya existe, intenta recuperar tu contraseña ó elige otro'
            }
        )
    }
    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar BD
    await usuario.save();
    res.status(201).json({
        usuario
    });
}

const usuariosDelete = (req,res) => {
    res.json({
        ok: true,
        msg: 'DELETE API DE BORRAR  - CONTROLADOR'
    });
}


module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}