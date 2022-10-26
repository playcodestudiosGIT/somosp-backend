const { response, request } = require('express');
const Propiedad = require('../models/propiedad');
const {validationResult} = require('express-validator');


const propiedadesGet = ( req = request, res = response ) => {

    const query = req.query;

    res.json({
        msg: 'GET API PROPIEDAD - CONTROLADOR',
        query
    });
}

const propiedadesPut = (req,res = response) => {

    const id = req.params.id;

    res.json({
        msg: 'PUT API PROPIEDAD - CONTROLADOR',
        id
    });
}

const propiedadesPost = async (req,res) => {

    const { proyecto, sevendeoalquila, tipopropiedad, mts2, sector } = req.body;
    const propiedad = new Propiedad( {proyecto, sevendeoalquila, tipopropiedad, mts2, sector} );

    // Verificar si la propiedad existe
    const existePropiedad = await Propiedad.findOne({ proyecto });
    if(existePropiedad) {
        return res.status(400).json(
            {
                msg: 'La propiedad ya existe'
            }
        )
    }

    await propiedad.save();
    res.status(201).json({
        msg: 'nueva propiedad creada',
    });
}

const propiedadesDelete = (req,res) => {
    res.json({
        ok: true,
        msg: 'DELETE API PROPIEDAD  - CONTROLADOR'
    });
}


module.exports = {
    propiedadesGet,
    propiedadesPut,
    propiedadesPost,
    propiedadesDelete
}