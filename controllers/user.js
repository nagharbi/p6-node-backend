
const bcrypt = require('bcrypt');
const { use } = require('../app');

const user = require('../models/user');


exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new user({
            email : req.body.email,
            password: hahd
        });
        user.save()
        .then(() => res.status(201).json({message : 'utilisateur créé !'}))
        .catch(Error => res.status(400).json({ Error}));
    })
    .catch(Error => res.status(500).json({Error}));
};



// pour connecter utlisateur existant 
exports.login = (req, res, next) => {

}
