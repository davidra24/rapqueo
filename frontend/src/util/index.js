export const addToCart = item => {
  let cart = localStorage.getItem('cart');
  if (!cart) {
    localStorage.setItem('cart', JSON.stringify([]));
  }
  cart = JSON.parse(localStorage.getItem('cart'));
  cart.push(item);
  localStorage.setItem('cart', JSON.stringify(cart));
};
