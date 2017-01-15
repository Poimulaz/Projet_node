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
                    User.findById(req.session.id_user, function(err, user){
                    res.render('users', {
                        title: 'home',
                        active: 'account',
                        users: users,
                        user: user
                    });
                    });
                }else{
                    res.render('users', {
                        title: 'home',
                        active: 'account',
                        users: users
                    });
                }
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
                res.redirect('/users/connexion');
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
                        console.log("resolve");
                        resolve();
                    }
                    else{
                        console.log("reject");
                        reject();
                        console.log('connexion failed');
                        res.redirect('/users/connexion');
                        res.end();
                    }
                })
            });
        });

        callback2.then(function () {
            User.findOne({email: req.body.email}, function (err, user) {
                if (err) throw err;
                var session = req.session;
                session.id_user = user.id;
                session.user = user.name + " " + user.firstName
                session.save(function(err) {
                })
            });
            res.redirect('/articles');
            res.end();
        });
    },
    deconnexion: function (req, res){
        req.session.id_user = null;
        res.redirect('/users');
        res.end();
    },
    modification: function (req, res) {
        User.findById(req.session.id_user, function (err, u) {
            if (err) throw err;
            res.render('users/modification', {
                title: 'home',
                active: 'account',
                user: u
            });
            res.end();
        });
    },
    update: function (req, res) {

        User.findById(req.session.id_user, function (err, user) {
            if (err) throw err;

            // change the users location
            user.name = (req.body.name)? req.body.name : user.name;
            user.firstName = (req.body.firstname)? req.body.firstname : user.firstname;
            user.nickname =(req.body.nickname)? req.body.nickname : user.nickname;
            user.email = (req.body.email)? req.body.email : user.email;
            user.password = (req.body.password)? req.body.password : user.password;

            // save the user
            user.save(function (err) {
                if (err) throw err;

                console.log('User successfully updated!');
            });

        });
        res.redirect('/articles');
        res.end();
    },
    delete: function (req, res) {

        User.findById(req.session.id_user, function (err, user) {
            if (err) throw err;

            // delete him
            user.remove(function (err) {
                if (err) throw err;

                console.log('User successfully deleted!');
            });
        });
        res.redirect('/users');
        res.end();
    }
};

module.exports = Users;