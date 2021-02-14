function Ejercicio1 (){
    
    const n = prompt("Dame el número");

    for (var i = 0; i <= n; i++){
        document.write ("<table><tr> ",i," -> </tr>");
        
        var cuadrado = Math.pow(i, 2);
        document.write ("<tr>",cuadrado," -> </tr>");

        var cubo = Math.pow(i,3);
        document.write ("<tr>",cubo," </tr> </table>");
    }

}

function Ejercicio2(){
    var random1 = Math.floor(Math.random() * 101);
    var random2 = Math.floor(Math.random() * 101);
    var suma = random1 + random2;

    var start = new Date().getTime();
    const result = prompt("Cual es la suma de: " + random1 + "+" + random2);
    var end = new Date().getTime();
    var time = (end - start)/1000;

    if (result == suma){
        alert("CORRECTO!! tardaste " + time + "Seg");
    }
    else{
        alert("INCORRECTO!! el resultado era " + suma + " tardaste " + time + "Seg");
    }
}


var numeros = Math.floor(Math.random() * 101);

//Ejercicio2()
//Ejercicio1()
