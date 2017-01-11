/**
 * Created by gibertclement on 06/10/2016.
 */
'use strict';
require('../modelsMongoose/Article');

const mongoose = require('mongoose'),
    Article = mongoose.model('Article');


var Articles = {
    index: function (req, res) {

        Article.find({}, function (err, articles) {
            if (err) throw err;

            // object of all the users
            res.render('articles', {
                title: 'home',
                active: 'account',
                articles: articles
            });
            console.log(articles);
            res.end();
        });
    },

    create: function (req, res) {

        var new_article = new Article ({
            contenu: req.body.contenu,
            titre: req.body.titrearticle
        
    });
        console.log(new_article);
        new_article.save(function (err) {

            if (!err)
                console.log('article inserted');
        })
        res.redirect('/articles');
        res.end();
    }
}

module.exports = Articles;