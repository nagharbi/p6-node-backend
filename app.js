const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Thing = require('./models/thing');
mongoose.connect('mongodb+srv://nouha:0728@cluster0.lowul2q.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//Recevez des articles de l'application front-end ( post )
app.use(express.json());

// corriger erreurs CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
// enregistrer des objets dans base se donnée
//L'opérateur spread ... est utilisé pour faire une copie de tous les éléments de req.body
//save() qui enregistre Thing dans la base de donnée
app.post('/api/stuff', (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
      ...req.body
    });
    thing.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
});

// la route "GET ONE"
app.get('/api/stuff/:id', (req,res,next) => {
    Thing.findOne ({_id:req.params.id})
    .then(Thing => res.status(200).json(Thing))
    .catch(error =>res.status(404).json({error}));
});
// modifier un Thing existant 
app.put('/api/stuff/:id',(req,res,next)=>{
    Thing.updateOne({_id:req.params.id} , {...req.body,_id:req.params.id})
    .then(()=>res.status(200).json({message:'objet modifier'}))
    .catch(error =>res.status(400).json({error}));
});
// supprimer 
app.delete('/api/stuff/:id', (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  });

// La route GET all
// find pour recupérer tous thing
app.get('/api/stuff', (req, res, next) => {
    Thing.find()
    .then(Thing => res.status(200).json(Thing))
    .catch(error =>res.status(400).json({error}));
});

module.exports = app;