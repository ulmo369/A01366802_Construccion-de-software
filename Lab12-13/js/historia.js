//Uso de express
const express = require('express');

//uso de las rutas de una pagina (localhost:3000/historia/personajes)
const router = express.Router();

//para generar archivos de texto
const filesystem = require('fs');

//Para utilizar el .path, referenciar uno de nuestros archivos
const path = require('path');

//Para utilizar los controladores (carpeta controladores)
const Inicio_Controller = require('../Controllers/inicio_controller.js');
const Pers_Controller = require('../Controllers/personajes_controller.js');


//var personajes = ["Daruk", "Urbosa", "Mipha", "Revali"];

var string = "";

router.get('/enemigo', (request, response, next) => {
    response.render('Enemigo', {
        titulo: "Enemy",
        isLoggedIn: request.session.isLoggedIn === true ? true:false
    });
    //response.sendFile(path.join(__dirname, '..', 'views', 'enemigo.html'));
});

router.get('/heroe', (request, response, next) => {
    response.render('Heroe', {
        titulo: "Heroes",
        isLoggedIn: request.session.isLoggedIn === true ? true:false
    });
    //response.sendFile(path.join(__dirname, '..', 'views', 'heroe.html'));
});


router.get('/nuevo_personaje', Pers_Controller.getNuevoPersonaje);

router.post('/nuevo_personaje', Pers_Controller.postNuevoPersonaje);

router.get('/personajes', Pers_Controller.get);

router.get('/', Inicio_Controller.get);

router.use((request, response, next) => {
    response.statusCode = 404; 
    response.sendFile(path.join(__dirname, '..', 'views', '404.html'));
});


module.exports = router;


//router.post('/Texto', (request, response, next) => {
//    console.log(request.body.texto);
//    filesystem.writeFileSync('archivo.txt', request.body.texto);
//    response.redirect('/Rutas')
//    string = request.body.texto;
//});