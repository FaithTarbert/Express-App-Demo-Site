var express = require('express');
var router = express.Router();
const fs = require('fs');

/* GET add a breed form. Render means we are rendering a template in views*/
router.get('/', function(req, res, next) {
  res.render('add-breed', { title: 'Add Breed Form'});//add-breed is the HBS template name, the rest is the object to pass in
});

router.post('/', (req, res, next) => {
    //do something
    console.log("someone clicked post");
    console.log("the breed corm input is", req.body.breed);

    //this is pulling the array from the breeds.json file so we can add the input from the form to it
      fs.readFile('./data/breeds.json', 'utf8' , (err, data) => {
        if (err) {
          console.error(err);
          return;
        }

        let currentBreeds = JSON.parse(data);
        let newBreed = req.body.breed;
        //push new breed onto array
        currentBreeds.push(newBreed);
        // console.log("the breeds.json parsed data is ", currentBreeds);
        //stringify the new array
        let updatedBreeds = JSON.stringify(currentBreeds);
        // console.log("JSON stringified", updatedBreeds);
      
      //now pass the stringified updated array to the breeds.json file...
      fs.writeFile('./data/breeds.json', updatedBreeds, 'utf-8', (err) => {
        if(err){
          console.log(err);
        }
        // console.log("the breed was uploaded successfully...");
      });
      //after form submit, redirect to index and end 
      res.writeHead(302, { location: '/'});
      res.end();
      });
    // });
    // res.render('index');
});

module.exports = router;
