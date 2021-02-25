const filesystem = require('fs');

const requesthandler = (request, response) => {

    console.log("Hola desde el servidor\n");

    if (request.url === "/Hola"){
        response.setHeader('Content-Type', 'text/html');
        response.write("<html>");
        response.write("<head><title> Holaaa </title></head>");
        response.write("<body><h1> Holaaaaaa  </h1></body>");
        response.write('<a target="_blank" href="http://localhost:3000/Buenas">localhost:3000/Buenas</a><br>')
        response.write('<a target="_blank" href="http://localhost:3000/Texto">localhost:3000/Texto => aqui crear el archivo</a><br>')
        response.write('<a target="_blank" href="http://localhost:3000/LoQueSea">localhost:3000/LoQueSea => esta no existe</a><br>')
        response.write("</html>")
        response.end();
    }

    else if (request.url === "/Buenas"){
        response.setHeader('Content-Type', 'text/html');
        response.write("<html>");
        response.write("<head><title> Buenaaaas </title></head>");
        response.write("<body><h1> Buenaaaaas  </h1></body>");
        response.write('<a target="_blank" href="http://localhost:3000/Hola">localhost:3000/Hola</a><br>')
        response.write('<a target="_blank" href="http://localhost:3000/Texto">localhost:3000/Texto => aqui crear el archivo</a><br>')
        response.write('<a target="_blank" href="http://localhost:3000/LoQueSea">localhost:3000/LoQueSea => esta no existe</a><br>')
        response.write("</html>")
        response.end();
    }

    else if (request.url === "/Texto" && request.method === "GET"){
        response.setHeader('Content-Type', 'text/html');
        response.write("<html>");
        response.write("<head><title> Textoooo </title></head>");
        response.write("<body><h1> Que quieres escribir en el archivo de texto?  </h1>");
        response.write('<form action = "Texto" method = "POST"> <input type = "text" name = "texto"><input type = "submit" value = "Guardar texto"> </form>');
        response.write('<a target="_blank" href="http://localhost:3000/Hola">localhost:3000/Hola</a><br>')
        response.write('<a target="_blank" href="http://localhost:3000/Buenas">localhost:3000/Buenas</a><br>')
        response.write('<a target="_blank" href="http://localhost:3000/LoQueSea">localhost:3000/LoQueSea => esta no existe</a><br>')
        response.write('</body>');
        response.write("</html>");
        response.end();
    }

    else if (request.url === "/Texto" && request.method === "POST"){
        var simon;
        request.on('data', (dato) => {
            simon = dato;
        });

        request.on('end', () => {

            const datos_escritos = Buffer.from(simon).toString();
            
            const datos_escritos2 = datos_escritos.split('=')
            [1];
            var res = datos_escritos2.replace(/[+]/gi, ' ')
            console.log(res);
            filesystem.writeFileSync('archivo.txt', res);

        })
    }

    else{
        response.statusCode = 404;
        response.setHeader('Content-Type', 'text/html');
        response.write("<html>");
        response.write("<head><title> Page not found </title></head>");
        response.write("<body><h1> Page not found  </h1></body>");
        response.write("</html>");
        response.end();
    }
    

} 

module.exports = requesthandler;