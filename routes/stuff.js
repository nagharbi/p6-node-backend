const express = require('express');
const router = express.Router();

const Thing = require('../models/thing');

// enregistrer des objets dans base se donnée
//L'opérateur spread ... est utilisé pour faire une copie de tous les éléments de req.body
//save() qui enregistre Thing dans la base de donnée
router.post('/', (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
      ...req.body
    });
    thing.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
});

// modifier un Thing existant 
router.put('/:id',(req,res,next)=>{
    Thing.updateOne({_id:req.params.id} , {...req.body,_id:req.params.id})
    .then(()=>res.status(200).json({message:'objet modifier'}))
    .catch(error =>res.status(400).json({error}));
});


// supprimer 
router.delete('/:id', (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
});

// la route "GET ONE"
router.get('/:id', (req,res,next) => {
    Thing.findOne ({_id:req.params.id})
    .then(Thing => res.status(200).json(Thing))
    .catch(error =>res.status(404).json({error}));
});

// La route GET all
// find pour recupérer tous thing
router.get('/', (req, res, next) => {
    Thing.find()
    .then(Thing => res.status(200).json(Thing))
    .catch(error =>res.status(400).json({error}));
});

module.exports = router;