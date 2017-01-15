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

            if(req.session.id_user != " "){
                User.findById(req.session.id_user, function(err, thisUser){
                    console.log(thisUser);
                });
            }
            // object of all the users
            res.render('users', {
                title: 'home',
                active: 'account',
                users: users
            });
        });

    },
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
    },
    update: function (req, res) {

        User.findById(req.params.id, function (err, user) {
            if (err) throw err;

            // change the users location
            user.name = req.body.name;
            user.firstName = req.body.firstname;
            user.nickname =req.body.nickname;
            user.email = req.body.email;
            user.password = req.body.password;

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