const URL1 = "https://japceibal.github.io/emercado-api/cats_products/" + extraerDeLocal("catID") + ".json"

let minValor = undefined
let maxValor = undefined
let search = undefined
document.addEventListener("DOMContentLoaded", function () {
    getJSONData(URL1).then(function (respuesta) {
        if (respuesta.status === "ok") {
            categoriaProducto = respuesta.data
            mostrarCategorias(categoriaProducto)


        document.getElementById("valAsc").addEventListener("click",function(){
            ordenarPorValorMay(categoriaProducto)
            mostrarCategorias(categoriaProducto)
        })
        document.getElementById("valDesc").addEventListener("click",function(){
            ordenarPorValorMen(categoriaProducto)
            mostrarCategorias(categoriaProducto)
        })
        document.getElementById("relevancia").addEventListener("click",function(){
            ordenarPorRelevancia(categoriaProducto)
            mostrarCategorias(categoriaProducto)
        })
        //buscador por palabras en tiempo real
        document.getElementById("search").addEventListener("input", function(){
         search= document.getElementById("search").value
         //transformar en minuscula la palabra
         search.toLowerCase()
         mostrarCategorias(categoriaProducto)
        })
        }
        //limpiar filtros
        document.getElementById("limpiar").addEventListener("click", function(){
            document.getElementById("filtromin").value = ""
            document.getElementById("filtromax").value = ""
            minValor= undefined 
            maxValor= undefined
            mostrarCategorias(categoriaProducto)
        })        
    })
})
//Función que muestra los productos
function mostrarCategorias(arreglo) {
    let nombreC = "Veras aquí todos los productos de la categoría" + " " + "<b>" + arreglo.catName + "</b>"
    document.getElementById("namCat").innerHTML = nombreC
    let row = "";
    for (let modelo of arreglo.products) {
        imag = `<img  src= ` + modelo.image + `> `
        a= modelo.name.toLowerCase()  
        // Esta linea filtra los datos del objeto segun el costo y las condiciones min y max
        if (!(modelo.cost > maxValor )&& !(modelo.cost < minValor)){
        // Filtrado de productos por palabras
        if (a.includes(search)||search== undefined || search == ""){
        row += `
                       <tr>
                       <td>  ${imag}  </td>
                       <td class= 'modelo'>  <b class="blac"> ${modelo.name} - ${modelo.currency} ${modelo.cost} </b> <br> ${modelo.description} </td>
                       <td class= "unida"> <b> Vendidos <br> ${modelo.soldCount} </b> </td> 
                       </tr>
                       `
        }}
    document.getElementById("dataT").innerHTML = row
    }}



// ordena de menor a mayor
function ordenarPorValorMen(lista) {
   lista.products.sort(function (a, b) {
        if (a.cost > b.cost) { return +1 }
        if (a.cost < b.cost) { return -1 }
        return 0
    }
    )
}

// ordena de mayor a menor
function ordenarPorValorMay(lista) {
    lista.products.sort(function (a, b) {
        if (a.cost < b.cost) { return +1 }
        if (a.cost > b.cost) { return -1 }
      return 0
    }
    )
}
//Ordena por relevancia (+ vendido primero)
function ordenarPorRelevancia(lista) {
    lista.products.sort(function (a, b) {
        if (a.soldCount < b.soldCount ) { return +1 }
        if (a.soldCount > b.soldCount ) { return -1 }
      return 0
    }
    )
}

// Esta funcion sirve para determinar los min y max como números. Robada de categories.
document.getElementById("filtro1").addEventListener("click", function () {
    minValor = document.getElementById("filtromin").value;
    maxValor = document.getElementById("filtromax").value

    if ((minValor != undefined) && (minValor != "") && (parseInt(minValor)) >= 0) {
        minValor = parseInt(minValor)
    }
    else {
        minValor = undefined
    }
    if ((maxValor != undefined) && (maxValor != "") && (parseInt(maxValor)) >= 0) {
        maxValor = parseInt(maxValor)
    }
    else {
        maxValor = undefined
    }
    mostrarCategorias(categoriaProducto)
}
) //Limpiar los filtros

