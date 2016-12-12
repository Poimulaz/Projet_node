/**
 * Created by Pierre on 12/12/2016.
 */
'use strict';
const express = require('express');
const router = express.Router();

const users = require('../controllers/Users'); // Nous allons récuperer notre controlleur fait précédement

/* GET Récupère la liste des utilisateurs */
router.get('/article', function(req, res){
    res.render('articles/creation');
    res.end();
});


module.exports = router;