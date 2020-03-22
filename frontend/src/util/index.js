export const addToCart = item => {
  let cart = localStorage.getItem('cart');
  if (!cart) {
    localStorage.setItem('cart', JSON.stringify([]));
  }
  cart = JSON.parse(localStorage.getItem('cart'));
  let added = false;
  cart.map(itemCart => {
    if (itemCart.id === item.id) {
      itemCart.cantidad += item.cantidad;
      itemCart.precio += item.precio;
      added = true;
    }
  });
  if (!added) {
    cart.push(item);
  }
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const getCart = () => {
  return localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : [];
};

export const deleteItemInCart = id => {
  let cart = localStorage.getItem('cart');
  if (cart) {
    const items = JSON.parse(cart);
    items.map(element => {
      if (element.id === id) {
        items.splice(element);
      }
    });
    cart = items;
  }
  return cart;
};
