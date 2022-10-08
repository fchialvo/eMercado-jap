const URL = "https://japceibal.github.io/emercado-api/user_cart/";

function getHTML(product, subtotal){
    return `
    <div class = "cont">
    <h4>Mi carrito</h4> 
    <div class="border border-2 d-flex p-2 m-1">
        <img src="${product.image}" width = "125px" height="90px">
        <div class="d-flex justify-content-between w-100">
            <div class="d-flex flex-column gap-2 mx-2">
                <h4 class = "m-0">${product.name}</h4>
                <p >Costo: ${product.currency} ${product.unitCost}</p>
            </div>
            <div class="d-flex flex-column gap-2">
                <b>Cantidad</b>
                <input type="number" id = "cantidad" value = "${product.count}" style = "width :50px; height: 30px;">
            </div>
            <div class="d-flex flex-column gap-2">
                <b>Subtotal </b>
                <p id = "subtotal">${product.currency} ${product.unitCost} </p>
            </div>
        </div>
    </div> 
    </div>
    `;
}

document.addEventListener('DOMContentLoaded', async function() {
    const cart = document.querySelector('#carrito');
    const cartList = await getJSONData(URL + 25801 + EXT_TYPE);
    
    for(let cartItem of cartList.data.articles){     
        cart.innerHTML += getHTML(cartItem) 
        const cantidadInput = document.getElementById("cantidad");
        cantidadInput.addEventListener("change", (e) =>{
            cantidad = e.target.value;
            console.log(cantidad)
            let subtotal = cantidad * cartItem.unitCost;
            let subtotalInput = document.getElementById("subtotal");
            subtotalInput.innerHTML =cartItem.currency + " " + subtotal;
        })
    }
})


