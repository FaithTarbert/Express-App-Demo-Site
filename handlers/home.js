const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const formidable = require('formidable'); //this parses form data, 3rd party
const cats = require('../data/cats.json');
const breeds = require('../data/breeds.json')


module.exports = (req, res) => {
  const pathname = url.parse(req.url).pathname;
  console.log("[home.js 10]home pathname is ", pathname);

  if (pathname === '/' && req.method === 'GET') {
    // Implement the logic for showing the home html view
    let filePath = path.normalize(path.join(__dirname, '../views/home/index.html'));

    // fs.readFile(filePath, (err, data) => {
    //   if(err) {
    //     console.log(err);
    //     res.write(404, {
    //       "Content-Type": "text/plain"
    //     });
    //     res.write(404);
    //     res.end();
    //     return;
    //   } 
    //   res.writeHead(200, {
    //     "Content-Type": "text/html" 
    //   });
    //   res.write(data);
    //   res.end();
    // });

    const index = fs.createReadStream(filePath);

    index.on('data', (data) => {
      let modifiedCats = cats.map( (cat) => `<li>
      <img src="${path.join('C:/Users/faith/Desktop/ZeroToBlockchain/Projects/cat-shelter-faith/content/images/' + cat.image)}">
      <h3>${cat.name}</h3>
      <p><span>Breed: </span>${cat.breed}</p>
      <p><span>Description: </span>${cat.description}</p>
      <ul class="buttons">
        <li class="btn edit"><a href="/cats-edit/${cat.id}">Change Info</a></li>
        <li class="btn delete"><a href="/cats-find-new-home/${cat.id}">New Home</a></li>
      </ul>
    </li>`);
      let modifiedData = data.toString().replace('{{cats}}', modifiedCats);
      res.write(modifiedData);
    });
    index.on('end', () => {
      res.end();
    })
    index.on('error', (err) => {
      console.log(err);
    });

  } else if (pathname === '/cats/add-cat' && req.method === 'GET') {
    let filePath = path.normalize(path.join(__dirname, '../views/addCat.html'));

    const index = fs.createReadStream(filePath);

    index.on('data', (data) => {
      let catBreedPlaceHolder = breeds.map( (breed) => `<option value"${breed}">${breed}</option>`);
      let modifiedData = data.toString().replace('{{catBreeds}}', catBreedPlaceHolder)
      res.write(modifiedData);
    });
    index.on('end', () => {
      res.end();
    })
    index.on('error', (err) => {
      console.log(err);
    });

  } else if (pathname === '/cats/add-breed' && req.method === 'GET') {
    let filePath = path.normalize(path.join(__dirname, '../views/addBreed.html'));

    const index = fs.createReadStream(filePath);

    index.on('data', (data) => {
      res.write(data);
    });
    index.on('end', () => {
      res.end();
    });
    index.on('error', (err) => {
      console.log(err);
    });

  //THIS HANDLES THE ROUTE ADD CAT & POST FORM ACTION
  } else if (pathname === '/cats/add-cat' && req.method === 'POST') {

    // const index = fs.createReadStream(filePath);

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
      let newPath = path.normalize(path.join('C:/Users/faith/Desktop/ZeroToBlockchain/Projects/cat-shelter-faith/content/images/' + files.upload.name));
      console.log(newPath);

      let catName = fields.name;
      let catDescription = fields.description;
      let catBreed = fields.breed;
      let newCatObj = {
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

    //THIS HANDLES THE ROUTE ADD BREED & POST FORM ACTION
  } else if (pathname === '/cats/add-breed' && req.method === 'POST') {
    //set this to empty string because data comes in from form as binary, has to be parsed from binary to json to text
    let formData = "";

    //when a form request comes in...do something
    req.on('data', (data) => {
      // console.log("the breed form data is ", data.toString());
      formData += data;
      // console.log("the new data is ", formData);

      //this is a 3rd party plugin to parse the form data to strip off the = sign from the response
      let parsedData = qs.parse(formData);
      // console.log("the parsed data is ", parsedData.breed);

      //this is pulling the array from the breeds.json file so we can add the input from the form to it
      fs.readFile('./data/breeds.json', 'utf8' , (err, data) => {
        if (err) {
          console.error(err);
          return;
        }

        let currentBreeds = JSON.parse(data);
        //push new breed onto array
        currentBreeds.push(parsedData.breed);
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
    });
  } else {
    return true;
  }
};