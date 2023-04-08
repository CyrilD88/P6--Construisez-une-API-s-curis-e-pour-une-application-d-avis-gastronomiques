// importer express
const express = require ('express'); 
const router = express.Router();

//importer le controllers pour les utilisateurs
const userCtrl = require('../controllers/user'); 
const password = require ('../models/password')




// Création des routes par le frontend
router.post('/signup', password, userCtrl.signup );  

router.post('/login', userCtrl.login );

module.exports = router;   