const path = require('path');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const {Usuario, Proyecto, Propiedad} = require('../models');

cloudinary.config( process.env.CLOUDINARY_URL );

const mostrarImagen = async(req, res = response) => {

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
          return res.sendFile( pathImagen );
        }
      }
      pathImagen = path.join(__dirname, '../assets', 'no-image.jpg');
      res.sendFile(pathImagen);
  
  }

  module.exports = {
    mostrarImagen
  }