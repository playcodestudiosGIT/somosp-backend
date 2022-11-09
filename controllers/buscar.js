const { response } = require("express");
const { ObjectId } = require('mongoose').Types;
const { Usuario, Propiedad, Proyecto } = require('../models');
const { findById } = require("../models/propiedad");


const coleccionesPermitidas = [
    'usuarios',
    'proyectos',
    'propiedades',
    'roles'
]


const buscarUsuarios = async( termino = '', res = response ) => {
    
    const esMongoID = ObjectId.isValid( termino ); //true

    if ( esMongoID ) {
        const usuario = await Usuario.findById( termino );
        return res.json({
            results: (usuario) ? [ usuario ] : []

        });
    }

    const regex = new RegExp(termino, 'i')

    const usuarios = await Usuario.find({
        $or:[{nombre: regex}, {correo: regex}],
        $and: [{estado: true}]
    });


    res.json({
        results: usuarios

    });
}

const buscarProyectos = async( termino = '', res = response ) => {
    
    const esMongoID = ObjectId.isValid( termino ); //true

    if ( esMongoID ) {
        const proyecto = await Proyecto.findById( termino );
        return res.json({
            results: (proyecto) ? [ proyecto ] : []

        });
    }

    const regex = new RegExp(termino, 'i')

    const proyectos = await Proyecto.find({nombre: regex, estado: true});


    res.json({
        results: proyectos

    });
}

const buscarPropiedades = async( termino = '', res = response ) => {
    
    const esMongoID = ObjectId.isValid( termino ); //true

    if ( esMongoID ) {
        const propiedad = await Propiedad.findById( termino ).populate('proyecto', 'nombre');
        return res.json({
            results: (propiedad) ? [ propiedad ] : []

        });
    }

    const regex = new RegExp(termino, 'i')

    const propiedad = await Propiedad.find({propiedadID: regex, estado: true}).populate('proyecto', 'nombre');


    res.json({
        results: propiedad

    });
}



const buscar = (req, res = response) => {

    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) return res.status(400).json({
        msg: `'Las colecciones permitidas son: ${coleccionesPermitidas}'`
    })

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res);

            break;   
        case 'proyectos':
            buscarProyectos(termino, res);
            break;  
        case 'propiedades':
            buscarPropiedades(termino, res);
            break;

        default:
            res.status(500).json({
                msg: 'Se me olvido hacer esta busqueda'
            })
    }
}

module.exports = {
    buscar,
    
}