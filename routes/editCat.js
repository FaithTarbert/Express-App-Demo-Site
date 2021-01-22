var express = require('express');
var router = express.Router();
const fs = require('fs');
let cats = require('../data/cats.json');
let breeds = require('../data/breeds.json');
const formidable = require('formidable');

/* GET edit cat form. Render means we are rendering an hbs/html template in Views*/
/* GET a single cat to edit by this.id which will change with each cat, taken from json file. */
router.get('/:id', function(req, res, next) {
    console.log('edit cats', req.params.id);
    // let theCat = cats.find((cat) => {
    // console.log("a single cat ", cat.id);
    // return cat.id == req.params.id;
    // });
    // console.log("the cat is ", theCat);
    res.render('edit-cat', { title: 'Edit Cat'});//, cat: theCat, catBreeds: breeds
    });
    

router.post('/', (req, res, next) => {
    
    //call formidable to create new empty form object to populate
    let form = new formidable.IncomingForm();

    //now parse the completed form - fields holds whatever was typed in the form, files is a giant object with all the form data, including any submitted images
    // form.parse(req, (err, fields, files) => {
    // if(err){
    //     console.log(err);
    //     res.write(404);
    //     res.end();
    // }

    // console.log(fields, files);
//    let oldPath = files.upload.path;
//    let newPath = 'C:/Users/faith/Desktop/ZeroToBlockchain/Projects/cat-shelter-faith/public/images/' + files.upload.name;
//    console.log(files);

//    //need to fix cat id so it iterates
//    let catName = fields.name;
//    let catDescription = fields.description;
//    let catBreed = fields.breed;
//    let catImage = files.upload.name;
//    let newCatObj = {
//      id: catID,
//      name: catName,
//      description: catDescription,
//      breed: catBreed,
//      image: catImage
//    };
//    console.log(newCatObj);

//    fs.rename(oldPath, newPath, (err) => {
//      if(err) throw err;
//      console.log("file was uploaded successfully");
//    });

//    fs.readFile('./data/cats.json', 'utf8' , (err, data) => {
//      if (err) {
//        console.error(err);
//        return;
//      }

//      let currentCats = JSON.parse(data);
//      //push new breed onto array
//      currentCats.push(newCatObj);
//      console.log("the cats.json parsed data is ", currentCats);
//      //stringify the new array
//      let updatedCats = JSON.stringify(currentCats);
//      console.log("JSON stringified", updatedCats);
   
//    //now pass the stringified updated array to the cats.json file...
//    fs.writeFile('./data/cats.json', updatedCats, 'utf-8', (err) => {
//      if(err){
//        console.log(err);
//      }
//      console.log("the cat was uploaded successfully...");
//    });
//    //after form submit, redirect to index and end 
//    res.writeHead(302, { location: '/'});
//    res.end();
//  });

 
//  });
});

module.exports = router;
