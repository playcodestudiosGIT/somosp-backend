const { response, request } = require('express');
const Propiedad = require('../models/propiedad');
const {validationResult} = require('express-validator');


const propiedadesGet = async( req = request, res = response ) => {

    const { limite, desde = 0 } = req.query

    const [total, usuarios] = await Promise.all([
        Propiedad.countDocuments({estado: true}),
        Propiedad.find({estado: true})
            .skip(desde)
            .limit(limite)
    ])


    res.json({
        total,
        usuarios
    });
}

const propiedadesPut = async(req,res = response) => {

    //TODO: QUITAR ESTE MIDDLEWARE DE AQUI - MOVERLO A VALIDAR CAMPOS

    const errors = validationResult(req);
     if (!errors.isEmpty()){
         return res.status(400).json({
             msg:'error en el validation result',
             errors 
         })
     }

    const id = req.params.id;

    const { _id, ...resto  } = req.body;

    const propiedad = await Propiedad.findByIdAndUpdate( id, resto, {new: true} );

    res.json({
        propiedad
    });
}

 
const propiedadesPost = async (req,res) => {

    //TODO: QUITAR ESTE MIDDLEWARE DE AQUI - MOVERLO A VALIDAR CAMPOS
    
     // middleware de validacion de errores 
     const errors = validationResult(req);
     if (!errors.isEmpty()){
         return res.status(400).json({
             msg:'error en el validation result',
             errors 
         })
     }

    const { proyecto, sevendeoalquila, tipopropiedad, mts2, sector } = req.body;
    const propiedad = new Propiedad( {proyecto, sevendeoalquila, tipopropiedad, mts2, sector} );

    // Verificar si la propiedad existe
    const existePropiedad = await Propiedad.findOne({ proyecto });
    if(existePropiedad) {
        return res.status(400).json(
            {
                msg: 'La propiedad ya existe'
            }
        );
    }

    await propiedad.save();
    res.status(201).json({
        msg: 'nueva propiedad creada',
    });
}

const propiedadesDelete = async(req,res) => {
    //TODO: QUITAR ESTE MIDDLEWARE DE AQUI -MOVERLO A VALIDAR CAMPOS

    // middleware de validacion de errores
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({
            msg:'error en el validation result',
            errors 
        })
    }

    const {id} = req.params
    const propiedadBorrada = await Propiedad.findByIdAndUpdate( id, { estado: false });
    const quienLoBorro = req.usuario; 
    res.json({
        msg: 'La propiedad se ha eliminado con exito',
        propiedadBorrada, quienLoBorro
    });
}


module.exports = {
    propiedadesGet,
    propiedadesPut,
    propiedadesPost,
    propiedadesDelete
}