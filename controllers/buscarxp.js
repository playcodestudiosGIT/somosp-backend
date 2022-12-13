const { response } = require("express");
const { ObjectId } = require('mongoose').Types;
const { Propiedad} = require('../models');





const buscarPorProyecto = async(req, res = response) => {
    const { idproyecto } = req.params;
    const isMongoID = ObjectId.isValid( idproyecto ); //true/true

    if(isMongoID){
        const propiedades = await Propiedad.findById(idproyecto).populate('proyecto', 'nombre').populate('usuario', 'nombre');
        return res.json({
            results: propiedades
        })
    }

    const regex = new RegExp( idproyecto, 'i' )
    const propiedades = await Propiedad.find({
        $or:[{propiedad: regex}, {descripcion: regex}],
        $and: [{estado: true}]
    }).populate('proyecto', 'nombre').populate('usuario', 'nombre');

    return res.json({
        results: propiedades
    })

    
}






module.exports = {

    buscarPorProyecto
    
}