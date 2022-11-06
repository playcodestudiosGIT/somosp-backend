
const { response } = require('express');
// const validationResult = require('express-validator');



const validarCampos = ( res = response, req, next ) => {

    // const errors = validationResult(req);
    // if (!errors.isEmpty()){
    //     return res.status(400).json({
    //         msg:'Error en las validaciones.',
    //         errors 
    //     })
    // }
    next();
}



module.exports = {
    validarCampos
}

