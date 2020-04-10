export const addToCart = (item) => {
  let cart = localStorage.getItem("cart");
  if (!cart) {
    localStorage.setItem("cart", JSON.stringify([]));
  }
  cart = JSON.parse(localStorage.getItem("cart"));
  let added = false;
  cart.map((itemCart) => {
    if (itemCart.id === item.id) {
      itemCart.cantidad += item.cantidad;
      itemCart.precio += item.precio;
      added = true;
    }
  });
  if (!added) {
    cart.push(item);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const getCart = () => {
  return localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
};

export const deleteItemInCart = (id) => {
  let cart = localStorage.getItem("cart");
  if (cart) {
    const items = JSON.parse(cart);
    items.map((element, index) => {
      if (element.id === id) {
        items.splice(index, 1);
      }
    });
    cart = items;
  }
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Service worker
export const urlBase64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

export const subscription = async (uint8Array) => {
  const register = await navigator.serviceWorker.register("sw.js", {
    scope: "/",
  });
  return await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: uint8Array,
  });
};
