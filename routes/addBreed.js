var express = require('express');
var router = express.Router();
const fs = require('fs');

// GET the current page and render the add-breed hbs/html template
router.get('/', function(req, res, next) {
  res.render('add-breed', { title: 'Add Breed Form'});//add-breed is the HBS template name, the rest is the object to pass in
});

router.post('/', (req, res, next) => {
    //this is pulling the array from the breeds.json file so we can add the input from the form to it
      fs.readFile('./data/breeds.json', 'utf8' , (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        //grab the json data from the file
        let currentBreeds = JSON.parse(data);
        //read the request object, breed: value...
        let newBreed = req.body.breed;
        //push new breed onto array
        currentBreeds.push(newBreed);
        //stringify the new array
        let updatedBreeds = JSON.stringify(currentBreeds);
      
      //now pass the stringified updated array to the breeds.json file...
      fs.writeFile('./data/breeds.json', updatedBreeds, 'utf-8', (err) => {
        if(err){
          console.log(err);
        }
        console.log("the breed was uploaded successfully...");
      });
      //after form submit if success response from server (should be 201 but isn't working), redirect to index and end 
      res.writeHead(302, { location: '/'});
      res.end();
      });
});

module.exports = router;
