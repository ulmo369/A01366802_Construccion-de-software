const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const path = require('path');
const Rutas = require('./historia.js');

app.set('view engine', 'ejs');
app.set('views', 'views');

//Middleware
app.use(bodyParser.urlencoded({extended: false}));

//Para acceder a los recursos de la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

app.use((request, response, next) => {
    console.log('Middleware!');
    next(); //Le permite a la petición avanzar hacia el siguiente middleware
});

app.use('/historia', Rutas);

app.get('/', (request, response, next) => {
    response.sendFile(path.join(__dirname, '..', 'views', 'inicio.html'));
});

app.use((request, response, next) => {
    response.statusCode = 404; 
    response.sendFile(path.join(__dirname, '..', 'views', '404.html'));
});


app.listen(3000);