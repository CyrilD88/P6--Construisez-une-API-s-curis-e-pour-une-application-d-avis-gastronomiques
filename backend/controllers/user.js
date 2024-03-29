const bcrypt = require("bcrypt");
const User = require ('../models/user');//importe le schéma de user
const jwt = require('jsonwebtoken');
const cryptojs = require ('crypto-js'); //importer le package pour crypter l'e-mail
const dotenv = require('dotenv').config();


//============================================fonction signup=========================================

exports.signup = (req, res, next) => {
bcrypt.hash(req.body.password, 10) // hacher le mdp (fonction asynchrone) ==> mdp du corps de la reqt passé dans le front + comb de fois on fait l'algo de hachage 
.then(hash=>{
    const user = new User({
        email:cryptojs.HmacSHA512(req.body.email, `${process.env.CRYPTOJS_CLE_DE_CHIFFREMENT_EMAIL}`).toString(),
        password: hash
    })
    user.save()
    .then(()=>res.status(201).json({message : 'utilisateur créé et sauvegardé'}))
    .catch((error) =>res.status(400).json({error}))
})
.catch((error) =>res.status(500).json({error}));
};



//============================================fonction login=========================================
exports.login = (req, res, next) => {
    User.findOne({ email:cryptojs.HmacSHA512(req.body.email, `${process.env.CRYPTOJS_CLE_DE_CHIFFREMENT_EMAIL}`).toString() })
    .then(user => {
        if (!user) {
            return res.status(401).json({ message: 'Le login/mot de passe incorrecte'});
        }
        bcrypt.compare(req.body.password, user.password)
            .then(valid => { 
                if (!valid) {
                    return res.status(401).json({ message: 'Le login/mot de passe incorrecte' });
                }
                res.status(200).json({
                    userId: user._id,
                    token: jwt.sign(
                        { userId: user._id },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' }
                    )
                });
            })
            .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
   
};