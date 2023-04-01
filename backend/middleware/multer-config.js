//////////////////////////////////////////////////////////////////////////////Création des constanstes///////////////////////////////////////////////////////////////////////
const multer = require('multer');

//création du dictionnaire
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

/* création de l'objet de configuration*/
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_'); //gestion des espaces dans le nom du fichier d'origine. On remplace les espaces par '_'
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension); //création du filename 
    }
});

module.exports = multer({ storage }).single('image');