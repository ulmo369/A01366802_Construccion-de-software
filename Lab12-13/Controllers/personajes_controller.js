const { request, response } = require("express");

//importamos nuesta clase de la capeta modelos
const Personaje = require('../Models/personajes');
const Nuevo_personaje = require('../Models/nuevo');


exports.getNuevoPersonaje = (request, response, next) => {
    response.render('nuevo', {
        titulo: "New character",
        isLoggedIn: request.session.isLoggedIn === true ? true:false
    });
}


exports.postNuevoPersonaje = (request, response, next) => {
    //console.log(request.body.nombre_personaje);
    const per_nuevo = new Nuevo_personaje(request.body.nombre_personaje, request.body.foto_personaje);
    per_nuevo.save();

    response.setHeader('Set-Cookie', ['Ultimo_personaje='+per_nuevo.nombre + '; HttpOnly']);

    response.redirect('/historia/personajes');
}

exports.get = (request, response, next) => {
    const personajes = Personaje.fetchAll();

    console.log('Cookie: ' + request.get('Cookie'));
    //console.log(request.get('Cookie').split(';')[1].trim().split('=')[1]); ERROR!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    //Cookie con cookie parser
    console.log(request.cookies);
    console.log(request.cookies.Ultimo_personaje);

    const per_nuevo = Nuevo_personaje.fetchAll()
        .then(([rows, fieldData]) => {
            const per_nuevo = [];
            for (let personaje of rows){
                per_nuevo.push({
                    nombre: personaje.nombre, 
                    imagen: personaje.imagen
                });
            }
            console.log(per_nuevo);
            response.render('pers', {
                //imagen_per: imagen_personaje,
                lista_personajes: personajes,
                lista_nuevo_personajes: per_nuevo,
                titulo: "Fighters",
                isLoggedIn: request.session.isLoggedIn === true ? true:false
                
            });

        })

    .catch(err => {
        console.log(err);
    });


};