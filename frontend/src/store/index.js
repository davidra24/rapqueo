import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  //Data
  state: {
    categories: [],
    products: [],
    cart: [],
    promos: [],
    user: null
  },
  getters: {
    getCategories(state) {
      return state.categories;
    },
    getCountCart(state) {
      return state.cart.length;
    }
  },
  //Methods
  mutations: {
    setCategories(state, categories) {
      state.categories = categories;
    },
    setCategorie(state, categorie) {
      state.categories.push(categorie);
    }
  },
  actions: {
    addCategorie({ commit }, categorie) {
      commit('setCategorie', categorie);
    },
    addAllcategories({ commit }, categories) {
      commit('setCategories', categories);
    },
    getCategories(state) {
      return state.categories;
    }
  },
  modules: {}
});

export default store;
