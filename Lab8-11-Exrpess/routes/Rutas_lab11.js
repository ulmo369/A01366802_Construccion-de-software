const express = require('express');

const router = express.Router();

const filesystem = require('fs');

var string = "";

router.use('/Ruta1', (request, response, next) => {
    response.send('<h1> Ruta uno </h1>'); 
});

router.use('/Ruta2', (request, response, next) => {
    response.send('<h1> Ruta dos </h1>'); 
});

router.get('/Texto', (request, response, next) => {
    response.send('<h1> Escribe tu texto </h1> <form action = "Texto" method = "POST"> <input type = "text" name = "texto"><input type = "submit" value = "Guardar texto"> </form>'); 

});

router.post('/Texto', (request, response, next) => {
    console.log(request.body.texto);
    filesystem.writeFileSync('archivo.txt', request.body.texto);
    response.redirect('/Rutas')
    string = request.body.texto;
    
});

router.use('/', (request, response, next) => {
    console.log(string);
    response.send('<h1> Aquí estará tu texto guardado </h1><br>' + string);

});

module.exports = router;