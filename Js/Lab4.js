
function Ejercicio1 (){
    const n = prompt("Dame el número");

    for (var i = 0; i <= n; i++){
        document.write("<table><tr> ",i," -> </tr>");
        
        let cuadrado = Math.pow(i, 2);
        document.write("<tr>",cuadrado," -> </tr>");

        let cubo = Math.pow(i,3);
        document.write("<tr>",cubo," </tr> </table>");
    }

}

Ejercicio1()
