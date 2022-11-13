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

//espacio para mostrar nombre de usuario en el navbar
const display = document.getElementById("usuario");

//capturar el email que se ingresó en el login
let usuario = localStorage.getItem("usuario");

//generar el dropdown con el nombre de usuario de manera dinamica
display.innerHTML = `
<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    ${usuario}
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><a class="dropdown-item" href="cart.html">Mi Carrito</a></li>
    <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
    <li><a class="dropdown-item" href="index.html" onclick = "borrarUsuario()">Cerrar sesión</a></li>
  </ul>
</div>
`

function borrarUsuario(){
  localStorage.removeItem("usuario");
  localStorage.removeItem("profile-pic")
}

function setProductID(id) {
  localStorage.setItem("productID", id);
  window.location = "product-info.html"
}
