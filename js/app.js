// fetch the url
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {

  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {

    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("card", "shadow", "card-css");
    div.innerHTML = `
                      <div class="single-product">
                      <img class="product-image p-4" src=${image}></img>
                       <div class="card-style p-4">
                       <h4>${product.title.slice(0, 36)}</h4>
                       <p>Category: ${product.category}</p>
                       <span><i class="fas fa-star"></i> ${product.rating.rate}</span>
                       <span class="ms-4"><i class="fas fa-users"></i> ${product.rating.count}</span>
                       <h4 class="mb-3 mt-3">Price: $ ${product.price}</h4>
                       <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-secondary">Add to cart</button>
                      <button id="details-btn" class="btn btn-dark"  data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="getDetails('${product.id}')">Details</button></div>
                      </div>`;

    document.getElementById("all-products").appendChild(div);
  }
};

// calculate total price
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
  localStorage.setItem(id, price);
};

const getInputValue = (id) => { // get input value funciton
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element)
  return converted;
};


// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = parseFloat(total).toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.abs((value).toFixed(2));
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");

  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

// find the product with id
const getDetails = productId => {
  fetch(`https://fakestoreapi.com/products/${productId}`)
    .then(res => res.json())
    .then(data => showDetails(data))
};

// show the product details in modal
const modalInfo = document.getElementById('modal-info');
const showDetails = data => {
  modalInfo.textContent = "";
  const div = document.createElement('div');
  div.innerHTML = `<div>
                    <h2> ${data.title}</h2>
                    <img src="${data.image}" style="margin-left:25%; margin-top:30px; margin-bottom:20px" width="200px">
                    <p>${data.description}</p>
                    </div>`
  modalInfo.appendChild(div)
  document.getElementById('modal-button').style.display = "block";
};

document.getElementById('purchase-btn').addEventListener('click', () => {
  const div = document.createElement('div');
  modalInfo.textContent = "";
  div.innerHTML = `
                 <div class="d-flex justify-content-center mb-3" style="font-size:43px; color:rgb(16, 65, 65)">
                 <i class="fas fa-smile-beam"></i> 
                 </div>              
                 <h6>Dear Sir , Thanks for your order . We delevery this product as soon as posible. Stay connect with us .</h6>`
  modalInfo.appendChild(div);
  document.getElementById('modal-button').style.display = "none";
  document.getElementById('purchase-btn').setAttribute("disabled", true);
})

// local storage
