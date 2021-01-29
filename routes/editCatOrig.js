var express = require('express');
var router = express.Router();
const fs = require('fs');

let cats = require('../data/cats.json');
const path = require('path');
let catBreeds = require('../data/breeds.json');
const formidable = require('formidable');
let uid;

/* GET a single cat to edit by this.id which will change with each cat, taken from json file. */
router.get('/:uid', function(req, res, next) {
    uid = req.params.uid;
    console.log(uid);
    let theCat = cats.find((cat) => {
    console.log("a single cat ", cat.id);
    return cat.id == uid;
    });
    
    console.log("the cat is ", theCat);

    let breedSelected = [];
    catBreeds.forEach(b => {
        breedSelected.push({
            breed: b,
            selected: (b === theCat.breed) ? true : false 
        });
    });
    res.render('edit-cat', { title: 'Edit Cat', cat: theCat, catBreeds: breedSelected});
});
    
    router.post('/:uid', (req, res, next) => {
      console.log('post edit-cat');
    //to do...
});

module.exports = router;