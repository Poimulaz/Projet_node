/**
 * Created by Pierre on 05/10/2016.
 */
'use strict';
require('../modelsMongoose/User');
var Promise = require('promise');

const mongoose = require('mongoose'),
    User = mongoose.model('User');

var Users = {
    index: function (req, res) {

        User.find({}, function (err, users) {
            if (err) throw err;

            // object of all the users
            res.render('users', {
                title: 'home',
                active: 'account',
                users: users
            });
        });

    },
    inscription: function (req, res) {
        res.render('users/inscription', {
            title: 'home',
            active: 'account',
        });
        res.end();
    },
    create: function (req, res) {
        var promise = new Promise(

            function(resolve,reject) {
                var champ_plein;
                console.log('verif_post');
                if (req.body.name != '' && req.body.firstname != '' && req.body.email != '' && req.body.password != '') {
                    console.log('body not null');
                    champ_plein = true;
                } else {
                    console.log('Un champ du formulaire est vide');
                    champ_plein = false;
                }

                var notexist;
                User.find({}, function (err, user) {
                    console.log('all users find');
                    notexist = !user.some(function callbackfn(user) {
                        return (user.name == req.body.name && user.firstName == req.body.firstname);
                    })
                }).then(function () {
                    console.log("user_notexist : " + notexist);
                    console.log("champ : " + champ_plein);
                    resolve(notexist && champ_plein);
                });
            });

        promise.then(
            function(conditions) {
                console.log("conditions:" + (conditions));
                if (conditions) {
                    var user = new User({
                        name: req.body.name,
                        firstName: req.body.firstname,
                        email: req.body.email,
                        password: req.body.password
                    });
                    user.save(function (err) {
                        if (!err) {
                            console.log('User inserted');
                        }
                        console.log(user);

                        res.redirect('/users');


                        res.end();
                    });

                } else {
                    console.log('inscription failed');
                    res.redirect('/users/inscription');
                    res.end();
                }
            });
    },
    update: function (req, res) {

        User.findById(req.params.id, function (err, user) {
            if (err) throw err;

            // change the users location
            user.name = 'Josay';

            // save the user
            user.save(function (err) {
                if (err) throw err;

                console.log('User successfully updated!');
            });

        });

        res.end();
    },
    delete: function (req, res) {

        User.findById(req.params.id, function (err, user) {
            if (err) throw err;

            // delete him
            user.remove(function (err) {
                if (err) throw err;

                console.log('User successfully deleted!');
            });
        });

        res.end();
    }
};

module.exports = Users;