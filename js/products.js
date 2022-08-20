const URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";

function getHTML(product){
    return `
    <div class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="col-3">
                    <img src="${product.image}" alt="${product.name}" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${product.name}</h4>
                        <small class="text-muted">${product.soldCount} vendidos</small>
                    </div>
                    <p class="mb-1">${product.description}</p>
                </div>
            </div>
    </div>
    `;
}

document.addEventListener('DOMContentLoaded', async function() {
    const list = document.querySelector('#product-list-container');

    const productList = await getJSONData(URL);
    
    for(let product of productList.data.products){
        list.innerHTML += getHTML(product)
    }
})


