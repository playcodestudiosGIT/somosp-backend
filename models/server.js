const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload')
const { dbConection } = require('../database/config');

class Server  {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth:           '/api/auth',
            buscar:         '/api/buscar',
            buscarxp:       '/api/buscarxp',
            usuarios:       '/api/usuarios',
            propiedades:    '/api/propiedades',
            proyectos:      '/api/proyectos',
            uploads:        '/api/uploads',
            img:            '/api/img'
        }


        // Conectar BD
        this.conectarDB();


        // middlewares
        this.middlewares();

        // Rutas
        this.routes();
    }

    async conectarDB(){
        await dbConection();
    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // Parseo y lectura del body
        this.app.use(express.json());

        // Directorio Publico
        this.app.use( express.static('public') );

        // Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes(){
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.buscarxp, require('../routes/buscarxp'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        this.app.use(this.paths.propiedades, require('../routes/propiedades'));
        this.app.use(this.paths.proyectos, require('../routes/proyectos'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));
        this.app.use(this.paths.img, require('../routes/img'));

    }

    listen(){
        this.app.listen(this.port, ()=> {
            console.log('Servidor Corriendo en el puerto', this.port)
        });
    }

}

module.exports = Server;