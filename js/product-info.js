const URLinfo = "https://japceibal.github.io/emercado-api/products/" + extraerDeSession("productID") + ".json"
const URLComment = "https://japceibal.github.io/emercado-api/products_comments/" + extraerDeSession("productID") + ".json"

console.log(URLinfo);
document.addEventListener("DOMContentLoaded", function () {

    getJSONData(URLinfo).then(function (respuesta) {
        if (respuesta.status === "ok") {
            infoProducto = respuesta.data
            mostrarInfoProducto(infoProducto)
        }
    })
    getJSONData(URLComment).then(function (respuesta) {
        if (respuesta.status === "ok") {
            comentarioProducto = respuesta.data
            mostrarComentario(comentarioProducto)
        }
    })
})

function mostrarInfoProducto(info) {
    let datosProd =
        ` 
   
<p class="infoTit"> ${info.name}     <button type="button"  class="btn btn-success" onclick="agregarAlcarrito()">Comprar</button><p>
<hr>
<div class="correg">
<p class= "infoSubtit"> Precio  </p>
<p clas="infoData">${info.currency} ${info.cost} </p>
<p class= "infoSubtit">  Descripción  </p>
<p clas="infoData">${info.description} </p>
<p class= "infoSubtit"> Categoria </p>
<p clas="infoData">${info.category} </p>
<p class= "infoSubtit">  Unidades vendidas </p>
<p clas="infoData">${info.soldCount} </p>
</div>
`
    document.getElementById("inforP").innerHTML = datosProd

    let imagenes = ""
    for (let foto of info.images) {
        let imagP = `<img  src= ` + foto + ` class= "infoImag"> `

        imagenes +=
            `
       <td > ${imagP} </td>
    `
    }
    fila =
        `
        
    <tr >
    ${imagenes}
    </tr>
    `
    document.getElementById("datoPro").innerHTML = fila

    // con esta linea de codigo introduzco los objetos relacionados
    let relacionado = ""
    for (let i = 0; i < info.relatedProducts.length; i++) {


        let imgRel = `<img  src= ` + info.relatedProducts[i].image + ` class="img-thumbnail rounded mx-auto d-block " width="200px" height="200px"> `
        relacionado += `<li class="list-group-item flex-fill list-group-item-action" onclick="bajarJson(${info.relatedProducts[i].id})">` + info.relatedProducts[i].name + imgRel + `</li> `
    }

    document.getElementById("relacionados").innerHTML = relacionado







}

// Con estas lineas creo un objeto que tiene los elementos que queiero del producto para mostar en el carrito y la cantidad de veces que el usuario le dió comrpar
let carritoSession = [];
let item = ""
let producto1 = new Object()
producto1.id = "";
producto1.cantidad = "";
producto1.name = "";
producto1.cost = "";
producto1.currency = "";
producto1.images = "";

//Esta funcion crea un objeto con los productos (id y cantidad) y lo guarda en SessionStorage. 
function agregarAlcarrito() {
    
    //crea la variable carrito en session
    if (extraerDeSession("carrito") == null || extraerDeSession("carrito") == []) {
        guardarEnSession("carrito", [])
    }
    //la extraigo para sumar varios productos al carrito
    carritoSession = extraerDeSession("carrito");
    item = extraerDeSession("productID")
    // funciona para el primer producto a agregar y del "else" para el segundo en adelante
    if (carritoSession == "") {
        producto1.id = item
        producto1.cantidad = 1
        producto1.name = infoProducto.name
        producto1.cost = infoProducto.cost
        producto1.currency = infoProducto.currency
        producto1.images = infoProducto.images
        carritoSession.push(producto1)
        guardarEnSession("carrito", carritoSession)
        window.location = "cart.html"

    }
    // Funciona a partir del segundo producto agregado
    else {
        //Uso un while que recorre el carrito, si ya hay un producto con mismo id suma 1 a la cantidad, si no hay se corta por length
        let i = 0
        let b = 0
        while (i < carritoSession.length && b == 0) {


            if (item == carritoSession[i].id) {
                carritoSession[i].cantidad += 1
                guardarEnSession("carrito", carritoSession);
                b = 1
                window.location = "cart.html"

            }
            i += 1
        }
        // En caso de no tener un producto igual (b==0), sumo nuevo producto al carrito 
        if (b == 0) {
            producto1.id = item
            producto1.name = infoProducto.name
            producto1.cost = infoProducto.cost
            producto1.currency = infoProducto.currency
            producto1.images = infoProducto.images
            producto1.cantidad = 1
            carritoSession.push(producto1)
            guardarEnSession("carrito", carritoSession)
            b = 1
            window.location = "cart.html"
        }
    }
}



function mostrarComentario(listaCom) {

    let coments = ""
    let estrella = ""
    for (let com of listaCom) {

        for (let i = 1; i <= 5; i++) {
            if (i <= com.score) {
                estrella += `
            <span class="fa fa-star checked"></span>
            `
            }
            else {
                estrella += `<span class="fa fa-star unchecked"></span>`
            }
        }

        coments +=
            `
            <tr class= "borde"> 
            <td class="datTD" > <b class="nmUS"> ${com.user} </b> - <i>${com.dateTime}</i> - ${estrella} <br> ${com.description}  </td> 
            </tr>
            `
        estrella = ""
    }
    document.getElementById("comentario").innerHTML = coments
}
//Funcion que obtiene el json del elemento relacionado
function bajarJson(id) {
    guardarEnSession("productID", id)
    let URLa = "https://japceibal.github.io/emercado-api/products/" + id + ".json"
    let URLb = "https://japceibal.github.io/emercado-api/products_comments/" + id + ".json"

    getJSONData(URLa).then(function (respuesta) {
        if (respuesta.status === "ok") {
            infoProducto = respuesta.data
            mostrarInfoProducto(infoProducto)
        }
    })
    getJSONData(URLb).then(function (respuesta) {
        if (respuesta.status === "ok") {
            comentarioProducto = respuesta.data
            mostrarComentario(comentarioProducto)
        }
    })
}
