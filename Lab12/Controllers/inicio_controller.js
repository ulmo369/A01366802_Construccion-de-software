exports.get = (request, response, next) => {
    //response.sendFile(path.join(__dirname, '..', 'views', 'inicio.html'));
    response.render('inicio', {titulo: "Beginning"});
};