
document.getElementById("login1").addEventListener("click", function () {
    var nombre = document.getElementById("nombreUs")
    var contrasenia = document.getElementById("contraUs")
    if (nombre.value.length > 0 && contrasenia.value.length > 0) {
        window.location = "index.html"
    }
    else {
        nombre.style.borderColor = "red";
        document.getElementById("error1").innerHTML = "Ingrese su e-mail"
        contrasenia.style.borderColor = "red";
        document.getElementById("error2").innerHTML = "Ingrese su contraseña"
    }
    guardarEnSession("bandera",1)
});


