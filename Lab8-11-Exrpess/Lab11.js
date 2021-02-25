const express = require('express');
const app = express();

//Middleware
app.use((request, response, next) => {
    console.log('Middleware!');
    next(); //Le permite a la petición avanzar hacia el siguiente middleware
});

app.use('/Personajes', (request, response, next) => {
    response.send('<h1> Personajes </h1>'); 
});

app.use('/', (request, response, next) => {
    response.send('<h1> Main </h1>'); 
});

app.use((request, response, next) => {
    console.log('Otro middleware!');
    response.send('¡Hola mundo!'); //Manda la respuesta
});

app.listen(3000);