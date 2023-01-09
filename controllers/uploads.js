const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2;

const { response } = require("express");
const { subirArchivo, subirPdf } = require("../helpers");
const {Usuario, Proyecto, Propiedad} = require('../models');


cloudinary.config( process.env.CLOUDINARY_URL );

const cargarImagen = async(req, res = response) => {



  try {
    //   const nombre = await subirArchivo(req.files, ['txt', 'md', 'dart'], 'textos');
      const carpeta = req.body.carpeta ?? 'void';
      const nombre = await subirArchivo(req.files, undefined, carpeta);
      res.json({ nombre });
    
  } catch (msg) {
    res.status(400).json({ msg })
  }
  

  
}

const cargarPdf = async(req, res = response) => {


  try {
    //   const nombre = await subirArchivo(req.files, ['txt', 'md', 'dart'], 'textos');
      // const carpeta = req.body.carpeta ?? 'CV';
      const { tempFilePath } = req.files.archivo;
      const nombreCloud = req.files.archivo.name


      const {public_id, bytes, url, folder} = await cloudinary.uploader.upload(tempFilePath, {public_id: nombreCloud, folder: 'pdf/cv/'});
      nombre = public_id.split('/');

      const pdf = {
        nombrePdf: nombre[nombre.length - 1],
        size: bytes,
        path: folder,
        url: url
      }
      res.json(pdf);
    
  } catch (msg) {
    res.status(400).json({ msg })
  }
  

  
}


const actualizarImagen = async(req, res = response)=> {
  
    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
      case 'usuarios':
        modelo = await Usuario.findById(id);
        if (!modelo) return res.status(400).json({
          msg: `El usuario con el id ${id} no existe`
        });
        break;
      
      case 'propiedades':
        modelo = await Propiedad.findById(id);
        if (!modelo) return res.status(400).json({
          msg: `La propiedad con el id ${id} no existe`
        });
        break;

      case 'proyectos':
        modelo = await Proyecto.findById(id);
        if (!modelo) return res.status(400).json({
          msg: `El proyecto con el id ${id} no existe`
        })
        break;
    
      default:
        return res.status(500).json({msg: 'se me olvido validar esto'})

    }


    // Limpiar imagenes previas
    if ( modelo.img ){

      // 'BORRAR LA IMAGEN DEL SERVIDOR' necesito el path // hay que construirlo pathImage
      const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
      if ( fs.existsSync(pathImagen)){
        fs.unlinkSync(pathImagen);
      }
    }

    const nombre = await subirArchivo( req.files, undefined, coleccion );
    modelo.img = nombre;
    await modelo.save();

    res.json(modelo);
}


const actualizarImagenCloudinary = async(req, res = response)=> {
  
    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
      case 'usuarios':
        modelo = await Usuario.findById(id);
        if (!modelo) return res.status(400).json({
          msg: `El usuario con el id ${id} no existe`
        });
        break;
      
      case 'propiedades':
        modelo = await Propiedad.findById(id);
        if (!modelo) return res.status(400).json({
          msg: `La propiedad con el id ${id} no existe`
        });
        break;

      case 'proyectos':
        modelo = await Proyecto.findById(id);
        if (!modelo) return res.status(400).json({
          msg: `El proyecto con el id ${id} no existe`
        })
        break;
    
      default:
        return res.status(500).json({msg: 'se me olvido validar esto'})

    }


    // Limpiar imagenes previas de Cloudinary
    if ( modelo.img ){
      const nombreArr = modelo.img.split('/');
      const nombre = nombreArr[nombreArr.length - 1];
      const [ public_id ] = nombre.split('.');
      cloudinary.uploader.destroy(public_id);
    }

    const { tempFilePath } = req.files.archivo;

    const { secure_url } = await cloudinary.uploader.upload(tempFilePath)

    modelo.img = secure_url;
    await modelo.save();

    res.json(modelo);
}


const agregarGaleria = async(req, res = response)=> {
  
    const { id, coleccion, index } = req.params;

    let modelo;

    switch (coleccion) {
      case 'usuarios':
        modelo = await Usuario.findById(id);
        if (!modelo) return res.status(400).json({
          msg: `El usuario con el id ${id} no existe`
        });
        break;
      
      case 'propiedades':
        modelo = await Propiedad.findById(id);
        if (!modelo) return res.status(400).json({
          msg: `La propiedad con el id ${id} no existe`
        });
        break;

      case 'proyectos':
        modelo = await Proyecto.findById(id);
        if (!modelo) return res.status(400).json({
          msg: `El proyecto con el id ${id} no existe`
        })
        break;
    
      default:
        return res.status(500).json({msg: 'se me olvido validar esto'})

    }


    // Limpiar imagenes previas de Cloudinary
    if ( modelo.galeria[index] ){
      const nombreArr = modelo.galeria[index].split('/');
      const nombre = nombreArr[nombreArr.length - 1];
      const [ public_id ] = nombre.split('.');
      cloudinary.uploader.destroy(public_id);
    }

    const { tempFilePath } = req.files.archivo;

    const { secure_url } = await cloudinary.uploader.upload(tempFilePath)




    modelo.galeria[index] = secure_url;

    await modelo.save();

    res.json(modelo);
}


module.exports = {
  cargarImagen,
  actualizarImagen,
  actualizarImagenCloudinary,
  agregarGaleria,
  cargarPdf
}