/**
 * Created by Pierre on 12/01/2017.
 */
'use strict';

const session = require('express-session');
const formidable = require('formidable');

var Users = {
    index: function (req, res) {
        var form = new formidable.IncomingForm();

        form.parse(req);

        form.on('fileBegin', function (name, file){
            file.path = __dirname + '/../ressources/uploads/' + file.name;
        });

        form.on('file', function (name, file){
            console.log('Uploaded ' + file.name);
        });

        res.render('index');
        res.end();
    }
};

module.exports = Users;