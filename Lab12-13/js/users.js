//Uso de express
const express = require('express');

//uso de las rutas de una pagina (localhost:3000/historia/personajes)
const router = express.Router();

//para generar archivos de texto
const filesystem = require('fs');

//Para utilizar el .path, referenciar uno de nuestros archivos
const path = require('path');

//Para utilizar los controladores (carpeta controladores)
const Users_Controller = require('../Controllers/users_controller.js');

router.get('/login', Users_Controller.getLogin);

router.post('/login', Users_Controller.postLogin);

router.get('/logout', Users_Controller.getLogout);


module.exports = router;