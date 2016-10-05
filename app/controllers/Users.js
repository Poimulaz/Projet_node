/**
 * Created by Pierre on 05/10/2016.
 */
require('../modelsMongoose/User');

var mongoose = require('mongoose'),
    User = mongoose.model('User');


var Users = {
    index: function (req, res) {

        User.find({}, function (err, users) {
            if (err) throw err;

            // object of all the users
            console.log(users);
        });

        res.render('users/index', {
            title: 'home',
            active: 'account'
        });
    },
    create: function (req, res) {

        var u = new User({
            name: req.body.name,
            firstName: req.body.firstname,
            email: req.body.email
        });

        u.save(function (err) {
            if (err) {
                console.log('User inserted');
            }
        });

        res.end();
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