
var password1 = document.getElementById("contraseña1");
password1.onkeypress = () => {
    console.log(password1);
}

var password2 = document.getElementById("contraseña2");
password2.onkeypress = () => {
    console.log(password2);
}

var button1 = document.getElementById("Aceptar_contra");

function verificar(){
    button1.onclick = () => {
        if (password1.value == password2.value){
            document.getElementById("No_parecido").style.visibility = "hidden";
            document.getElementById("Parecido").style.visibility = "visible";
        }
        else{
            document.getElementById("Parecido").style.visibility = "hidden";
            document.getElementById("No_parecido").style.visibility = "visible";
        }
    }

}