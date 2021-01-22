var express = require('express');
var router = express.Router();
let cats = require('../data/cats.json');

/* GET home page. Render means we are rendering a template in views*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', cats: cats});
});

module.exports = router;
