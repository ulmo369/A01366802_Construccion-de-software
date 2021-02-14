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

function Ejercicio3(){
    N = prompt("Cuantos numeros quieres agregar al arreglo?")
    const arreglo = []

    for (let i = 0; i <= N - 1; i++){
        var numeros =  Math.round(Math.random() * (10 - (-10)) + (-10));
        arreglo.push(numeros);
    }

    var contador0 = 0;
    var contadorNegativos = 0;
    var contadorPositivos = 0;
    for (let i = 0; i <= arreglo.length; i++){

        if (arreglo[i] == 0){
            contador0++;
        }

        else if (arreglo[i] < 0){
            contadorNegativos++;
        }

        else if (arreglo[i] > 0){
            contadorPositivos++;
        }
    }

    console.log(arreglo);
    alert("0's = " + contador0 + "\nNegativos = " + contadorNegativos + "\nPositivos= " + contadorPositivos);
}



//Ejercicio2()
//Ejercicio1()
Ejercicio3()
