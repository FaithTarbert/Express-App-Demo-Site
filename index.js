//this is your server

const http = require('http');
const port = 3000;
//have to acquire files in handlers folder to access them
const handlers = require('./handlers');

http.createServer((req,res) => {
    for(let handler of handlers){
        if(!handler(req, res)){
            break;
        }
    }
}).listen(port);