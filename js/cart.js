
const linkUser = "https://japceibal.github.io/user_cart/" + extraerDeSession("UserCarrito") + ".json"

let datoT = ""
//Estas lineas sirven para obtener el Carrito con productos guradados en el almacenamiento de session  
document.addEventListener("DOMContentLoaded", function () {
    let carroProducto = extraerDeSession("carrito")


    mostrarProducto(carroProducto)

    // Este event listener sirve para que se modifique el valor según las unidades en tiempo real.
    document.addEventListener("input", function () {
        cambiaPrecio(carroProducto)
    })

})

let liCarro = ""
let precioCarro = ""
//Funcion que muestra el producto en el carrito con la cantidad de veces que el usuario puso un producto en el carrito
function mostrarProducto(producto1) {
    // Envio sirve para mostrar el apartado de envio solo cuando hay productos en el carrito
    let envio = `<h3 class="display-6 mb-3 mt-4">Tipo de envío</h3>
    <div class="form-check">
      <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
      <label class="form-check-label" for="flexRadioDefault1">
        Premium 2 a 5 días (15%)
      </label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
      <label class="form-check-label" for="flexRadioDefault2">
        Express 5 a 8 días (8%)
      </label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
      <label class="form-check-label" for="flexRadioDefault2">
        Standard 12 a 15 días (5%)
      </label>
    </div>
   
    <h3 class="display-6 mt-4">Dirección de envío</h3>
    <div class="row">
      <div class="mb-3 col-6">
        <label for="exampleFormControlInput1" class="form-label">Calle</label>
        <input type="text" class="form-control" id="">
      </div>
      <div class="mb-3 col-2">
        <label for="exampleFormControlInput1" class="form-label">Número</label>
        <input type="text" class="form-control" id="">
      </div>
    </div>
    <div class="row">
      <div class="mb-3 col-4">
        <label for="exampleFormControlInput1" class="form-label">Esquina</label>
        <input type="text" class="form-control" id="">
      </div> 
    </div>`

    for (let i = 0; i < producto1.length; i++) {
        let imagenCarro = `<img  src= ` + producto1[i].images[0] + ` width="100px" height="100px"> `

        liCarro += `
    <tr>
    <td class ="text-center align-middle "> ${imagenCarro}</td>
    <td class ="text-center align-middle" > ${producto1[i].name}</td>
    <td class ="text-center align-middle"> ${producto1[i].currency} ${producto1[i].cost}</td>
    <td> <input type="number"  class ="mt-4" id="Cant${producto1[i].id}" size="2" minlength="2" maxlength="2" min="1" max="2"  value="${producto1[i].cantidad}"> </td>
    <td scope="row" class="align-middle" fw-bold" id="Price${producto1[i].id}" > ${producto1[i].currency} <span id="Price${producto1[i].id}"> ${producto1[i].cost * producto1[i].cantidad}</span>
    </td> 
    <td>  <button type="button" class="btn btn-danger mt-4" onclick="elimDeCarrito(${i})">Eliminar Artículo</button> </td>
    </tr>
    `
        document.getElementById("tbCarro").innerHTML = liCarro
        document.getElementById("envioProducto").innerHTML = envio
    }
}
// Esta función sirven para modificar el precio del sub total a partir del valor del input.
function cambiaPrecio(carroP) {
    for (let i = 0; i < carroP.length; i++) {
        let unidades = document.getElementById(`Cant${carroP[i].id}`).value
        let modificador = extraerDeSession("carrito")
        modificador[i].cantidad = unidades
        guardarEnSession("carrito", modificador)

        document.getElementById(`Price${carroP[i].id}`).innerHTML = carroP[i].currency + " " + unidades * carroP[i].cost
    }
}

//Esta función permite eliminar productos del carrito y en caso de no tener ninguno redirige al index.
function elimDeCarrito(indice) {
    let eliminador = extraerDeSession("carrito")
    if (indice == 0) {
        eliminador.shift()
        guardarEnSession("carrito", eliminador)
        if (eliminador.length > 0) {
            window.location = "cart.html"
        }
        else {
            window.location = "index.html"
        }
    }
    else {
        eliminador.splice(indice, indice)
        guardarEnSession("carrito", eliminador)
        window.location = "cart.html"
    }
}


