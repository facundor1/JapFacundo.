
document.getElementById("login1").addEventListener("click", function () {
    var nombre = document.getElementById("nombreUs")
    var contrasenia = document.getElementById("contraUs")
    const arroba = "@"
    const puntocom = ".com"
    if (nombre.value.length > 0 && contrasenia.value.length > 0 && nombre.value.includes(arroba) && nombre.value.includes(puntocom) ) {
        window.location = "index.html"
        guardarEnSession("User", nombre.value)
    }
    else {
        if (nombre.value.length == 0){
            document.getElementById("error1").innerHTML = "Ingrese su e-mail"
            contrasenia.style.borderColor = "red";}
        else {
            document.getElementById("error1").innerHTML = "Ingrese un e-mail válido"
            contrasenia.style.borderColor = "red";
        }
        document.getElementById("error2").innerHTML = "Ingrese su contraseña"
        nombre.style.borderColor = "red";
    }
    guardarEnSession("bandera",1)
   
});

