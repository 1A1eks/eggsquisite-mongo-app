//  eggsquisite-mongo-app/models/chicken.js

var mongoose = require('mongoose');
var sschema = mongoose.Schema;

var chickenSchema = new sschema({
    name: String
})

module.exports = mongoose.model('chicken', chickenSchema);