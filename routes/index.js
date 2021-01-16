var express = require('express');
var router = express.Router();

/* GET home page. Render means we are rendering a remplate in views*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
