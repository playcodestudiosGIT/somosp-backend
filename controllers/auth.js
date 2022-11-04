
const {response} = require('express');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar_jwt');


const login = async (req, res = response) => {

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


module.exports = {login};
