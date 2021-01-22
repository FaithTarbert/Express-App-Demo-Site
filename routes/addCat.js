var express = require('express');
var router = express.Router();
const fs = require('fs');
//require 3rd party form parser
const formidable = require('formidable');
//require our data from local data file breeds.json and load into variable passed into template rendered by hbs
let catBreeds = require('../data/breeds.json');


/* GET add a cat form. Render means we are rendering an hbs template html file from the Views folder*/
router.get('/', function(req, res, next) {
  // console.log(catBreeds);

//add-cat is the hbs/html template name, the key/value pairs are the names of the hbs {{variables}} to use in the html  
res.render('add-cat', { title: 'Add Cat Form', catBreeds: catBreeds});//catBreeds key is a made-up variable name, the value comes from line 7, where we required our data file
});

router.post('/', (req, res, next) => {
  //initiate formidable to create new empty form object
  let form = new formidable.IncomingForm();
  // console.log(form);

  //parse the data from the posted/submitted form...
  form.parse(req, (err, fields, files) => {
    if(err){
      console.log(err);
    res.write(404);
    res.end();
    }
    // console.log("the fields are ", fields);
    console.log("the files are ", files);

    //get the temp file path for the image submitted with the form
    let oldPath = files.upload.path;
    //designate the final path name for the image once it's re-saved to the static/public folder
    let newPath = 'C:/Users/faith/Desktop/ZeroToBlockchain/Projects/cat-shelter-faith/public/images/' + files.upload.name;
    // console.log(newPath);

    //create dynamic cat id from truncated temp pic file path name ie 'C:\Users\faith\AppData\Local\Temp\upload_e2cc3b7b5601f6c930dee1e07a2f98d2'
    let tempPicId = files.upload.path;
    let temp = tempPicId.length;
    //slice off the end of file path name to create random id
    let catID = tempPicId.slice(66, temp);

    //now load submitted form data into variables...
    let catName = fields.name;
    let catDescription = fields.description;
    let catBreed = fields.breed;
    let catImage = files.upload.name;

    //load variables into a cat object...
    let newCatObj = {
      id: catID,
      name: catName,
      description: catDescription,
      breed: catBreed,
      image: catImage
    };
    //  console.log(newCatObj);

  //this saves/renames the image file that was uploaded into temp directory into our designated static/images folder
  fs.rename(oldPath, newPath, (err) => {
     if(err) throw err;
     console.log("file was re-saved to public/static folder successfully");
  });

  //read cat data from the local json file...
  fs.readFile('./data/cats.json', 'utf8' , (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    //parse that data into a regular array of objects
    let currentCats = JSON.parse(data);
    //push the new cat object from the submitted form onto the array
    currentCats.push(newCatObj);
    //stringify the updated array, so we can send it back to the json file...
    let updatedCats = JSON.stringify(currentCats);
    //console.log("JSON stringified", updatedCats);
   
  //now pass the stringified, updated array back to the cats.json file...
  fs.writeFile('./data/cats.json', updatedCats, 'utf-8', (err) => {
     if(err){
       console.log(err);
     }
     console.log("The cats' array was updated successfully...");
   });

  //after form submit, redirect user to index/home and end function
  res.writeHead(302, { location: '/'});
  res.end();
 });
});
});

module.exports = router;
