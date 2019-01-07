//  eggsquisite-mongo-app/models/chicken.js

var mongoose = require('mongoose');
var sschema = mongoose.Schema;

var chickenSchema = new sschema({
    pun: String,
    category: String
})

module.exports = mongoose.model('Chicken', chickenSchema);