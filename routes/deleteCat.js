var express = require('express');
var router = express.Router();
var fs = require('fs');
const path = require('path');
var formidable = require('formidable');
const cats = require('../data/cats.json');
const breeds = require('../data/breeds.json');
const catsPath = './data/cats.json';
var bodyParser = require('body-parser');

/* GET edit-cat page. */
router.get('/:uid', function(req, res, next) {
    let uid = req.params.uid;
    console.log('uid', uid);
    console.log(cats);
    console.log(breeds);
    let theCat = cats.find((cat) => {
        //console.log('a single cat', cat.id);
        return cat.id === uid;
    });
    
    res.render('delete-cat', { theCat: theCat});
});

router.post('/:uid', function(req, res, next) {
    console.log('post edit-cat route fired');
    let uid = req.params.uid;
    console.log(uid);
            
        let theCat = cats.find((cat) => {
            return cat.id === uid;
        });
        
        console.log('indexOf', cats.indexOf(theCat));
        cats.splice(cats.indexOf(theCat), 1);
    
    let json = JSON.stringify(cats);

    fs.writeFile(catsPath, json, (err) => {
        if (err) throw err;
        res.redirect('/');
    });
});
module.exports = router;