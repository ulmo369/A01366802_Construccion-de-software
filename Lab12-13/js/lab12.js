const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const path = require('path');
const Rutas = require('./historia.js'); //para llavar el archivo de mis rutas
const RutasUsers = require('./users.js');
const cookieParser = require('cookie-parser'); //para cokies
const session = require('express-session');

app.set('view engine', 'ejs');
app.set('views', 'views');//Para llamar mi views de .ejs

//Middleware
//Para acceder facilmente a los datos de las formas
app.use(bodyParser.urlencoded({extended: false}));
//Para acceder a los datos de las cookies
app.use(cookieParser())
//Para acceder a las sesiones
app.use(session({
    secret: 'ulmo369', 
    resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
    saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
}));

//Para acceder a los recursos de la carpeta public
app.use(express.static(path.join(__dirname,'..', 'public')));

app.use((request, response, next) => {
    console.log('Middleware!');
    next(); //Le permite a la petición avanzar hacia el siguiente middleware
});


app.use('/historia', Rutas);

app.use('/users', RutasUsers);

app.get('/', (request, response, next) => {
    response.render('inicio' , {
        titulo: "Inicio",
        isLoggedIn: request.session.isLoggedIn === true ? true:false
    });
    //response.sendFile(path.join(__dirname, '..', 'views', 'inicio.html'));
});

app.use((request, response, next) => {
    response.statusCode = 404; 
    response.sendFile(path.join(__dirname, '..', 'views', '404.html'));
});


app.listen(3000);