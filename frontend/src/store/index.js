import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  //Data
  state: {
    categories: null,
    products: null,
    product: null,
    productsCategorie: null,
    cart: null,
    openedCart: false,
    promos: null,
    promo: null,
    user: null,
    error: null
  },
  getters: {
    getCountCart(state) {
      return state.cart ? state.cart.length : 0;
    },
    getCart(state) {
      return state.cart;
    }
  },
  //Methods
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    setCategories(state, categories) {
      state.categories = categories;
    },
    setPromos(state, promos) {
      state.promos = promos;
    },
    setPromo(state, promo) {
      state.promo = promo;
    },
    setProducts(state, products) {
      state.products = products;
    },
    setProduct(state, product) {
      state.product = product;
    },
    setProductsCategorie(state, productsCategorie) {
      state.productsCategorie = productsCategorie;
    },
    setCart(state, cart) {
      state.cart = cart;
    },
    addCart(state, oneCart) {
      let added = false;
      if (!state.cart) {
        state.cart = [];
      }
      state.cart.map(item => {
        if (item.id === oneCart.id) {
          item.cantidad += oneCart.cantidad;
          item.precio += oneCart.precio;
          added = true;
        }
      });
      if (!added) {
        state.cart.push(oneCart);
      }
    },
    setOpenCart(state) {
      state.openedCart = true;
    },
    setCloseCart(state) {
      state.openedCart = false;
    }
  },
  actions: {
    setError({ commit }, error) {
      commit('setError', error);
    },
    setCategories({ commit }, categories) {
      commit('setCategories', categories);
    },
    setPromos({ commit }, promos) {
      commit('setPromos', promos);
    },
    setPromo({ commit }, promo) {
      commit('setPromo', promo);
    },
    setProducts({ commit }, products) {
      commit('setProducts', products);
    },
    setProduct({ commit }, product) {
      commit('setProduct', product);
    },
    setProductsCategorie({ commit }, productsCategorie) {
      commit('setProductsCategorie', productsCategorie);
    },
    setCart({ commit }, cart) {
      commit('setCart', cart);
    },
    addCart({ commit }, oneCart) {
      commit('addCart', oneCart);
    },
    openCart({ commit }) {
      commit('setOpenCart');
    },
    closeCart({ commit }) {
      commit('setCloseCart');
    }
  },
  modules: {}
});

export default store;
