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

<<<<<<< HEAD
            if(req.session.id_user != " "){
                User.findById(req.session.id_user, function(err, thisUser){
                    console.log(thisUser);
                });
            }
=======
>>>>>>> origin/CRUDarticle
            // object of all the users
            res.render('users', {
                title: 'home',
                active: 'account',
                users: users
            });
        });

    },
<<<<<<< HEAD
    create: function (req, res) {
        var callback1 = new Promise(function (resolve, reject) {
                console.log('verif_post');
                if (req.body.name != '' && req.body.firstname != '' && req.body.email != '' && req.body.password != '') {
                    console.log('body not null');
                    resolve();
                } else {
                    reject();
                    console.log('Un champ du formulaire est vide');
                    console.log('inscription failed');
                    res.redirect('/users/inscription');
                    res.end();
                }

        });
        var callback2 = callback1.then(function(data) {
            return new Promise(function (resolve, reject) {
                User.find({}, function (err, user) {
                    console.log('all users find');
                    if (!user.some(function callbackfn(user) {
                            return (user.email == req.body.email);
                        })) {
                        resolve();
                    }
                    else {
                        reject();
                        console.log('email already exist');
                        res.redirect('/users/inscription');
                        res.end();
                    }
                    });
            });
        });

        callback2.then(function () {
            console.log("hello");
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

        });
    },
    read: function (req, res){

        var callback1 = new Promise(function (resolve, reject) {
            console.log('verif_post');
            if (req.body.name != '' && req.body.firstname != '' && req.body.email != '' && req.body.password != '') {
                console.log('body not null');
                resolve();
            } else {
                reject();
                console.log('Un champ du formulaire est vide');
                console.log('inscription failed');
                res.redirect('/users');
                res.end();
            }
        });

        var callback2 = callback1.then(function(data) {
            return new Promise(function (resolve, reject) {
                User.find({}, function (err, user) {
                    console.log('all users find');
                    if(user.some(function callbackfn(user) {
                        return (user.email == req.body.email && user.password == req.body.password);
                    })){
                        resolve();
                    }
                    else{
                        reject();
                    }
                })
            });
        });

        callback2.then(function () {
            console.log('email: ' + req.body.email);
            User.findOne({email: req.body.email}, function (err, user) {
                if (err) throw err;
                console.log('user: ' + user);
                var session = req.session;
                console.log("sess1: " + session.id_user);
                console.log("user: " + user.id);
                session.id_user = user.id;
                session.save(function(err) {
                    // session saved
                    console.log("sess2: " + session.id_user);
                })
            });
            res.redirect('/users');
            res.end();
        });
    },
    modification: function (req, res){
        User.findById(req.session.id_user, function (err, u) {
            if (err) throw err;

            console.log(u);

            res.render('users/modification', {
                title: 'home',
                active: 'account',
                user: u
            });
            res.end();
        });
=======
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
>>>>>>> origin/CRUDarticle
    },
    update: function (req, res) {

        User.findById(req.params.id, function (err, user) {
            if (err) throw err;

            // change the users location
<<<<<<< HEAD
            user.name = req.body.name;
            user.firstName = req.body.firstname;
            user.nickname =req.body.nickname;
            user.email = req.body.email;
            user.password = req.body.password;
=======
            user.name = 'Josay';
>>>>>>> origin/CRUDarticle

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