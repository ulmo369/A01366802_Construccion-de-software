const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const path = require('path');
const Rutas = require('./historia.js'); //para llavar el archivo de mis rutas
const RutasUsers = require('./users.js');
const cookieParser = require('cookie-parser'); //para cokies
const session = require('express-session');

const multer = require('multer');

const csrf = require('csurf');
const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');//Para llamar mi views de .ejs

//Middleware
//Para acceder facilmente a los datos de las formas
app.use(bodyParser.urlencoded({extended: false}));

//fileStorage: Es nuestra constante de configuración para manejar el almacenamiento
const fileStorage = multer.diskStorage({
    destination: (request, file, callback) => {
        //'uploads': Es el directorio del servidor donde se subirán los archivos 
        callback(null, '../Lab12-13/Uploads');
    },
    filename: (request, file, callback) => {
        //aquí configuramos el nombre que queremos que tenga el archivo en el servidor, 
        //para que no haya problema si se suben 2 archivos con el mismo nombre concatenamos el timestamp
        callback(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    },
});


//En el registro, pasamos la constante de configuración y
//usamos single porque es un sólo archivo el que vamos a subir, 
//pero hay diferentes opciones si se quieren subir varios archivos. 
//'archivo' es el nombre del input tipo file de la forma
app.use(multer({ storage: fileStorage }).single('foto_personaje')); 

//Para acceder a los recursos de la carpeta public
app.use(express.static(path.join(__dirname,'..', 'public')));
//Para acceder a los recursos de la carpeta uploads
app.use(express.static(path.join(__dirname,'..', 'Uploads')));

//Para acceder a los datos de las cookies
app.use(cookieParser())
//Para acceder a las sesiones
app.use(session({
    secret: 'ulmo369', 
    resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
    saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
}));

app.use(csrfProtection); 

app.use((request, response, next) => {
    console.log('Middleware!');
    next(); //Le permite a la petición avanzar hacia el siguiente middleware
});


app.use('/historia', Rutas);

app.use('/users', RutasUsers);

app.get('/', (request, response, next) => {
    //console.log(request.session);
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