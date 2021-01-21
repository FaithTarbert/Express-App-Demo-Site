var express = require('express');
var router = express.Router();
const fs = require('fs');
let catBreeds = require('../data/breeds.json');
const formidable = require('formidable');

/* GET add a breed form. Render means we are rendering a template in views*/
router.get('/', function(req, res, next) {
  console.log(catBreeds);
  res.render('add-cat', { title: 'Add Cat Form', catBreeds: catBreeds});//add-cat is the HBS template name, the rest is the object to pass in
});

router.post('/', (req, res, next) => {
    //do something
    console.log("someone clicked post");
    console.log("the cat form input is", req.body.cat);

    //this is pulling the array from the cats.json file so we can add the input from the form to it
 //call formidable to create new form object to populate
 let form = new formidable.IncomingForm();
 // console.log(form);

 form.parse(req, (err, fields, files) => {
   if(err){
     console.log(err);
     res.write(404);
     res.end();
   }
   console.log("the fields are ", fields);
   console.log("the files are ", files);

   let oldPath = files.upload.path;
   let newPath = 'C:/Users/faith/Desktop/ZeroToBlockchain/Projects/cat-shelter-faith/public/images/' + files.upload.name;
   console.log(newPath);

   //need to fix cat id so it iterates
   let counter = [04,03,02,07,09,34,23,09,76,45,22,32,99,76,56,01,15,77,66,55];
   let catID = counter.shift();
   let catName = fields.name;
   let catDescription = fields.description;
   let catBreed = fields.breed;
   let newCatObj = {
     id: catID,
     name: catName,
     description: catDescription,
     breed: catBreed
   };
   console.log(newCatObj);

   fs.rename(oldPath, newPath, (err) => {
     if(err) throw err;
     console.log("file was uploaded successfully");
   });

   fs.readFile('./data/cats.json', 'utf8' , (err, data) => {
     if (err) {
       console.error(err);
       return;
     }

     let currentCats = JSON.parse(data);
     //push new breed onto array
     currentCats.push(newCatObj);
     console.log("the cats.json parsed data is ", currentCats);
     //stringify the new array
     let updatedCats = JSON.stringify(currentCats);
     console.log("JSON stringified", updatedCats);
   
   //now pass the stringified updated array to the cats.json file...
   fs.writeFile('./data/cats.json', updatedCats, 'utf-8', (err) => {
     if(err){
       console.log(err);
     }
     console.log("the cat was uploaded successfully...");
   });
   //after form submit, redirect to index and end 
   res.writeHead(302, { location: '/'});
   res.end();
 });

 
 });
});

module.exports = router;
