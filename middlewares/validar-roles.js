const {response} = require('express');


const esAdminRol = (req, res = response, next) => {

    if(!req.usuario){
        return res.status(500).json({
            msg: 'se quiere verificar el rol sin validar token'
        });
    }

    const { rol, nombre} = req.usuario;
    if(rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${nombre} no es administrador - no tiene permiso`
        });
    }

    next();
}


const tieneRol = ( ...roles ) => {

    return (req, res = response, next ) => {

        if(!req.usuario){
            return res.status(500).json({
                msg: 'se quiere verificar el rol sin validar token'
            });
        }

        if (!roles.includes(req.usuario.rol)) return res.status(401).json({
            msg: `Debe ponerse en contacto con un Agente o un Administrador`
        });

        console.log(roles, req.usuario.rol)
        next();
    }
}


module.exports = {
    esAdminRol,
    tieneRol
}