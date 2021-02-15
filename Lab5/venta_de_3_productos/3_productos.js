var nintendo = document.getElementById("Nintendo");
var xbox = document.getElementById("X-box");
var play = document.getElementById("PS");

var conf = document.getElementById("confirmar");

function confirmar(){
    let C_nintendo = nintendo.value * 8000;
    let C_xbox = xbox.value * 10000;
    let C_play = play.value * 13000;
    let suma = C_nintendo + C_play + C_xbox;
    let IVA = suma * .16;
    let total = suma + IVA;

    if (suma == 0){
        alert("Usted no agregó ningun articulo")
    }

    else if(nintendo.value > 3 || xbox.value > 3 ||  play.value > 3) {
        alert("Agregó másde 3 en algun producto")
    }

    else{
        let iva = document.getElementById("IVA");
        let precio = document.getElementById("precio");
        document.getElementById("pagar").style.visibility = "visible";
    
        iva.innerHTML = "<div> IVA 16%: " + IVA + " pesos </div>";
        precio.innerHTML = "<div> Monto a pagar: " + total + " pesos</div>";
    }


    var pagar = document.getElementById("pagar");

    pagar.onclick = () => {
        alert("Usted ha pagado su monto, a ver si le llegas las consolas");
    }

}

function bienvenida(){
    var img = document.getElementById("img");
    var n =  Math.round(Math.random() * (3 - 1) + 1);
    if (n == 1){
        img.innerHTML = '<img alt="BIENVENIDO" src="https://media.tenor.com/images/c3274659445e26bebceb614dac8c667a/tenor.gif">';
    }
    else if (n == 2){
        img.innerHTML = '<img alt="BIENVENIDO" src="https://media1.tenor.com/images/eb5fda0cab7f0529b199132561c0c3b8/tenor.gif?itemid=4673209">';
    }
    else if (n == 3){
        img.innerHTML = '<img alt="BIENVENIDO" src="https://media.tenor.com/images/3a2e3354cbed5fc41c25bb6a75484d35/tenor.gif">';
    }
}