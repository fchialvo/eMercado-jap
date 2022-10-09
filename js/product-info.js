const URL = "";

function getHTML(product) {
  return `
    <div class="row">
    <div class = "border col-8">
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
      <div class = "col-4">
      <h2 class = "fs-2 fw-semibold">${product.name}</h2>
      <hr>
      <h4 class = "fw-bold">${product.currency} ${product.cost}</h4>
      <p class = "fs-6">${product.description}</p>
      <b>Categoría</b>
      <p class = "fs-6">${product.category}</p>
      <p class = "fs-6"><b>${product.soldCount} </b>vendidos</p>
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

function getRelatedProductsHTML(product) {
  return `
  <div class = "row">
    <div class="card mx-2 cursor-active" style="width: 18rem;" onclick="setProductID(${product.relatedProducts[0].id})">
            <img src="${product.relatedProducts[0].image}" class="card-img-top" alt="${product.relatedProducts[0].name}">
            <div class="card-body">
              <h5 class="card-title">${product.relatedProducts[0].name}</h5>
            </div>
    </div>
    <div class="card cursor-active" style="width: 18rem" onclick="setProductID(${product.relatedProducts[1].id})">
            <img src="${product.relatedProducts[1].image}" class="card-img-top" alt="${product.relatedProducts[1].name}">
            <div class="card-body">
              <h5 class="card-title">${product.relatedProducts[1].name}</h5>
            </div>
    </div>
  </div>
  `;
}

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
  console.log(producto);
  const productInfo = await getJSONData(URL);
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
  relacionados.innerHTML += getRelatedProductsHTML(productInfo.data);
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
