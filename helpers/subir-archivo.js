const path = require('path');
const { v4: uuidv4 } = require('uuid');


const subirArchivo = (files, extensionesValidas = ['png', 'PNG', 'jpg', 'JPG', 'jpeg', 'JPEG', 'gif', 'GIF'], carpeta = '') => {

    return new Promise((resolve, reject) => {

        const { archivo } = files;

        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[ nombreCortado.length -1 ];

        // Validar extension

        if (!extensionesValidas.includes(extension)){
            return reject(`La extencion ${extension} no es permitida - ${extensionesValidas}`);
        }

        const nombreTemp = uuidv4() + '.' + extension;

        const uploadPath = path.join( __dirname, '../uploads/', carpeta,  nombreTemp );

        archivo.mv(uploadPath, (err) => {
            if (err) {
                console.log(err);
                reject(err);
            }

            resolve(nombreTemp);
        });
    })

    


}
const subirPdf = (files, extensionesValidas = ['pdf', 'PDF'], carpeta = 'CV') => {

    return new Promise((resolve, reject) => {

        const { archivo } = files;

        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[ nombreCortado.length -1 ];

        // Validar extension

        if (!extensionesValidas.includes(extension)){
            return reject(`La extencion ${extension} no es permitida - ${extensionesValidas}`);
        }

        
        
        
        
        
        archivo.mv(uploadPath, (err) => {
            if (err) {
                console.log(err);
                reject(err);
            }

            fileData = {
                fileName: archivo.name,
                size: archivo.size,

            }

            resolve(fileData);
        });
    })

    


}


module.exports = {
    subirArchivo,
    subirPdf
}   