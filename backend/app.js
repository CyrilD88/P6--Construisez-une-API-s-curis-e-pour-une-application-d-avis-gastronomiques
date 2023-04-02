const dotenv = require('dotenv').config();

//////////////////////////////////////////////////////////////////////////////Création des constanstes///////////////////////////////////////////////////////////////////////
const password = process.env.DB_PASSWORD;
const username = process.env.DB_USER;

// importer 
const express = require ('express'); 
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require ('cors');
const path = require('path');

// crééer une application express
const app = express(); 

//pour logger les request et les responses et les mettre en couleur 
app.use(morgan("dev"));


////////////////////////////////////////////////////////////////////////// Connexion à MongoDB avec mongoose////////////////////////
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

//permet de protéger les en-têtes 
app.use(cors());

//rend le corps des requêtes au format json  => en objet JS utilisable -- avant c'était body-parser
app.use(express.json());


//importartion des routes 
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');
  // Enregistrement des routes 

app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes) 
app.use('/images', express.static(path.join(__dirname, 'images')));

//exporter l'appliclation pour y accéder depuis les autres fichiers du projet
module.exports = app;  