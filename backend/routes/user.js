const express = require ('express'); // importer express
const router = express.Router();
const userCtrl = require('../controllers/user'); //importer le controllers pour les utilisateurs




// Création des routes par le frontend
router.post('/signup', userCtrl.signup );  

router.post('/login', userCtrl.login );

module.exports = router;   