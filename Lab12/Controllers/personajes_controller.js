var personajes = ["Daruk", "Urbosa", "Mipha", "Revali"];

exports.get = (request, response, next) => {
    //response.sendFile(path.join(__dirname, '..', 'views', 'personajes.html'));
    response.render('pers', {
        lista_personajes: personajes,
        titulo: "Fighters"
    });
};