
/**
 * Created by gibertclement on 06/10/2016.
 */
'use strict';
const mongoose = require('mongoose'), // Nous appelons le module mongoose
    Schema = mongoose.Schema; // Nous créons un schéma mongoose


var schema = new Schema({
    user: {type: String,required: false},
    contenu: {type: String, required: true},
    titre: {type: String, required: true},
    createdOn: {type: Date, default: Date.now}
});

// Nous exportons notre modèle avec comme nom "Article", 'articles' sera le nom de notre "table"
exports.model = mongoose.model('Article', schema, 'articles');