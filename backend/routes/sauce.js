//////////////////////////////////////////////////////////////////////////////Création des constanstes///////////////////////////////////////////////////////////////////////
const express = require('express');
const router = express.Router();


//importation du middleware de protection pour les routes
const auth = require('../middleware/auth');

//importation du middleware qui permet de gérer les fichiers
const multer = require('../middleware/multer-config');

//importation de la logique métier de sauce
const sauceCtrl = require('../controllers/sauce');



/*Création des routes prévue par le frontend 1- Controle du token pour les autorisations 2- Multer pour les images 3- Redirection vers la fonction souhaité*/ 
router.post('/', auth, multer, sauceCtrl.createSauce);
router.get('/', auth, sauceCtrl.getAllSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, sauceCtrl.likesDislikes);

module.exports = router;