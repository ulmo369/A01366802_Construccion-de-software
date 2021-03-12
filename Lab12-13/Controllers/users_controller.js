const { request, response } = require("express");
const Usuario = require('../Models/user');
const bcrypt = require('bcryptjs');
const session = require("express-session");

exports.getLogin = (request, response, next) => {

    response.render('login', {
        titulo: 'Incio de sesion',
        error: request.session.error,
        isLoggedIn: request.session.isLoggedIn === true ? true:false,
        csrfToken: request.csrfToken()
    });
    
}

exports.postLogin = (request, response, next) => {

    request.session.error = "";

    const username = request.body.usuario;
    Usuario.fetchOne(username)
        .then(([rows, fieldData]) => {
            if (rows.length < 1) {

                request.session.error = "El usuario y/o contraseña no coinciden"
                response.redirect('/users/login');
                console.log("Te equivocaste");

            }

            else{
                bcrypt.compare(request.body.password, rows[0].password)
                    .then(doMatch => {
                        if (doMatch) {
                            request.session.password = request.body.password;
                            request.session.isLoggedIn = true;
                            request.session.usuario = request.body.usuario;
                            console.log(request.session); // para imprimir las variables de la sesion 
                            return request.session.save(err => {
                                response.redirect('/historia/personajes');
                            });
                        }
                        request.session.error = "El usuario y/o contraseña no coinciden"
                        response.redirect('/users/login');

                    }).catch(err => {
                        request.session.error = "El usuario y/o contraseña no coinciden"

                        response.redirect('/users/login');
                    });
            }

        }).catch(err => {
        console.log(err);
    });
    
};

exports.getLogout = (request, response, next) => {
    request.session.destroy((err) => {
        console.log(err);
        console.log('Logout');
        response.redirect('/'); //Este código se ejecuta cuando la sesión se elimina.
    });
    
};

exports.getRegister = (request, response, next) => {

    response.render('register', {
        titulo: 'Register user',
        isLoggedIn: request.session.isLoggedIn === true ? true:false,
    });
    
};

exports.postRegister = (request, response, next) => {
    //console.log(request.body.nombre_personaje);
    const nuevo_usuario = new Usuario(request.body.nombre, request.body.usuario, request.body.password);
    nuevo_usuario.save()
        .then(() => {
            request.session.isLoggedIn = true;
            request.session.usuario = request.body.usuario
            response.redirect('/historia/personajes');
        }).catch(err => console.log(err));

}