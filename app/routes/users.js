'use strict';
const express = require('express');
const router = express.Router();

const users = require('../controllers/Users'); // Nous allons récuperer notre controlleur fait précédement

/* GET Récupère la liste des utilisateurs */
router.get('/', users.index);

/* GET Envoie la page de connexion*/
router.get('/connexion', function(req, res){
    res.render('users/connexion', {
        title: 'home',
        active: 'account'
    });
    res.end();
});
/* POST Connecte l'utilisateur*/
router.post('/connexion', users.read);
router.get('/inscription', function(req, res){
    res.render('users/inscription', {
        title: 'home',
        active: 'account'
    });
    res.end();
});
/* GET Deconnecte l'utilisateur*/
router.get('/deconnexion', users.deconnexion);

/* POST Création d'un nouvel utilisateur */
router.post('/inscription', users.create);

router.get('/modification', users.modification);
/* PUT Modification d'un utilisateur */
router.put('/', users.update);

router.get('/inscription', function(req, res) {
    res.render('users/inscription', {
        title: 'Inscription',
        active: 'account'
    });
    res.end();
});
/* POST Création d'un nouvel utilisateur */
router.post('/inscription', users.create);


router.get('/delete', function(req, res) {
    res.render('users/delete', {
        title: 'Delete  ' + req.session.id_user,
        active: 'account'
    });
    res.end();
});
/* DELETE Suppression d'un utilisateur */
router.delete('/', users.delete);

router.get('/ckeditor', function(req, res){
    res.render('ckeditor');
    res.end();
});

module.exports = router;