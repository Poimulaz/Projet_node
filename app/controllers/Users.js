/**
 * Created by Pierre on 05/10/2016.
 */
'use strict';
require('../modelsMongoose/User');
var Promise = require('promise');

const mongoose = require('mongoose'),
    User = mongoose.model('User');

function champs_plein(req){
    console.log('verif_post');
    if (req.body.name != '' && req.body.firstname != '' && req.body.email != '' && req.body.password != '') {
        console.log('body not null');
        return true;
    } else {
        console.log('Un champ du formulaire est vide');
        return false;
    }
}

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
        var promise = new Promise(
            function(resolve,reject) {
                var notexist;
                User.find({}, function (err, user) {
                    console.log('all users find');
                    notexist = !user.some(function callbackfn(user) {
                        return (user.email == req.body.email);
                    })
                }).then(function () {
                    console.log("email_notused : " + notexist);
                    console.log("champ : " + champs_plein(req));
                    resolve(notexist && champs_plein(req));
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
    read: function (req, res){
        var promise = new Promise(

            function(resolve,reject) {
                var exist;
                User.find({}, function (err, user) {
                    console.log('all users find');
                    exist = user.some(function callbackfn(user) {
                        return (user.email == req.body.email && user.password == req.body.password);
                    })
                }).then(function () {
                    console.log("user_exist : " + exist);
                    console.log("champ : " + champs_plein(req));
                    resolve(exist && champs_plein(req));
                });
            });

        promise.then(
            function(conditions) {
                if(conditions) {
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
                }

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