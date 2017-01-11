/**
 * Created by gibertclement on 06/10/2016.
 */
'use strict';
const express = require('express');
const router = express.Router();

const articles = require('../controllers/Articles'); // Nous allons récuperer notre controlleur fait précédement

/* GET Récupère la liste des articles */
router.get('/', articles.index);

/* POST Création d'un nouvel article*/
router.post('/create', articles.create);

router.get('/create', function (req, res) {
    res.render('articles/create', {
    title: 'home',
    active: 'account' });
    res.end();

});

/* PUT Modification d'un article */
//router.put('/:id(\\d+)', articles.update);

/* DELETE Suppression d'un article */
//router.delete('/:id(\\d+)', articles.delete);

module.exports = router;