var express = require('express');
var router = express.Router();
const url = require('url');
const fs = require('fs');
const path = require('path');
const cats = require('../data/cats.json');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('search get');
    let searchText = req.query.search;
    console.log('search text:', searchText);


    let filteredCats = cats.filter(cat => cat.name.includes(searchText) || cat.description.includes(searchText) || cat.breed.includes(searchText));

    let results = true;
    if (filteredCats.length == 0) {
        results = false;
    }

    res.render('search', { cats: filteredCats, results: results, searchText:  searchText, resultsLength: filteredCats.length, plural: (filteredCats.length != 1) });
});

module.exports = router;