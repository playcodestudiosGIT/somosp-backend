const { response } = require("express");
const {validationResult, check} = require('express-validator');
const { validarJWT } = require("../middlewares");
const { findByIdAndUpdate } = require("../models/proyecto");
const Proyecto = require("../models/proyecto");
const Usuario = require("../models/usuario");


const obtenerProyectos = async(req, res = response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({
            msg:'Error en las validaciones.',
            errors 
        });
    }

    const { limite = 10, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, proyectos ] = await Promise.all([
        Proyecto.countDocuments(query),
        Proyecto.find(query)
        .populate('usuario', 'nombre')
            .skip(desde)
            .limit(limite)
    ]);

    res.json({
        total,
        proyectos
    
    });
}


const obtenerProyectosPorID = async(req, res = response) => {

    const { id } = req.params

    const proyecto = await Proyecto.findById(id).populate('usuario', 'nombre');
    if(!proyecto) return res.status(400).json({
        msg: 'El Proyecto no existe. intenta con otro'
    });



    res.json({
        proyecto
    
    });
}


const crearProyecto = async(req, res = response)=> {

    const nombre = req.body.nombre.toUpperCase();

    const {direccion, descripcion, ciudad} = req.body;

    const proyectoDB = await Proyecto.findOne({nombre})
    if (proyectoDB) return res.status(400).json({
        msg: `El Proyecto ${req.body.nombre} ya existe`
    });

    const usuario = req.usuario

    // Generar data a guardar
    const data = {
        ciudad,
        descripcion,
        direccion,
        nombre,
        usuario,
        
    }

    const proyecto = new Proyecto(data);
    await proyecto.save();

    res.status(201).json({
        msg: 'Categoria creada con exito',
        proyecto
    });
}


// actualizarProyecto

const actualizarProyecto = async(req, res = response) => {

     const id = req.params.id;
     const {estado, ...resto} = req.body;
     nombre = resto.nombre.toUpperCase();
     resto.usuario = req.usuario._id,
     resto.nombre = nombre

     const proyectoDB = await Proyecto.findOne({nombre});
     if (proyectoDB) return res.status(401).json({
        msg: "Ya hay un proyecto con ese nombre, intenta con otro"
     })

     const proyecto = await Proyecto.findByIdAndUpdate(id, resto, {new: true});

     res.json({
        msg: 'Proyecto actualizado',
        proyecto
     });
    
}
// borrarProyecto

const deleteProyecto = async(req, res = response) => {

     const { id } = req.params;
     const proyectoDB = await Proyecto.findById( id );
     console.log(proyectoDB.estado)
     if( proyectoDB.estado === false ) return res.json( {msg: 'Proyecto no existe'} );
     proyectoBorrado = await Proyecto.findByIdAndUpdate( id, {estado: false}, {new:true} );
     res.json({
        msg: 'El proyecto fue borrado con exito',
        proyectoBorrado
     })
}



module.exports = {
    crearProyecto,
    obtenerProyectos,
    obtenerProyectosPorID,
    actualizarProyecto,
    deleteProyecto
}