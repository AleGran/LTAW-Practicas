const http = require('http');
const fs = require('fs');
const path = require('path');

//-- Puerto y rutas de las páginas principales
const PUERTO = 8080;

const index_path = './index.html';
const error_path = './error.html';


//-- Función del servidor
const server = http.createServer((req, res) => {

    console.log("Petición recibida");

    const url = new URL(req.url, 'http://' + req.headers['host']); //-- URL de la petición recibida
    const pathname = url.pathname; //-- Ruta del objeto URL
    console.log('Ruta:', pathname);

    //-- Obtención de la página principal
    if (pathname === '/') { 
        fs.readFile(index_path, (err, data) => {
            if (err) { 
                console.error('Error al leer el archivo:', err);
                res.writeHead(404, { 'Content-Type': 'text/html' }); //-- Cabecera 404
                fs.readFile(error_path, (err, data) => {
                    if (err) {
                        res.end('Error 404: File not found'); 
                    } else {
                        res.end(data); //-- Envío del error
                    }
                });
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' }); //-- cabecera 200
                res.end(data); //-- Envío del recurso pedido
            }
        });
    
    //-- Error 404
        
    } else {       
        fs.readFile(error_path, (err, data) => {
            if (err) { 
                console.error('Error al leer el archivo:', err);
                res.writeHead(404, { 'Content-Type': 'text/html' });
                fs.readFile(error_path, (err, data) => {
                    if (err) {
                        res.end('Error 404: File not found'); 
                    } else {
                        res.end(data);
                    }
                });
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
        });
    }})

server.listen(PUERTO, function () {
    console.log('Servidor funcionando en el puerto ' + PUERTO);
});