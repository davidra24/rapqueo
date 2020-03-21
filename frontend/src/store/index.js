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
    cart: localStorage.getItem('cart'),
    promos: null,
    user: null,
    error: null,
    openCart: false
  },
  getters: {
    getCountCart(state) {
      return state.cart ? state.cart.lenght : 0;
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
    setProducts(state, products) {
      state.products = products;
    },
    setProduct(state, product) {
      state.product = product;
    },
    setProductsCategorie(state, productsCategorie) {
      state.productsCategorie = productsCategorie;
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
    setProducts({ commit }, products) {
      commit('setProducts', products);
    },
    setProduct({ commit }, product) {
      commit('setProduct', product);
    },
    setProductsCategorie({ commit }, productsCategorie) {
      commit('setProductsCategorie', productsCategorie);
    }
  },
  modules: {}
});

export default store;
