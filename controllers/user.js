
const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email : req.body.email,
            password: hash
        });
        user.save()
        .then(() => res.status(201).json({message : 'utilisateur créé !'}))
        .catch(error => res.status(400).json({ error}));
    })
    .catch(error => res.status(500).json({error}));
};


// pour connecter utlisateur existant 
exports.login = (req, res, next) => {   
    User.findOne ({email: req.body.email})
    .then(user => {
        if (user === null) {
            res.status(401).json({message:'paire identifiant / mot de passe incorrecte'});
        } else {
            bcrypt.compare(req.body.password, user.password)
            .then(valid =>{
                if (!valid) {
                    res.status(401).json({message:'paire identifiant / mot de passe incorrecte'})
                } else {
                    res.status(200).json({
                        userId : user._id,
                        token :'TOKEN'
                    });
                }
            })
            .catch(error => {
                res.status(500).json({error});
            }); 
        }
    })
    .catch(error =>{
        res.status(500).json({error});
    })
};
