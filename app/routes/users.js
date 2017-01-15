'use strict';
const express = require('express');
const router = express.Router();

const users = require('../controllers/Users'); // Nous allons récuperer notre controlleur fait précédement

/* GET Récupère la liste des utilisateurs */
router.get('/', users.index);
router.get('/connexion', function(req, res){
    res.render('users/connexion', {
        title: 'home',
        active: 'account',
    });
    res.end();
});
router.post('/connexion', users.read);
router.get('/inscription', function(req, res){
    res.render('users/inscription', {
        title: 'home',
        active: 'account',
    });
    res.end();
});
/* POST Création d'un nouvel utilisateur */
router.post('/inscription', users.create);

router.get('/modification', users.modification);
/* PUT Modification d'un utilisateur */
router.put('/modification:id(\\d+)', users.update);
router.get('/inscription', users.inscription);

/* POST Création d'un nouvel utilisateur */
router.post('/inscription', users.create);

/* PUT Modification d'un utilisateur */
router.put('/:id(\\d+)', users.update);

/* DELETE Suppression d'un utilisateur */
router.delete('/:id(\\d+)', users.delete);

router.get('/ckeditor', function(req, res){
    res.render('ckeditor');
    res.end();
});

module.exports = router;