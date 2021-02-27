const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const Rutas = require('./Routes/Rutas_lab11.js');

//Middleware
app.use(bodyParser.urlencoded({extended: false}));

app.use((request, response, next) => {
    console.log('Middleware!');
    next(); //Le permite a la petición avanzar hacia el siguiente middleware
});

app.use('/Rutas', Rutas);

app.get('/', (request, response, next) => {
    response.send('<h1> INICIO </h1>'); 
});

app.use((request, response, next) => {
    response.statusCode = 404; 
    response.send('<h1> Página no encontrada </h1>'); //Manda la respuesta
});


app.listen(3000);