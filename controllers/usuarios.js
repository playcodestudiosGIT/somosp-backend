const { response, request } = require('express');


const usuariosGet = (req = request, res = response) => {

    const { q, nombre, apikey} = req.query;

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

const usuariosPost = (req,res) => {
    const {nombre, edad} = req.body;
    res.status(201).json({
        msg: 'POST API DE CREACION  - CONTROLADOR',
        nombre, edad
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