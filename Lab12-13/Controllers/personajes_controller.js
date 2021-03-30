const { request, response } = require("express");

//importamos nuesta clase de la capeta modelos
const Personaje = require('../Models/personajes');
const Nuevo_personaje = require('../Models/nuevo');

const personajes = ["Daruk", "Urbosa", "Mipha", "Revali"];

exports.getNuevoPersonaje = (request, response, next) => {

    if (!request.session.isLoggedIn) {
        return response.redirect('/users/login');
    }
    
    response.render('nuevo', {
        titulo: "New character",
        csrfToken: request.csrfToken(),
        isLoggedIn: request.session.isLoggedIn === true ? true:false
    });
}


exports.postNuevoPersonaje = (request, response, next) => {
    //console.log(request.body.nombre_personaje);
    console.log("Creando nuevo personaje...");
    
    const image = request.file;
    console.log(image);

    if(!image) {
        console.error('Error al subir la imagen');
        return response.status(422).redirect('/');
    }
    
    const per_nuevo = new Nuevo_personaje(request.body.nombre_personaje, image.filename);

    per_nuevo.save()
        .then(() => {
            response.setHeader('Set-Cookie', ['Ultimo_personaje='+ per_nuevo.nombre + '; HttpOnly']);
            response.redirect('/historia/personajes');
        }).catch(err => console.log(err));

}

exports.getPersonaje = (request, response, next) => {
    //const personajes = Personaje.fetchAll();

    const id = request.params.personaje_id;

    Nuevo_personaje.fetchOne(id)
        .then(([rows, fieldData]) => {
            response.render('pers', {
                lista_personajes: personajes,
                lista_nuevo_personajes: rows,
                titulo: "Fighters",
                csrfToken: request.csrfToken(),
                isLoggedIn: request.session.isLoggedIn === true ? true:false
            });

        })

    .catch(err => {
        console.log(err);
    });


};

exports.postBuscar = (request, response, next) => {
    
    //response.status(200).json({message: "Respuesta asíncrona"});
    console.log(request.body);
    //console.log(request.body.valor_busqueda);
    const name = request.body.valor_busqueda;

    Nuevo_personaje.fetchByName(name)
    .then(([rows, fieldData]) => {

        console.log(rows);
        response.status(200).json(rows);

    })
    .catch(err => {
        console.log(err);
    });


};

exports.get = (request, response, next) => {
    const personajes = Personaje.fetchAll();

    //console.log('Cookie: ' + request.get('Cookie'));
    //console.log(request.get('Cookie').split(';')[1].trim().split('=')[1]); ERROR!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    //Cookie con cookie parser
    //console.log(request.cookies);
    //console.log(request.cookies.Ultimo_personaje);

    Nuevo_personaje.fetchAll()
        .then(([rows, fieldData]) => {
            response.render('pers', {
                //imagen_per: imagen_personaje,
                lista_personajes: personajes,
                lista_nuevo_personajes: rows,
                titulo: "Fighters",
                csrfToken: request.csrfToken(),
                isLoggedIn: request.session.isLoggedIn === true ? true:false
            });

        })

    .catch(err => {
        console.log(err);
    });


};