//-- Cargar las dependencias
const socket = require('socket.io');
const http = require('http');
const express = require('express');
const colors = require('colors');

const PUERTO = 9090;

//-- Crear una nueva aplciacion web
const app = express();

//-- Crear un servidor, asosiaco a la App de express
const server = http.Server(app);

//-- Crear el servidor de websockets, asociado al servidor http
const io = socket(server);

//-- Número de usuarios conectados
var usuarios = 0;

//-------- PUNTOS DE ENTRADA DE LA APLICACION WEB

//-- Esto es necesario para que el servidor le envíe al cliente la
//-- biblioteca socket.io para el cliente
app.use('/', express.static(__dirname +'/'));

//-- El directorio publico contiene ficheros estáticos
app.use(express.static('public'));

//------------------- GESTION SOCKETS IO
//-- Evento: Nueva conexion recibida
io.on('connect', (socket) => {
  
    socket.emit('message',{ message: '¡Bienvenido al chat!' });
    socket.broadcast.emit('message', { message: 'Nuevo usuario conectado'});
    usuarios += 1;


  //-- Evento de desconexión
  socket.on('disconnect', () => {
    io.emit('message', { message: 'Cliente desconectado'});
  });  

  //-- Mensaje recibido: Ver el caso
  //-- Si el mensaje es un comando:
  socket.on("message", (msg)=> {
    if (msg.startsWith('/')) {
        if (msg == '/help') {
            socket.emit('message', {message: 'Comandos disponibles: /help, /list, /hello, /date' });
        } else if (msg == '/list') {
            socket.emit('message', {message: `El número de usuarios conectados es: ${usuarios}`});
        } else if (msg == '/hello') {
            socket.emit('message', {message: '¡Hola!'});
        } else if (msg == '/date') {
            const currentDate = new Date().toLocaleString();
            socket.emit('message', {message: `La fecha de hoy es: ${currentDate}`});
        } else {
            socket.emit('message', {message: 'Comando no válido'});
        }
    } else {
    //-- Si no, reenviarlo a todos los clientes conectados
    socket.broadcast.emit('message', {message: msg});
    }});

});

//-- Lanzar el servidor HTTP
//-- ¡Que empiecen los juegos de los WebSockets!
server.listen(PUERTO);
console.log("Escuchando en puerto: " + PUERTO);