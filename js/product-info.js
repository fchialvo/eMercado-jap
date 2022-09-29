const URL = "";

function getHTML(product) {
  return `
    <div class="row">
        <div class="col py-3"><h2>${product.name}</h2>
        </div>
        <hr>
        <b>Precio</b><br>
        <p>${product.currency} ${product.cost}</p><br>
        <b>Descripción</b><br>
        <p>${product.description}</p><br>
        <b>Categoría</b><br>
        <p>${product.category}</p><br>
        <b>Cantidad de vendidos</b><br>
        <p>${product.soldCount}</p><br>
        <b class = "pb-2">Imágenes ilustrativas</b><br>
        <div class="col-3"><img src="${product.images[0]}" width = "270px" alt=""></div>
        <div class="col-3"><img src="${product.images[1]}" width = "270px" alt=""></div>
        <div class="col-3"><img src="${product.images[2]}" width = "270px" alt=""></div>
        <div class="col-3"><img src="${product.images[3]}" width = "270px" alt=""></div>
    </div>
    `;
}

function getCommentsHTML(product) {
  return `
    <div class="card card-white post ps-2 pt-2">  
        <div class="post-heading">
            <div class="float-left meta">
                <div class="title h6">
                    <b>${product.user}</b>
                    - ${product.dateTime} -
                    <div> 
                      ${showStars(product.score)}
                    </div>
                </div>
                </div>
            </div>
            <div class="post-description">
                <p>${product.description}</p>
            </div>
    </div>  
    `;
}

function getRelatedProductsHTML(product){
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
  `
}

function showStars (puntaje) {
  const star = '<span class="fa fa-star"></span>';
  const starChecked = '<span class="fa fa-star checked"></span>';
  let completos = Math.floor(puntaje);
  let estrellas ='';
  for (let i = 0; i < completos; i++) {
  estrellas += starChecked      
  }

  if (completos < 10) {
      for (let i = completos; i < 5; i++) {
         estrellas += star   
 } 
  return estrellas
}
}
document.addEventListener("DOMContentLoaded", async function () {
  //Genero el html con la info del producto seleccionado, obtenida del URL que varía según el producto.
  const list = document.querySelector("#product-container");
  const producto = localStorage.getItem("productID");
  const URL = PRODUCT_INFO_URL + producto + EXT_TYPE;
  console.log(producto)
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

const btnEnviar = document.getElementById("enviar")
const userComment = document.getElementById("userComment");
const select = document.getElementById("userScore")
btnEnviar.addEventListener("click", ()=>{
  let selectedOption = select.options[select.selectedIndex].value;
  let hoy = new Date();
  // obtener la fecha
  let fecha = hoy.toISOString().slice(0,10);
  //obtener la hora
  let hora = hoy.toLocaleTimeString();
  const comments = document.querySelector("#comments");
  comments.innerHTML += 
  `<div class="card card-white post ps-2 pt-2">  
      <div class="post-heading">
          <div class="float-left meta">
              <div class="title h6">
                  <b>${localStorage.getItem("usuario")}</b>- ${fecha} - ${hora}
                <div> 
                  ${showStars(selectedOption)}
                </div>
              </div>
            </div>
        </div>
        <div class="post-description">
          <p>${userComment.value}</p>
        </div>
    </div> `
})

