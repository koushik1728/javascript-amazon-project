import {cart} from '../data/cart.js';

import {products} from '../data/products.js';

let productsHTML = '';

/*
const products = [{
  image :'images/products/athletic-cotton-socks-6-pairs.jpg',
  name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',

  rating: {
    stars: 4.5,
    count: 87
  },
  priceCents: 1090
},{

  image: 'images/products/intermediate-composite-basketball.jpg',

  name: 'Intermediate Size Basketball',

  rating: {
    stars: 4.0,
    count: 127
  },

  priceCents: 2095

},{

  image: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',

  name: 'Adults Plain Cotton T-Shirt - 2 Pack',

  rating: {
    stars: 4.5,
    count: 56
  },

  priceCents: 799

},{
  image: 'images/products/black-2-slot-toaster.jpg',

  name : '2 Slot Toaster - Black',

  rating: {
    stars: 5,
    count: 2197
  },

  priceCents: 1899
}
];*/

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
            $${(product.priceCents / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
    
    
    let matchingItem;
    
    cart.forEach((item) => {
      if (productId === item.productId){
        matchingItem = item;
      }
    });
    
    
    if(matchingItem){
      matchingItem.quantity += quantity;
    }else{
      cart.push({
        //productId: productId,
        //quantity: quantity
        productId,
        quantity
      });}
      
      console.log(cart);
      
      let cartQuantity = 0;
      cart.forEach((item) => {
        cartQuantity += item.quantity;
      });
      
      
      document.querySelector('.js-cart-quantity').
      innerText = cartQuantity;
      console.log(`Cart Quantity: ${cartQuantity}`);
      
      
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