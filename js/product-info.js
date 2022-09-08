const URLinfo = "https://japceibal.github.io/emercado-api/products/" + extraerDeSession("productID") + ".json"
const URLComment = "https://japceibal.github.io/emercado-api/products_comments/" + extraerDeSession("productID") + ".json"


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
   
<p class="infoTit"> ${info.name} <p>
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

}

function mostrarComentario(listaCom) {

    let coments = ""
    let estrella = ""
    for (let com of listaCom) {
            
        for (let i = 1; i <= 5; i++){
            if (i<=com.score){
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
            estrella=""
    }
    document.getElementById("comentario").innerHTML = coments
}

