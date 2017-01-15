/**
 * Created by Pierre on 05/10/2016.
 */
'use strict';
const mongoose = require('mongoose'), // Nous appelons le module mongoose
    Schema = mongoose.Schema; // Nous créons un schéma mongoose


var schema = new Schema({
    name: {type: String, required: true},
    firstName: {type: String, required: true},
    nickname: {type: String, required: false},
    email: {type: String, required: true},
    password: {type: String, required: true},
    createdOn: {type: Date, default: Date.now}
});

// Nous exportons notre modèle avec comme nom "User", 'users' sera le nom de notre "table"
exports.model = mongoose.model('User', schema, 'users');