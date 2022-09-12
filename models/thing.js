const mongoose = require('mongoose');


// creation de schéma de donnée
const thnigSchema = mongoose.Schema({
    title: {type:String, required: true},
    description: {type:String, required: true},
    imageUrl: {type:String, required: true},
    price: {type:String, required: true},
    userId:{type:Number, required: true},
});
module.exports = mongoose.model('Thing', thingSchema);