const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const filesystem = require('fs');

var string = "";

//Middleware
app.use(bodyParser.urlencoded({extended: false}));

app.use((request, response, next) => {
    console.log('Middleware!');
    next(); //Le permite a la petición avanzar hacia el siguiente middleware
});

app.use('/Rutas/Ruta1', (request, response, next) => {
    response.send('<h1> Ruta uno </h1>'); 
});
app.use('/Rutas/Ruta2', (request, response, next) => {
    response.send('<h1> Ruta dos </h1>'); 
});

app.get('/Rutas/Texto', (request, response, next) => {
    response.send('<h1> Escribe tu texto </h1> <form action = "Texto" method = "POST"> <input type = "text" name = "texto"><input type = "submit" value = "Guardar texto"> </form>'); 

});

app.post('/Rutas/Texto', (request, response, next) => {
    console.log(request.body.texto);
    filesystem.writeFileSync('archivo.txt', request.body.texto);
    response.redirect('/Rutas')
    string = request.body.texto;
    
});

app.use('/Rutas', (request, response, next) => {
    console.log(string);
    response.send('<h1> Aquí estará tu texto guardado </h1><br>' + string);

});

app.get('/', (request, response, next) => {
    response.send('<h1> INICIO </h1>'); 
});

app.use((request, response, next) => {
    response.statusCode = 404; 
    response.send('<h1> Página no encontrada </h1>'); //Manda la respuesta
});


app.listen(3000);