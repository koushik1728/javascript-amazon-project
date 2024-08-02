import {cart, deleteInCart} from '../data/cart.js';
import {products} from '../data/products.js';
import {calculateCartQuantity, updateQuantity} from '../data/cart.js';
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


let cartQuantity;
function changeHeader(){
  cartQuantity = calculateCartQuantity();
  document.querySelector('.js-checkout-cart-quantity').innerHTML = `${cartQuantity} items`;
}
/* Displaying Cart Quantity in Header*/
changeHeader();
  


let cartSummaryHTML = '';


/* Cart items displayed */
cart.forEach((cartItem) => {
  
    const productId = cartItem.productId;
    
    
    let matchingProduct;
    
    products.forEach((product) => {
      if (product.id == productId){
        matchingProduct = product;
      }
    });
    

    cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
              <div class="delivery-date">
                Delivery date: Tuesday, June 21
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingProduct.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingProduct.name}
                  </div>
                  <div class="product-price">
                    $${((matchingProduct.priceCents)/100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label quantity-label-${matchingProduct.id}"
                        data-product-id = "${matchingProduct.id}">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-link " 
                      data-product-id = "${matchingProduct.id}">
                      Update
                    </span>
                    <input class = "quantity-input input-${matchingProduct.id}">
                    <span class = "save-quantity-link link-primary"  data-product-id = "${matchingProduct.id}">Save</span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id = "${matchingProduct.id}">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  <div class="delivery-option">
                    <input type="radio" checked
                      class="delivery-option-input"
                      name="delivery-option-${matchingProduct.id}">
                    <div>
                      <div class="delivery-option-date">
                        Tuesday, June 21
                      </div>
                      <div class="delivery-option-price">
                        FREE Shipping
                      </div>
                    </div>
                  </div>
                  <div class="delivery-option">
                    <input type="radio"
                      class="delivery-option-input"
                      name="delivery-option-${matchingProduct.id}">
                    <div>
                      <div class="delivery-option-date">
                        Wednesday, June 15
                      </div>
                      <div class="delivery-option-price">
                        $4.99 - Shipping
                      </div>
                    </div>
                  </div>
                  <div class="delivery-option">
                    <input type="radio"
                      class="delivery-option-input"
                      name="delivery-option-${matchingProduct.id}">
                    <div>
                      <div class="delivery-option-date">
                        Monday, June 13
                      </div>
                      <div class="delivery-option-price">
                        $9.99 - Shipping
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>`;

  });

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
changeHeader();

/* DELETE button in checkout */
document.querySelectorAll('.js-delete-link')
  .forEach(link => {
  link.addEventListener('click',()=>{
    const productId = link.dataset.productId;
    console.log(productId);
    deleteInCart(productId);
    const container = document.querySelector(`.js-cart-item-container-${productId}`)
    container.remove();
    
    changeHeader();
  });
});


document.querySelectorAll('.js-update-link')
  .forEach(link => {
  link.addEventListener('click',()=>{
    const productId = link.dataset.productId;
    console.log(productId);
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    container.classList.add('is-editing-quantity');
    //const container = document.querySelector(`.js-cart-item-container-${productId}`);
    //countCartQuantity();
  });
});

document.querySelectorAll('.save-quantity-link')
  .forEach((link) =>{
    link.addEventListener('click',()=>{
      const productId = link.dataset.productId;
      const inputElement = document.querySelector(
        `.input-${productId}`
      );
      
      console.log(inputElement.value);
      updateQuantity(productId,inputElement.value);
      document.querySelector(`.quantity-label-${productId}`).innerHTML = inputElement.value;


      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.remove('is-editing-quantity');
    
      changeHeader();
    });
  });

  
  document.querySelectorAll('.quantity-label')
    .forEach((label)=>{
      const productId = label.dataset.productId;
      const inputElement = document.querySelector(
        `.input-${productId}`
      );
      inputElement.addEventListener('keydown',(event)=>{
        if(event.key === 'Enter'){
          updateQuantity(productId,inputElement.value);
          document.querySelector(`.quantity-label-${productId}`).innerHTML = inputElement.value;


          const container = document.querySelector(`.js-cart-item-container-${productId}`);
          container.classList.remove('is-editing-quantity');
          changeHeader();
        }
      });
    });



const today = dayjs();
console.log(today)
const deliveryDate = today.add(7, 'days');
console.log(deliveryDate);
console.log(deliveryDate.format('dddd, D MMMM, YYYY'));