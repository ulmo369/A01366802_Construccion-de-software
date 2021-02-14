function Ejercicio1 (){
    
    const n = prompt("Dame el número");
    document.write("<table style=width:50% align=center> <tr> ","<td style=width:20.2%>Numero</td>" );
    document.write("<td style=width:17%> Cuadrado </td>");
    document.write("<td style=width:20%> Cubo </td>");

    for (var i = 0; i <= n; i++){
        document.write("<table style=width:50% align=center> <tr> ","<td style=width:20%>",i,"</td>" );
        
        var cuadrado = Math.pow(i, 2);
        document.write("<td style=width:20%>", cuadrado ,"</td>");

        var cubo = Math.pow(i,3);
        document.write("<td style=width:20%>", cubo ," </td> </tr></table>");
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


function Ejercicio4(){
    var num = prompt("De cuantos numeros cada renglon? (En la consola se motrara cada matriz)");
    var cant = prompt("Cuantos renglones?")
    var matriz = []

    while (cant > 0){
        var arreglo = [];
        var cont = 0;
        
        for (let i = 0; i <= num - 1; i++){
            var numeros =  Math.round(Math.random() * (100 - 50) + 50);
            arreglo.push(numeros);
        }
        console.log(arreglo)

        matriz.push(arreglo);
        cant--;
    }

    for (var i = 0; i < matriz.length; i++){
        var promedio = 0;
        var suma = 0;

        for (var j = 0; j < matriz[i].length; j++){

            var Numero_Actual = matriz[i][j];
            suma = suma + Numero_Actual;
        }

        var ren = i + 1;
        promedio = suma / num;
        alert("El promedio del renglon " + ren + " es = " + promedio + "\n");
        console.log(matriz);
        console.log("El promedio del renglon " + ren + " es = " + promedio + "\n");
    }
}

function Ejercicio5(){
    var numero = prompt("Dame el número que quieres invertir");
    var numero_Inverso = "";

    for (let i = numero.length - 1; i >= 0; i--){
        numero_Inverso = numero_Inverso + numero[i];
    }

    console.log("Numero dado = " + numero + "\nnumero inverso = " + numero_Inverso);
    alert("Numero dado = " + numero + "\nnumero inverso = " + numero_Inverso);
}



//Ejercicio1()
//Ejercicio2()
//Ejercicio3()
//Ejercicio4()
//Ejercicio5()