const http = require('http');
const port = 3000;

http.createServer((req,res) => {
    res.writeHead(200, {
        'Contenet-Type': 'text/plain'
    });

    res.write('Hellow World!');
    res.end();
}).listen(port);