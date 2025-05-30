import cart from "./cart.js";
import products from "./product.js";
let app = document.getElementById('app');
let temporaryContent = document.getElementById('temporaryContent');

//load template file
const loadtemplate = () =>{
    fetch('/template.html')
    .then(response => response.text())
    .then(html =>{
        app.innerHTML = html;
        let contentTab = document.getElementById('contentTab');
        contentTab.innerHTML = temporaryContent.innerHTML;
        temporaryContent.innerHTML = null;
        cart();
        initApp();
    })
}
loadtemplate();
const initApp = () => {
    //load list product
    let Featured = document.querySelector('.featured');
    products.innerHTML = null;
    products.forEach(product => {
        let newProduct = document.createElement("div");
        newProduct.classList.add('item');
        newProduct.innerHTML = 
        `
  <img src="${product.image}" alt="${product.name}"/>
  <h2>${product.name}</h2>
 <div class="price">$${product.price.toFixed(2)}</div> 
  <button class="addCart">
    Add To Cart
  </button>
`;
ListProduct.appendChild(newProduct)
cartTotal.textContent = total.toFixed(2);

  })
}