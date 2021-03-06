//Uso de express
const express = require('express');

//uso de las rutas de una pagina (localhost:3000/historia/personajes)
const router = express.Router();

//para proteger las rutas
const isAuth = require('../util/is-auth');

//para generar archivos de texto
const filesystem = require('fs');

//Para utilizar el .path, referenciar uno de nuestros archivos
const path = require('path');

//Para utilizar los controladores (carpeta controladores)
const Users_Controller = require('../Controllers/users_controller.js');

router.get('/login', Users_Controller.getLogin);

router.post('/login', Users_Controller.postLogin);

router.get('/logout', isAuth, Users_Controller.getLogout);

router.get('/register', Users_Controller.getRegister);

router.post('/register', Users_Controller.postRegister);


module.exports = router;