const http = require('http');
const fs = require('fs');
const path = require('path');
const { contentType } = require('express/lib/response');

//-- Puerto y rutas de las páginas principales
const PUERTO = 8080;

const index_path = './index.html';
const error_path = './error.html';

//-- Extensiones de los posibles recursos
const mimeTypes = {
    '.html': { type: 'text/html' },
    '.css': { type: 'text/css' },
    '.ico': { type: 'image/x-icon' },
    '.jpeg': { type: 'image/jpeg' },
    '.jpg': { type: 'image/jpg' }
};

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
    
    //-- Otras opciones incluyendo error 404
    } else {
        const ext = path.extname(pathname);
        const mimeInfo = mimeTypes[ext];
        if (mimeInfo) { //-- Si etá registrado el tipo de archivo:
            const recurso = path.join(__dirname, pathname); //-- Obtención de la ruta del recurso
            fs.readFile(recurso, (err, data) => {
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
                res.writeHead(200, { 'Content-Type': mimeInfo.type });
                res.end(data); //-- Envío del recurso pedido
                }
            })
        //-- Si no es un tipo de archivo registrado:
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
    }}
});


server.listen(PUERTO, function () {
    console.log('Servidor funcionando en el puerto ' + PUERTO);
});