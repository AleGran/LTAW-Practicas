const http = require('http');
const fs = require('fs');

const PUERTO = 9090;



const server = http.createServer((req, res) => {

    console.log("Hola");

    res.setHeader('Content-Type', 'text/plain');
    res.write("Hola");

    res.end();

});


server.listen(PUERTO);

console.log("Hola");