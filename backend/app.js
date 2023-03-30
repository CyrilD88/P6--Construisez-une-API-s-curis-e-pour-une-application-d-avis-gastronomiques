const dotenv = require('dotenv').config();


//////////////////////////////////////////////////////////////////////////////Création des constanstes///////////////////////////////////////////////////////////////////////
const password = process.env.DB_PASSWORD;
const username = process.env.DB_USER;
const express = require ('express'); // importer express

const userRoutes = require('./routes/user');

const app = express(); // crééer une application express

const mongoose = require('mongoose')
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.bugrigf.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


//création des headers pour CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});



  // Enregistrement des routes 

app.use('/api/auth', userRoutes);



 

module.exports = app;  //exporter l'appliclation pour y accéder depuis les autres fichiers du projet