const URL = "https://japceibal.github.io/emercado-api/user_cart/";

function getHTML(product) {
  return `
    <div class="d-flex p-2 mb-2 bg-light" id="${product.id}">
        <img src="${product.image}" width = "130px" height="90px" alt="${product.name}">
        
        <div class="d-flex justify-content-between w-100" id="cartItem" style="  position:relative;">
            <div class="d-flex flex-column gap-2 mx-2">
              <div class="d-flex">
                  <h5 class = "m-0" id="nombreProducto">${product.name}</h5>
                  <i class="fas fa-trash-alt fa-lg borrarItem" onclick="borrarItem(${product.id})"></i>
              </div>
                <p >Costo: ${product.currency} ${product.unitCost}</p>
            </div>
            <div class="d-flex flex-column gap-2 mx-2">
                <label for="cantidad"><b>Cantidad</b></label>
                <input type="number" class = "cantidad" value = "${product.count}" min="1" style = "width :50px; height: 30px;">
            </div>
            <div class="d-flex flex-column gap-2 mx-2">
                <b>Subtotal </b>
                <p>USD <span class = "subtotalInput">${product.unitCost}</span></p>
            </div>
             <div class="d-flex flex-column justify-content-center gap-2 mx-2">
            </div>
        </div>
    </div> 
    `;
}

document.addEventListener("DOMContentLoaded", async function() {
  const cart = document.querySelector("#carrito");
  //obtiene los datos del carrito
  const cartList = await getJSONData(URL + 25801 + EXT_TYPE);
  const cartProducts = JSON.parse(localStorage.getItem("cart")) || []; //obtiene carrito guardado en localStorage, si no existe lo crea

  cartProducts.push(cartList.data.articles[0]); //suma el producto que viene por defecto al carrito

  for (let cartItem of cartProducts) {
    //Si el valor está en pesos, lo convierte a dólares
    if (cartItem.currency != "USD") {
      cartItem.unitCost = parseInt(cartItem.unitCost * 0.03);
      cartItem.currency = "USD";
    }
    cart.innerHTML += getHTML(cartItem);
  }

  const cantidadInputs = document.getElementsByClassName("cantidad");
  const subtotalInputs = document.getElementsByClassName("subtotalInput");
  const subtotalCosto = document.getElementById("subtotalCosto");
  const costoEnvio = document.getElementById("costoEnvio");
  const total = document.getElementById("total");
  let radios = document.getElementsByName("radio");

  for (let i = 0; i < cantidadInputs.length; i++) {
    //escucha cuando cambia la cantidad del articulo
    cantidadInputs[i].addEventListener("change", (e) => {
      cantidad = e.target.value;
      let subtotal = cantidad * cartProducts[i].unitCost; //calcula el subtotal individual de ese articulo

      subtotalInputs[i].innerHTML = subtotal;

      calcularSubtotal(); // calcula el subtotal final, la suma de todos los subtotales
      for(let radio of radios){
        calcularEnvio(radio)//calcula el precio del envio dependiendo del radio seleccionado
      }
    });

    
    function calcularSubtotal(){
      let subtotalFinal = 0;
      for (let i = 0; i < subtotalInputs.length; i++) {
        subtotalFinal += parseInt(subtotalInputs[i].innerHTML);
        subtotalCosto.innerHTML = subtotalFinal.toLocaleString();
        total.innerHTML = subtotalFinal.toLocaleString();
      }
      return subtotalFinal;
    }

    calcularSubtotal();

    function calcularEnvio(radio){
      let subtotal = calcularSubtotal();
      let envioPremium = parseInt(subtotal * 0.15);
      let envioExpress = parseInt(subtotal * 0.07);
      let envioStandard = parseInt(subtotal * 0.05);

      if (radio.checked && radio.value == 0.15) {
        costoEnvio.innerHTML = envioPremium.toLocaleString();
        total.innerHTML = (envioPremium + subtotal).toLocaleString();
      } else if (radio.checked && radio.value == 0.07) {
        costoEnvio.innerHTML = envioExpress.toLocaleString();
        total.innerHTML = (envioExpress + subtotal).toLocaleString();
      } else if(radio.checked && radio.value == 0.05){
        costoEnvio.innerHTML = envioStandard.toLocaleString();
        total.innerHTML = (envioStandard + subtotal).toLocaleString();
      }
    }
    
      for (let radio of radios) {
        calcularEnvio(radio);

        //calcula costo de envio al cambiar el radio seleccionado
        radio.addEventListener("input", () => {
          calcularEnvio(radio);
        })
      }
        
  }
});

const nTarjeta = document.getElementById("nTarjeta");
const cSeguridad = document.getElementById("cSeguridad");
const vencimiento = document.getElementById("vencimiento");
const nCuenta = document.getElementById("nCuenta");
const tCredito = document.getElementById("tCredito");
const tBancaria = document.getElementById("tBancaria");


// validación del form, código de Bootstrap
(() => {
  "use strict";

  // Traer los formularios a los que queremos aplicar validación
  const forms = document.querySelectorAll(".needs-validation");

  // Recorrerlos y evitar que se envíen
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();
        //si no están checkeados los campos de forma de pago, mostrar error
        if (!tCredito.checked && !tBancaria.checked) {
          errorFormaPago();
        } else {
          mensajeErrorPago.innerHTML = "";
        }

        if (form.checkValidity() == false) {
          event.preventDefault();
          event.stopPropagation();
          form.classList.add("was-validated");
        } else {
          Swal.fire("Compra realizada!", "", "success");
        }
      },
      false
    );
  });
})();

//error que se muestra al no seleccionar forma de pago
let mensajeErrorPago = document.getElementById("mensajeError");
function errorFormaPago() {
  mensajeErrorPago.innerHTML = `
        <p class="text-danger">Debe seleccionar una forma de pago.</p>
  `;
}

//funcion que elimina un item seleccionado del carrito
function borrarItem(id){
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart = cart.filter(cartItem => cartItem.id != id);
    localStorage.setItem("cart", JSON.stringify(cart));
    
    location.reload();
}



//desactiva los campos de la opción no seleccionada
function disableTarjeta() {
  nTarjeta.disabled = true;
  cSeguridad.disabled = true;
  vencimiento.disabled = true;
  nCuenta.disabled = false;
}

function disableTBancaria() {
  nCuenta.disabled = true;
  nTarjeta.disabled = false;
  cSeguridad.disabled = false;
  vencimiento.disabled = false;
}

//previene que se envie el formulario al presionar Enter.
document.getElementById("form").addEventListener("keypress", (e) => {
  var key = e.key || e.code || 0;
  if (key == "Enter") {
    e.preventDefault();
  }
});
