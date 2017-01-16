/**
 * Created by gibertclement on 06/10/2016.
 */
'use strict';
require('../modelsMongoose/User');
require('../modelsMongoose/Article');

const mongoose = require('mongoose'),
    Article = mongoose.model('Article'),
    User = mongoose.model('User');


var Articles = {
    index: function (req, res) {
        if (req.session.id_user != undefined) {
            if(req.session.recherche == undefined) {
                Article.find({}, function (err, articles) {
                    User.findById(req.session.id_user, function (err, user) {
                        if (err) throw err;
                        // object of all the users
                        res.render('articles', {
                            title: 'home',
                            active: 'account',
                            articles: articles,
                            user: user
                        });
                        console.log(articles);
                        res.end();
                    });
                });
            }else{
                Article.find({titre: req.session.recherche}, function (err, articles) {
                    User.findById(req.session.id_user, function (err, user) {
                        if (err) throw err;
                        // object of all the users
                        req.session.recherche = undefined;
                        res.render('articles', {
                            title: 'home',
                            active: 'account',
                            articles: articles,
                            user: user
                        });
                        console.log(articles);
                        res.end();
                    });
                });
            }
        } else {
            res.redirect('/users');
            res.end();
        }
    },
    create: function (req, res) {
        var callback1 = new Promise(function (resolve, reject) {
            console.log('verif_post');
            if (req.body.titre != '' && req.body.contenu != '') {
                console.log('body not null');
                resolve();
            } else {
                reject();
                console.log('Un champ du formulaire est vide');
                res.redirect('/articles/create');
                res.end();
            }

        });
        var callback2 = callback1.then(function (data) {
            return new Promise(function (resolve, reject) {
                Article.find({}, function (err, article) {
                    console.log('all users find');
                    if (!article.some(function callbackfn(article) {
                            return (article.titre == req.body.titre && article.user == req.session.id_user);
                        })) {
                        resolve();
                    }
                    else {
                        reject();
                        console.log('You have already publish a same article');
                        res.redirect('/articles/create');
                        res.end();
                    }
                });
            });
        });

        callback2.then(function(){
            var new_article = new Article({
                contenu: req.body.contenu,
                titre: req.body.titre,
                user: req.session.id_user

            });
            console.log(new_article);
            new_article.save(function (err) {

                if (!err)
                    console.log('article inserted');
            });
            res.redirect('/articles');
            res.end();
        });
    },
    read: function(req, res){
        if(req.body.article != undefined) {
            console.log("article" + req.body.article);
            Article.find({titre: req.body.article},function (err, article) {
                console.log("article" + req.body.article);
                var session = req.session;
                session.article = article.id;
                session.save(function (err) {
                    if (req.session.id_user != undefined) {
                        User.findById(req.session.id_user, function (err, user) {
                            if (err) throw err;
                            // object of all the users
                            console.log("article" + article);
                            res.render('articles/read', {
                                title: 'home',
                                active: 'account',
                                article: article,
                                user: user
                            });
                            res.end();
                        });
                    } else {
                        res.redirect('/users');
                        res.end();
                    }
                });
            });
        }else{
            res.redirect('/articles');
            res.end();
        }
    },
    recherche: function(req, res){
        if (req.session.id_user != undefined) {
            console.log(req.body.titre);
            if(req.body.titre != "") {
                User.findById(req.session.id_user, function (err, user) {
                    if (err) throw err;
                    // object of all the users
                    req.session.recherche = req.body.titre;
                    res.redirect('/articles');
                    res.end();
                });
            }else{
                res.redirect('/articles');
                res.end();
            }
        } else {
            res.redirect('/users');
            res.end();
        }
    },
    modification: function(req, res){
        Article.findById({id:req.body.session.article}, function (err, article) {
            res.render('articles/update', {
                title: 'home',
                active: 'account',
                articles: article,
                user: req.session.user
            });
            res.end();
        });
    },
    update: function(req, res){
        Article.findById(req.session.article, function (err, article) {
            if (err) throw err;

            // change the users location
            article.titre = (req.body.titre)? req.body.titre : article.titre;
            article.contenu = (req.body.contenu)? req.body.contenu : article.contenu;

            // save the user
            article.save(function (err) {
                if (err) throw err;

                console.log('User successfully updated!');
            });

        });
        res.redirect('/articles');
        res.end();
    }
};

module.exports = Articles;