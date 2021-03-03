const { request, response } = require("express");

//importamos nuesta clase de la capeta modelos
const Personaje = require('../Models/personajes');
const Nuevo_personaje = require('../Models/nuevo');


//const personajes = ["Daruk", "Urbosa", "Mipha", "Revali"];
//const per_nuevo = [];

exports.getNuevoPersonaje = (request, response, next) => {
    response.render('nuevo', {titulo: "New character"});
    //response.sendFile(path.join(__dirname, '..', 'views', 'heroe.html'));
}

//var imagen_personaje = "";
exports.postNuevoPersonaje = (request, response, next) => {
    console.log(request.body.nombre_personaje);
    const per_nuevo = new Nuevo_personaje(request.body.nombre_personaje, request.body.foto_personaje);
    per_nuevo.save();
    //imagen_personaje = per_nuevo.showimage();
    response.redirect('/historia/personajes');
}

exports.get = (request, response, next) => {

    const personajes = Personaje.fetchAll();
    const per_nuevo = Nuevo_personaje.fetchAll();

    response.render('pers', {
        //imagen_per: imagen_personaje,
        lista_personajes: personajes,
        lista_nuevo_personajes: per_nuevo,
        titulo: "Fighters"
    });
};