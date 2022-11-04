const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const {validationResult} = require('express-validator');

const usuariosGet = async( req = request, res = response ) => {

    const { limite = 10, desde = 0 } = req.query



    const resp = await Promise.all([
        Usuario.countDocuments({estado: true}),
        Usuario.find({estado: true})
            .skip(desde)
            .limit(limite)
    ])

    res.json({

        resp
    
    });
}

const usuariosPut = async(req,res = response) => {

    //TODO: QUITAR ESTE MIDDLEWARE DE AQUI -MOVERLO A VALIDAR CAMPOS

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({
            msg:'ERROR DE VALIDACION',
            errors 
        })
    }

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

    //TODO: QUITAR ESTE MIDDLEWARE DE AQUI -MOVERLO A VALIDAR CAMPOS

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

    //TODO: QUITAR ESTE MIDDLEWARE DE AQUI -MOVERLO A VALIDAR CAMPOS

    // middleware de validacion de errores
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({
            msg:'error en el validation result',
            errors 
        })
    }

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