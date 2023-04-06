const express = require ('express'); // importer express
const router = express.Router();
const userCtrl = require('../controllers/user'); //importer le controllers pour les utilisateurs
const password = require ('../models/password')





// Création des routes par le frontend
router.post('/signup', password, userCtrl.signup );  

router.post('/login', userCtrl.login );

module.exports = router;   