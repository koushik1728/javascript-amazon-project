import {cart, addToCart} from '../data/cart.js';

import {products} from '../data/products.js';

import {moneyFormat} from './utils/money.js';

let productsHTML = '';



products.forEach((product,index) => {
  productsHTML = productsHTML + `
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${moneyFormat(product.priceCents)}
          </div>

          <div class="product-quantity-container ">
            <select class="js-select-drop-down-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
            data-product-id = "${product.id}"
          >
            Add to Cart
          </button>
        </div>
  `
});



//console.log(productsHTML);

document.querySelector('.js-products-grid').innerHTML = productsHTML;





function updateCartQuantity(){
  let cartQuantity = 0;
      cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      });
      
      
      document.querySelector('.js-cart-quantity').
      innerText = cartQuantity;
      console.log(`Cart Quantity: ${cartQuantity}`);
}

let timeOut;

document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  
  button.addEventListener('click', () => {
    if(timeOut){
    clearTimeout(timeOut);
    }
    /*const productId = button.dataset.productId; */ // words after data- (kebab case) converted to camel case;
    
    const {productId} = button.dataset;
    const selectorElement =  document.querySelector(`.js-select-drop-down-${productId}`);
    
    
    
    const quantity = Number(selectorElement.value);
    
    addToCart(productId ,quantity);
    updateCartQuantity();
      
      
      
      //changing added element
      
      const addedElement = document.querySelector( `.js-added-to-cart-${productId}`);
      addedElement.classList.add('added-to-cart-visible');
      
      //addedElement.innerText = `Added: ${quantity}`;
      
      timeOut = setTimeout(() => {
        addedElement.classList.remove('added-to-cart-visible');
      },1000);
      
    });
  }); //Error: querySelectorALL is not function
  //      querySelectorAll is.