const { response, request } = require('express');
const Propiedad = require('../models/propiedad');
const {validationResult, body} = require('express-validator');


const obtenerPropiedades = async( req = request, res = response ) => {

    const { limite, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, propiedades] = await Promise.all([
        Propiedad.countDocuments(query),
        Propiedad.find(query)
            .populate('proyecto', 'nombre')
            .skip(desde)
            .limit(limite)
    ]);


    res.json({
        total,
        propiedades
    });
}

const obtenerPropiedadesPorID = async( req = request, res = response ) => {

    const { id } = req.params;

    const propiedad = await Propiedad.findById(id);
    if(!propiedad) return res.status(400).json({
        msg: 'La propiedad no existe. intenta con otra'
    });


    res.json({
        propiedad
    });
}

const actualizarPropiedades = async(req,res = response) => {

    const {id} = req.params;
    const { estado, usuario, ...resto } = req.body;
    if(resto.nombre){
        resto.nombre = data.nombre.toUpperCase();
    }

    resto.usuario = req.usuario._id;

    const propiedad = await Propiedad.findByIdAndUpdate( id, resto, {new: true} );

    res.json({
        propiedad
    });
}

 
const crearPropiedades = async (req,res) => {

    // //TODO: QUITAR ESTE MIDDLEWARE DE AQUI - MOVERLO A VALIDAR CAMPOS
    
     // middleware de validacion de errores 
     const errors = validationResult(req);
     if (!errors.isEmpty()){
         return res.status(400).json({
             msg:'Error en las validaciones.',
             errors 
         });
     };

    const { estado, usuario, ...resto } = req.body;

    // Verificar si la propiedad existe
    const propiedadDB = await Propiedad.findOne({ nombreProp: resto.nombreProp });
    if(propiedadDB) {
        return res.status(400).json(
            {
                msg: `La propiedad ${propiedadDB.propiedad} ya existe`
            }
        );
    };

    // Generar data
    const data = {
        ...resto,
        nombre: body.nombreProp,
        usuario: req.usuario._id
    };

    const propiedad = new Propiedad(data);

    await propiedad.save();
    res.status(201).json({
        msg: 'nueva propiedad creada',
        propiedad
    });
}

const borrarPropiedades = async(req,res) => {

    const {id} = req.params
    const propiedadBorrada = await Propiedad.findByIdAndUpdate( id, { estado: false }, {new:true});
    res.json({
        msg: 'La propiedad se ha eliminado con exito',
        propiedadBorrada,
    });
}


module.exports = {
    obtenerPropiedades,
    obtenerPropiedadesPorID,
    actualizarPropiedades,
    crearPropiedades,
    borrarPropiedades
}