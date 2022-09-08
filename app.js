const express = require('express');
const app = express();

app.use((req, res, next) => {
    console.log('Requête reçue !');
    next();
  });
  
  app.use((req, res, next) => {
    res.status(201);
    next();
  });

app.use((req, res, next) =>{
    res.json({message : 'votre requete à bien étè recue ! '})
});

app.use((req, res, next) => {
    console.log('Réponse envoyée avec succès !');
  });
module.exports = app;