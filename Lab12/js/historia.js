const express = require('express');

const router = express.Router();

const filesystem = require('fs');

const path = require('path');

var personajes = [];

var string = "";

router.get('/enemigo', (request, response, next) => {
    response.sendFile(path.join(__dirname, '..', 'views', 'enemigo.html'));
});

router.get('/heroe', (request, response, next) => {
    response.sendFile(path.join(__dirname, '..', 'views', 'heroe.html'));
});

router.get('/personajes', (request, response, next) => {
    response.sendFile(path.join(__dirname, '..', 'views', 'personajes.html'));
    response.send('<h1> Escribe tu texto </h1> <form action = "Texto" method = "POST"> <input type = "text" name = "texto"><input type = "submit" value = "Guardar texto"> </form>'); 

});

router.post('/Texto', (request, response, next) => {
    console.log(request.body.texto);
    filesystem.writeFileSync('archivo.txt', request.body.texto);
    response.redirect('/Rutas')
    string = request.body.texto;
    
});

router.get('/', (request, response, next) => {
    response.sendFile(path.join(__dirname, '..', 'views', 'inicio.html'));
});

module.exports = router;