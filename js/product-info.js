const URL = "";

function getHTML(product) {
  return `
    <div class="row">
    <div class = "border col-md-8 col-sm-12">
        <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
          <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="${product.images[0]}" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src="${product.images[1]}" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src="${product.images[2]}" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src="${product.images[3]}" class="d-block w-100" alt="...">
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div class = "col-md-4 col-sm-12 mt-3 mt-md-0">
      <h2 class = "fs-2 fw-semibold">${product.name}</h2>
      <hr>
      <h4 class = "fw-bold">${product.currency} ${product.cost}</h4>
      <p class = "fs-6">${product.description}</p>
      <b>Categoría</b>
      <p class = "fs-6">${product.category}</p>
      <p class = "fs-6"><b>${product.soldCount} </b>vendidos</p>
      <button type="button" id="comprar" class="btn btn-success">Comprar</button>
      </div>     
  </div>
  `;
}

function getCommentsHTML(product) {
  return `
  <div class="card m-2" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">${product.user}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${product.dateTime}</h6>
      <p class="card-text">${product.description}</p>
      <div> 
      ${showStars(product.score)}
      </div>
    </div>
  </div>
  `;
}

function getRelatedProductsHTML(relatedProduct) {
  return `
    <div class="card mx-2 cursor-active" style="width: 18rem;" onclick="setProductID(${relatedProduct.id})">
            <img src="${relatedProduct.image}" class="card-img-top" alt="${relatedProduct.name}">
            <div class="card-body">
              <h5 class="card-title">${relatedProduct.name}</h5>
            </div>
    </div>
  `;
}

//funcion que genera el puntaje en formato de estrellas
function showStars(puntaje) {
  const star = '<span class="fa fa-star"></span>';
  const starChecked = '<span class="fa fa-star checked"></span>';
  let completos = Math.floor(puntaje);
  let estrellas = "";
  for (let i = 0; i < completos; i++) {
    estrellas += starChecked;
  }

  if (completos < 10) {
    for (let i = completos; i < 5; i++) {
      estrellas += star;
    }
    return estrellas;
  }
}
document.addEventListener("DOMContentLoaded", async function () {
  //Genero el html con la info del producto seleccionado, obtenida del URL que varía según el producto.
  const list = document.querySelector("#product-container");
  const producto = localStorage.getItem("productID");
  const URL = PRODUCT_INFO_URL + producto + EXT_TYPE;
  const productInfo = await getJSONData(URL);
  productInfo.data["count"] = 1;
  list.innerHTML += getHTML(productInfo.data);

  //Sección de comentarios
  const comments = document.querySelector("#comments");
  const URL_COMMENTS = PRODUCT_INFO_COMMENTS_URL + producto + EXT_TYPE;
  const productInfo_comments = await getJSONData(URL_COMMENTS);
  for (let comment of productInfo_comments.data) {
    comments.innerHTML += getCommentsHTML(comment); //Imprimir comentarios
  }

  //Productos relacionados
  const relacionados = document.querySelector("#relatedProducts");
  for(let product of productInfo.data.relatedProducts){
    relacionados.innerHTML += getRelatedProductsHTML(product);
  }
  //Accion que se realiza al clickear el botón de comprar 
  const btnComprar = document.getElementById("comprar");
  btnComprar.addEventListener("click",()=>{
    Swal.fire("Producto agregado al carrito!", "", "success");
    //array de productos del carrito, que se guardan en localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    //modificar el objeto para que coincida con el formato de los objetos del carrito
    const objetoComprado = {};
    delete Object.assign(objetoComprado, productInfo.data, {["unitCost"]: productInfo.data["cost"] })["cost"];
    delete Object.assign(objetoComprado, productInfo.data, {["image"]: productInfo.data["images"][0] })["images"];
    delete objetoComprado["relatedProducts"]
    delete objetoComprado["description"]
    delete objetoComprado["category"]
    delete objetoComprado["soldCount"]
    delete objetoComprado["cost"]
    productInfo.data.count++;


    //Si el objeto ya se encuentra en el localStorage, lo borra e ingresa el nuevo para que no se repitan
    cart.forEach(cartProduct => {
        if(cartProduct.id == objetoComprado.id){
          cart.splice(cart.indexOf(cartProduct), 1);
        }
    });
    cart.push(objetoComprado)
    localStorage.setItem("cart", JSON.stringify(cart))  //vuelve a guardar el array del carrito en localStorage
  })
});

const btnEnviar = document.getElementById("enviar");
const userComment = document.getElementById("userComment");
const select = document.getElementById("userScore");
btnEnviar.addEventListener("click", () => {
  let selectedOption = select.options[select.selectedIndex].value;
  let hoy = new Date();
  // obtener la fecha
  let fecha = hoy.toISOString().slice(0, 10);
  //obtener la hora
  let hora = hoy.toLocaleTimeString();
  const comments = document.querySelector("#comments");
  
  //se genera el comentario
  comments.innerHTML += `
  <div class="card m-2" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">${localStorage.getItem("usuario")}</h5>
      <h6 class="card-subtitle mb-2 text-muted"> ${fecha}  ${hora}</h6>
      <p class="card-text">${userComment.value}</p>
      <div> 
      ${showStars(selectedOption)}
      </div>
    </div>
  </div>
   `;
});


