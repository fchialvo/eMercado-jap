const URL = "https://japceibal.github.io/emercado-api/user_cart/";

function getHTML(product) {
  return `
    <div class="d-flex p-2 mb-2 bg-light">
        <img src="${product.image}" width = "130px" height="90px" alt="${product.name}">
        <div class="d-flex justify-content-between w-100" id="cartItem">
            <div class="d-flex flex-column gap-2 mx-2">
                <h4 class = "m-0">${product.name}</h4>
                <p >Costo: ${product.currency} ${product.unitCost}</p>
            </div>
            <div class="d-flex flex-column gap-2 mx-2">
                <label for="cantidad"><b>Cantidad</b></label>
                <input type="number" id = "cantidad" value = "${product.count}" min="1" style = "width :50px; height: 30px;">
            </div>
            <div class="d-flex flex-column gap-2 mx-2">
                <b>Subtotal </b>
                <p>USD <span id = "subtotalInput">${product.unitCost}</span></p>
            </div>
        </div>
    </div> 
    `;
}

document.addEventListener("DOMContentLoaded", async function () {
  const cart = document.querySelector("#carrito");
  //obtiene los datos del carrito
  const cartList = await getJSONData(URL + 25801 + EXT_TYPE);

  for (let cartItem of cartList.data.articles) {
    //Si el valor está en pesos, lo convierte a dólares
    if (cartItem.currency != "USD") {
      cartItem.unitCost *= 41;
      cartItem.currency = "USD";
    }
    //genera HTML del carrito, teniendo como argumento el item que nos da el URL.
    cart.innerHTML += getHTML(cartItem);

    const cantidadInput = document.getElementById("cantidad");
    const subtotalInput = document.getElementById("subtotalInput");
    const subtotalCosto = document.getElementById("subtotalCosto");
    const costoEnvio = document.getElementById("costoEnvio");
    const total = document.getElementById("total");
    let radios = document.getElementsByName("radio");

    //escucha cuando cambia la cantidad del articulo
    cantidadInput.addEventListener("change", (e) => {
      cantidad = e.target.value;
      let subtotal = cantidad * cartItem.unitCost;
      let envioPremium = parseInt(subtotal * 0.15);
      let envioExpress = parseInt(subtotal * 0.07);
      let envioStandard = parseInt(subtotal * 0.05);

      //calcula el costo de envio y el total al cambiar la cantidad
      for (let radio of radios) {
        if (radio.checked && radio.value == 0.15) {
          costoEnvio.innerHTML = envioPremium;
          total.innerHTML = envioPremium + subtotal;
        } else if (radio.checked && radio.value == 0.07) {
          costoEnvio.innerHTML = envioExpress;
          total.innerHTML = envioExpress + subtotal
        } else if(radio.checked && radio.value == 0.05){
          costoEnvio.innerHTML = envioStandard;
          total.innerHTML = envioStandard + subtotal
        }
        else{
          total.innerHTML = subtotal;
        }

        //calcula costo de envio y total al cambiar el radio seleccionado
        radio.addEventListener("input", () => {
          if (radio.checked && radio.value == 0.15) {
            costoEnvio.innerHTML = envioPremium;
            total.innerHTML = envioPremium + subtotal
          } else if (radio.checked && radio.value == 0.07) {
            costoEnvio.innerHTML = envioExpress;
            total.innerHTML = envioExpress+ subtotal
          } else if(radio.checked && radio.value == 0.05) {
            costoEnvio.innerHTML = envioStandard;
            total.innerHTML = envioStandard + subtotal
          }
          else{
            total.innerHTML = subtotal;
          }
        });
      }

      //valor de subtotal, en el articulo del carrito y en la parte de costos.
      subtotalInput.innerHTML = subtotal;
      subtotalCosto.innerHTML = subtotal;
    });
  }

  const radios = document.getElementsByName("radio");
  //valores por defecto de los costos, con los distintos radios seleccionados
  for (let radio of radios) {
    radio.addEventListener("input", () => {
      if (radio.checked && radio.value == 0.15) {
        costoEnvio.innerHTML = 2280;
        total.innerHTML = 2280 + 15200 
      } else if (radio.checked && radio.value == 0.07) {
        costoEnvio.innerHTML = 1064;
        total.innerHTML = 1064 + 15200 
      } else {
        costoEnvio.innerHTML = 760;
        total.innerHTML = 760 + 15200 
      }
    });
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
      "submit",(event) => {
        event.preventDefault();
        //si no están checkeados los campos de forma de pago, mostrar error
        if((!tCredito.checked && !tBancaria.checked)){
            errorFormaPago()
        }
        else{
          mensajeErrorPago.innerHTML = "";
        }
        
        if (form.checkValidity() == false) {
            event.preventDefault();
            event.stopPropagation();
            form.classList.add('was-validated');
          } else {
            Swal.fire(
                'Compra realizada!',
                '',
                'success'
              )
          }
        }
      ,false
    );
  });
})();

//error que se muestra al no seleccionar forma de pago
let mensajeErrorPago = document.getElementById("mensajeError")
function errorFormaPago(){
    mensajeErrorPago.innerHTML = `
        <p class="text-danger">Debe seleccionar una forma de pago.</p>
  `
}


//desactiva los campos de la opción no seleccionada
function disableTarjeta(){
    nTarjeta.disabled = true;
    cSeguridad.disabled = true;
    vencimiento.disabled = true;
    nCuenta.disabled = false;
}

function disableTBancaria(){
    nCuenta.disabled = true
    nTarjeta.disabled = false;
    cSeguridad.disabled = false;
    vencimiento.disabled = false;
}