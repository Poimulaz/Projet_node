'use strict';
const express = require('express');
const router = express.Router();
const formidable = require('formidable');
var downloads = require('../controllers/Downloads'); // Nous allons récuperer notre controlleur fait précédement


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
  res.end();
});

router.post('/',downloads.index);

module.exports = router;
