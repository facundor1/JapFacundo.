const URL1 = "https://japceibal.github.io/emercado-api/cats_products/101.json"

document.addEventListener("DOMContentLoaded", function () {
    getJSONData(URL1).then(function (respuesta) {
        if (respuesta.status === "ok") {
            categoriaProducto = respuesta.data
            mostrarCategorias(categoriaProducto)
        }
    })
})

function mostrarCategorias(arreglo) {
    let nombreC = "Veras aquí todos los productos de la categoría" + " " + arreglo.catName
    document.getElementById("namCat").innerHTML = nombreC
    let row = "";
    for (let modelo of arreglo.products) {

        imag = `<img  src= ` + modelo.image + `> `
        row += `
                       <tr>
                       <td>  ${imag}  </td>
                       <td class= 'modelo'>  <b class="blac"> ${modelo.name} - ${modelo.currency} ${modelo.cost} </b> <br> ${modelo.description} </td>
                       <td class= "unida"> <b> Vendidos <br> ${modelo.soldCount} </b> </td> 
                       </tr>
                       `
    }
    document.getElementById("dataT").innerHTML = row
}