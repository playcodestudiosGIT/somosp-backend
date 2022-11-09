const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const {validationResult} = require('express-validator');

const usuariosGet = async( req = request, res = response ) => {

    const { limite = 20, desde = 0 } = req.query;
    const query = { estado: true }



    const resp = await Promise.all([
        Usuario.countDocuments({estado: true}),
        Usuario.find(query)
            .skip(desde)
            .limit(limite)
    ])

    res.json({

        resp
    
    });
}

const usuariosPut = async(req,res = response) => {

    const id = req.params.id;
    const {_id, password, google, correo, ...resto} = req.body;

    //TODO: Validar con base de datos

    if (password) {
         // Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto, {new: true} );

    res.json({
        msg: 'PUT API DE ACTUALIZACIONES - CONTROLADOR',
        usuario
    });
}

const usuariosPost = async (req,res) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

 
    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar BD
    await usuario.save();
    res.status(201).json({
        usuario
    });
}

const usuariosDelete = async(req,res) => {

    const { id } = req.params;

    const usuarioBorrado = await Usuario.findByIdAndUpdate( id, { estado: false });
    // quien lo borró? // const quienLoBorro = req.usuario

    res.json({
        msg: 'El usuario ha sido eliminado con exito',
        usuarioBorrado,
    });
}


module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}