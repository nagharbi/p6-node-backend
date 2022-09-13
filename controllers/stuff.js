const Thing = require('../models/thing');

// enregistrer des objets dans base se donnée
// L'opérateur spread ... est utilisé pour faire une copie de tous les éléments de req.body
// save() qui enregistre Thing dans la base de donnée
exports.createThing = (req, res) => {
  console.log(req.body)
    delete req.body._id;
    const thing = new Thing({
      ...req.body
    });
    thing.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
      
};

// modifier un Thing existant
exports.updateThing = (req, res)=>{
    Thing.updateOne({_id:req.params.id} , {...req.body,_id:req.params.id})
    .then(()=>res.status(200).json({ message: 'objet modifier' }))
    .catch(error =>res.status(400).json({error}));
};

// supprimer
exports.deleteThing = (req, res) => {
    Thing.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
};

// la route "GET ONE"
exports.getThing = (req, res) => {
    Thing.findOne ({_id:req.params.id})
    .then(thing => res.status(200).json(thing))
    .catch(error =>res.status(404).json({ error }));
};

// La route GET all
exports.getAllThing =(req, res) => {
    Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error =>res.status(400).json({error}));
};
