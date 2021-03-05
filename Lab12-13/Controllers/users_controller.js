const { request, response } = require("express");

exports.getLogin = (request, response, next) => {
    response.render('login', {
        titulo: 'Incio de sesion',
        isLoggedIn: request.session.isLoggedIn
    });
    
}

exports.postLogin = (request, response, next) => {
    request.session.isLoggedIn = true;
    request.session.usuario = request.body.usuario

    response.redirect('/historia');;
    
}

exports.logOut = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('/'); //Este código se ejecuta cuando la sesión se elimina.
    });
    
}