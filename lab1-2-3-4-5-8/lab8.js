const { dirname } = require('path');

console.log("Hola desde node\n");

function Ejercicio1(){
    const arreglo = [8, 7, 2, 7, 3, 1, 10, 7];
    let suma = 0;
    let promedio = 0;

    for(var i = 0; i < arreglo.length; i++){
        suma = suma + arreglo[i];
    }

    promedio = suma / i;
    console.log(promedio);
} 

function Ejercicio2(){
    const filesystem = require('fs');
    const prompt = require('prompt-sync')();
    let text = prompt("Que quieres escribir en el archivo? ");
    filesystem.writeFileSync('archivo.txt', text);
}

function Ejercicio3(){
    console.log("Vamos a calcular el promedio de los renglones de una matriz, pero primero \n")
    const prompt = require('prompt-sync')();
    var num = prompt("De cuantos numeros cada renglon? ");
    var cant = prompt("Cuantos renglones? ")
    var matriz = []

    while (cant > 0){
        var arreglo = [];

        for (let i = 0; i <= num - 1; i++){
            var numeros =  Math.round(Math.random() * (100 - 50) + 50);
            arreglo.push(numeros);
        }
        console.log("se agregará el siguiente arreglo a la matriz = " + arreglo);
        matriz.push(arreglo);
        cant--;
    }

    console.log("\n")

    for (var i = 0; i < matriz.length; i++){
        var promedio = 0;
        var suma = 0;

        for (var j = 0; j < matriz[i].length; j++){

            var Numero_Actual = matriz[i][j];
            suma = suma + Numero_Actual;
        }

        var ren = i + 1;
        promedio = suma / num;
        console.log("El promedio del renglon " + ren + " es = " + promedio + "\n");
    }
    
}



function fun(){
    /*
    const http = require('http');
    
    const server = http.createServer((request, response) => {
    
        console.log("Hola desde el servidor");
        response.setHeader('Content-Type', 'text/html');
        response.(__dirname + "/Preguntas_labs.html")
        response.end();
    
    } );
    
    server.listen(3000);*/

    
    const express = require("express")
    const app = express()

    app.get('/', (req, res, next) => {
        res.sendFile(__dirname + "/Preguntas_labs.html")
    })

    app.listen(3000, () =>{
        console.log("Hola desde el servidor");
    })

}

/*Ejercicio1();*/

fun();