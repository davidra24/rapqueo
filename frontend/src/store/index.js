import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    categories: []
  },
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
      commit("setCategorie", categorie);
    },
    addAllcategories({ commit }, categories) {
      commit("setCategories", categories);
    },
    getCategories(state) {
      return state.categories;
    }
  },
  modules: {}
});
