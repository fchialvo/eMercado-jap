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
                    <div class = "puntuaciones" style = "display: inline"> 
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

document.addEventListener("DOMContentLoaded", async function () {
  //Genero el html con la info del producto seleccionado, obtenida del URL que varía según el producto.
  const list = document.querySelector("#product-container");
  const producto = localStorage.getItem("productID");
  const URL = PRODUCT_INFO_URL + producto + EXT_TYPE;
  const productInfo = await getJSONData(URL);
  list.innerHTML += getHTML(productInfo.data);

  //Sección de comentarios
  const star = '<span class="fa fa-star"></span>';
  const starChecked = '<span class="fa fa-star checked"></span>';
  const comments = document.querySelector("#comments");
  const URL_COMMENTS = PRODUCT_INFO_COMMENTS_URL + producto + EXT_TYPE;
  const productInfo_comments = await getJSONData(URL_COMMENTS);
  for (let comment of productInfo_comments.data) {
    comments.innerHTML += getCommentsHTML(comment); //Imprimir comentarios
  }

  let puntuaciones = document.getElementsByClassName("puntuaciones"); //Donde van a ir las puntuaciones de los comentarios
  let index = 0;
  for (let puntuacion of puntuaciones) {
    index++;
    let score = productInfo_comments.data[index - 1].score; //Obtengo la puntuación del comentario
    puntuacion.innerHTML = starChecked.repeat(score); //Repito la estrella completa según la puntuación
  }

  index = 0;
  for (let puntuacion of puntuaciones) {
    //Vuelvo a recorrer las puntuaciones, esta vez para colocar las estrellas sin rellenar
    index++;
    let score = productInfo_comments.data[index - 1].score;
    if (score < 5) {
      for (let i = score; i < 5; i++) {
        //Recorro los puntos que restan para llegar a 5
        puntuacion.innerHTML += star; //Agrego las estrellas correspondientes
      }
    }
  }
});
