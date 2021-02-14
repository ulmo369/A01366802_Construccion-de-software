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
//------------------------------------------------------------------------------------------------------
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
//------------------------------------------------------------------------------------------------------
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
    alert("Arreglo = " + arreglo + "\n0's = " + contador0 + "\nNegativos = " + contadorNegativos + "\nPositivos= " + contadorPositivos);
}
//------------------------------------------------------------------------------------------------------
function Ejercicio4(){
    var num = prompt("De cuantos numeros cada renglon? (En la consola se mostrara cada matriz)");
    var cant = prompt("Cuantos renglones?")
    var matriz = []

    while (cant > 0){
        var arreglo = [];

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
//------------------------------------------------------------------------------------------------------
function Ejercicio5(){
    var numero = prompt("Dame el número que quieres invertir");
    var numero_Inverso = "";

    for (let i = numero.length - 1; i >= 0; i--){
        numero_Inverso = numero_Inverso + numero[i];
    }

    console.log("Numero dado = " + numero + "\nnumero inverso = " + numero_Inverso);
    alert("Numero dado = " + numero + "\nnumero inverso = " + numero_Inverso);
}

//------------------------------------------------------------------------------------------------------

function Ejercicio6(){

    class Registro{

        constructor(salon, v){
            this.salon = salon;
            this.v = v;
        }
    
        mas_alto_c(){
            var mayor = 0;
            for (var i = 0; i < v.length; i++){
                var calificacion = v[i][1];
                if (calificacion > mayor){
                    mayor = calificacion;
                }
            }

            return mayor;
        }

        mas_alto_a(){
            var mayor = 0;
            var alumno = [];
            for (var i = 0; i < v.length; i++){
                let calificacion = v[i][1];
                if (calificacion > mayor){
                    mayor = calificacion;
                    alumno = v[i][0];
                }
            }
            return alumno;
        }
    
        mas_bajo_c(){
            var menor = 100;
            for (var i = 0; i < v.length; i++){
                var calificacion = v[i][1];
                if (calificacion < menor){
                    menor = calificacion;
                }
            }
            return menor;
        }

        mas_bajo_a(){
            let menor = 100;
            let alumno = [];
            for (var i = 0; i < v.length; i++){
                var calificacion = v[i][1];
                if (calificacion < menor){
                    menor = calificacion;
                    alumno = v[i][0];
                }
            }
            return alumno;
        }
    
        promedio(){
            var promedio = 0;
            var suma = 0;
    
            for (var i = 0; i < v.length; i++){
                var calificacion = v[i][1];
                suma = suma + calificacion;
            }
            promedio = suma / i;
            return promedio;
        }
    
        Get_salon(){
            return this.salon;
        }
    
    
    }
    
    var v = [["carolina", 93], ["\nEmilio", 94], ["\nRomel", 99], ["\nDavid", 90], ["\nErick", 92], ["\nLeo", 98], ["\nEmi", 89], ["\nManolo", 91], ["\nJulio", 93], ["\nIsaias", 79]];
    var datos = new Registro("Salon 512", v);
    
    var result;
    
    let pregunta = prompt("Calificaciones:\n" + v + "\n\nQue trabajo necesitas?\n(1)calificación más alta\n(2)califiación más baja\n(3)promedio del salon");
    if (pregunta == 3){

        console.log(datos.Get_salon() + datos.promedio());
        alert("El " + datos.Get_salon() + " tiene un promedio de " + datos.promedio());
    }
    else if (pregunta == 2){
        console.log(datos.Get_salon() + datos.mas_bajo_c());
        alert("El más bajo del " + datos.Get_salon() + " es " + datos.mas_bajo_a() + " con " + datos.mas_bajo_c());
    }
    else if (pregunta == 1){
        console.log(datos.Get_salon() + datos.mas_alto_c());
        alert("El más alto del " + datos.Get_salon() + " es " + datos.mas_alto_a() + " con " + datos.mas_alto_c());
    }
}