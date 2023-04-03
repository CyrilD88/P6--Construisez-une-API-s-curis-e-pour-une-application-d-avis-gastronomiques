///////////////////////////////////////////////////////// Création du schéma pour le mot de passe utilisateur ///////////////////////////////////////


//importe package password-validator
const passwordValidator = require('password-validator');

//créé le schéma
let passwordSchema = new passwordValidator();
 
//propriétés du schéma / entre 5 et 100 caractères, minuscule ET majuscule, au moins 2 chiffres, pas d'espace //////////
passwordSchema
.is().min(5)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

//exorte le schéma
module.exports = passwordSchema;