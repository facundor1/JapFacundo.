const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}
// Funciones que actualizan el local y el session storage.

function guardarEnSession (nombre, objeto) {
  let ab = JSON.stringify(objeto)
  sessionStorage.setItem(nombre,ab)
}
function elimDeSession(nombre) {
sessionStorage.removeItem(nombre)
}

function extraerDeSession (nombre) {
  let a =sessionStorage.getItem(nombre)
return JSON.parse(a)
}

function guardarEnLocal (nombre, objeto) {
  let ab = JSON.stringify(objeto)
  localStorage.setItem(nombre,ab)
}
function elimDeLocal (nombre) {
localStorage.removeItem(nombre)
}

function extraerDeLocal (nombre) {
  let a =localStorage.getItem(nombre)
return JSON.parse(a)
}
// 

// Sirve para colocar el e-mail en las páginas con el menu deplegable
document.addEventListener("DOMContentLoaded", function(){
  let NomUS = document.getElementById("MostUser")
  let desplegable= `<div class="btn-group">
  <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
    ${extraerDeSession("User")}
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
    <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
    <li><a class="dropdown-item" href="login.html" onclick="elimDeSession("User")">Cerrar Session</a></li>
  </ul>
</div>`
  NomUS.innerHTML= desplegable
})




