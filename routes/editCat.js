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
    console.log('theCat', theCat);
    let breedsSelected = [];
    breeds.forEach(b => {
        breedsSelected.push({
            breed: b,
            selected: (b===theCat.breed) ? true : false 
        });
    });
    res.render('edit-cat', { theCat: theCat, catBreeds: breedsSelected });
});
router.post('/:uid', function(req, res, next) {
    console.log('post edit-cat route fired');
    let uid = req.params.uid;
    console.log(uid);
    let form = new formidable.IncomingForm();
    //console.log('~form:', form);
    form.parse(req, function(err, fields, files){
        if (err) next(err);
        console.log('the fields are ', fields);
        console.log('the files are ', files);
        
        let theCat = cats.find((cat) => {  //find this cat
            return cat.id === uid;
        });
        console.log('theCat:', theCat);
        console.log('indexOf', cats.indexOf(theCat));
        // handle image filefile
        let imageName;
        if (files.upload.name === '' || theCat.image === files.upload.name) {
            //if same, copy image name from old cat data
            imageName = theCat.image;
        } else {
            //process new file-name
            imageName = files.upload.name;
            let oldPath = files.upload.path;
            let newPath = 'C:/Users/faith/Desktop/ZeroToBlockchain/Projects/cat-shelter-faith/public/images/' + files.upload.name;
            console.log('old path:', oldPath);
            console.log('new path:', newPath);
            fs.rename(oldPath, newPath, (err) => {
                if (err) throw err;
                console.log('files was uploaded successfully');
            });
        }
        let editedCat = { id:uid, ...fields, image: imageName };
        console.log('updated cat info:', editedCat);
        //overwrite old cat obj with new edited cat obj
        cats[cats.indexOf(theCat)] = editedCat; 
        console.log('all-cats-edited', cats);
        let json = JSON.stringify(cats);
        fs.writeFile(catsPath, json, (err) => {
            if (err) throw err;
            res.redirect('/');
        });
    });
});
module.exports = router;