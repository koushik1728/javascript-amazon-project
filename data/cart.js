export let cart = JSON.parse(localStorage.getItem('cart'));

console.log(cart);

if (!(cart.length)){
  cart = [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 6
  },{
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 5
  },{
    productId: "id1",
    quantity: 4
  }];
}

saveToStorage();

export function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(productId ,quantity){
  let matchingItem;
    
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId){
      matchingItem = cartItem;
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
    saveToStorage();
}

export function calculateCartQuantity(){
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity;
}

export function deleteInCart(productId){
  const newCart = [];
  cart.forEach(cartItem => {
    if (cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  calculateCartQuantity();
  saveToStorage();
}

export function updateQuantity(productId, newQuantity){
  if(newQuantity <=0 || newQuantity >= 100){
    return;
  }
  
  cart.forEach(cartItem => {
    if (cartItem.productId === productId){
      cartItem.quantity = Number(newQuantity);
    }
  });
  calculateCartQuantity();
  saveToStorage();
}