
const {response, json} = require('express');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar_jwt');
const { googleVerify } = require('../helpers/google-verify');


const login = async (req, res = response) => {

    //TODO: QUITAR ESTE MIDDLEWARE DE AQUI -MOVERLO A VALIDAR CAMPOS
    // middleware de validacion de errores
    
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({
            msg:'ERROR DE VALIDACION',
            errors 
        })
    }

    const { correo, password } = req.body

    try {

        const usuario = await Usuario.findOne({correo});
        
        // verificar si email existe
        if ( !usuario ) return res.status(400).json({
            msg: 'Usuario / Password no son correctos - correo'
        });

        // si esta activo
        if ( !usuario.estado ) return res.status(400).json({
            msg: 'Usuario / Password no son correctos - estado: false'
        });
        // verificar pass
        const validPass = bcryptjs.compareSync(password, usuario.password);
        if (!validPass) return res.status(400).json({
            msg: 'Usuario / Password no son correctos - password'
        });

        // establecer el JWT
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        })
    
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Algo salio mal'
        })
    }

    
}

const googleSingIn = async( req, res = response ) => {

    //TODO: QUITAR ESTE MIDDLEWARE DE AQUI -MOVERLO A VALIDAR CAMPOS
    // middleware de validacion de errores

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({
            msg:'ERROR DE VALIDACION',
            errors 
        })
    }

    const {id_token} = req.body;

    try {
        const { nombre, correo, img } = await googleVerify(id_token);

        // Verificar si usuario existe en la BD
        let usuario = await Usuario.findOne({correo});


        // Si el usuario no existe en la BD, crear usuario
        if (!usuario) { 

            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                google: true,
                rol: 'USER_ROLE'
            };

            usuario = new Usuario( data );
            await usuario.save();
        }

        // Si el usuario en BD
        if ( !usuario.estado ){
            return res.status(401).json({
                msg: 'Este usuario ha sido bloqueado, hable con un administrador'
            })
        }

        //Generar JWT
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        })
        
    } catch (error) {
        json.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        })
    }


}

const validarTokenUsuario = async (req, res = response ) => {

    // Generar el JWT
    const token = await generarJWT( req.usuario._id );
    
    res.json({
        usuario: req.usuario,
        token: token,
    })

}


module.exports = {
    login, 
    googleSingIn,
    validarTokenUsuario
};
