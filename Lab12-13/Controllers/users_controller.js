const { request, response } = require("express");

exports.getLogin = (request, response, next) => {
    response.render('login', {
        titulo: 'Incio de sesion',
        isLoggedIn: request.session.isLoggedIn === true ? true:false,
        //isLoggedOut: request.session.isLoggedOut === true ? true:false

    });
    
}

exports.postLogin = (request, response, next) => {
    request.session.isLoggedIn = true;
    request.session.usuario = request.body.usuario

    response.redirect('/historia');;
    
}

exports.getLogout = (request, response, next) => {
    request.session.destroy((err) => {
        console.log(err);
        console.log('Logout');
        response.redirect('/'); //Este código se ejecuta cuando la sesión se elimina.
    });
    
}