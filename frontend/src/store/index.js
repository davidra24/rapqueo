import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  //Data
  state: {
    categories: null,
    categorie: null,
    products: null,
    product: null,
    productsCategorie: null,
    productsNoCategorie: null,
    order: null,
    ordersUser: null,
    cart: null,
    openedCart: false,
    promos: null,
    promo: null,
    user: null,
    session: null,
    error: null,
  },
  getters: {
    getCountCart(state) {
      return state.cart ? state.cart.length : 0;
    },
    getCart(state) {
      return state.cart;
    },
    getPromosValidas(state) {
      var active = [];
      state.promos.forEach((promo) => {
        if (
          promo.producto.caracteristicas.cantidad > 0 &&
          validateFecha(promo.fechaInicio, promo.fechaFin)
        ) {
          active.push(promo);
        }
      });
      return active;
    },
    totalPriece(state) {
      var total = 0;
      if (state.cart) {
        state.cart.map((c) => {
          total += c.precio;
        });
      }
      return total;
    },
    estadoPedido(state) {
      return state.order.estado === 0
        ? 'Pendiente'
        : state.order.estado === 1
        ? 'En proceso'
        : 'Entregado';
    },
  },
  //Methods
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    setCategories(state, categories) {
      state.categories = categories;
    },
    setCategorie(state, categorie) {
      state.categorie = categorie;
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
    setProductsNoCategorie(state, productsNoCategorie) {
      state.productsNoCategorie = productsNoCategorie;
    },
    setOrder(state, order) {
      state.order = order;
    },
    setOrdersUser(state, ordersUser) {
      state.ordersUser = ordersUser;
    },
    setCart(state, cart) {
      state.cart = cart;
    },
    addCart(state, oneCart) {
      let added = false;
      if (!state.cart) {
        state.cart = [];
      }
      state.cart.map((item) => {
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
    },
    setUser(state, user) {
      state.user = user;
    },
    setSession(state, session) {
      state.session = session;
    },
  },
  actions: {
    setError({ commit }, error) {
      commit('setError', error);
    },
    setCategories({ commit }, categories) {
      commit('setCategories', categories);
    },
    setCategorie({ commit }, categorie) {
      commit('setCategorie', categorie);
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
    setOrder({ commit }, order) {
      commit('setOrder', order);
    },
    setOrdersUser({ commit }, ordersUser) {
      commit('setOrdersUser', ordersUser);
    },
    setProductsNoCategorie({ commit }, productsNoCategorie) {
      commit('setProductsNoCategorie', productsNoCategorie);
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
    },
    setUser({ commit }, user) {
      commit('setUser', user);
    },
    setSession({ commit }, session) {
      commit('setSession', session);
    },
  },
  modules: {},
});

export default store;

const validateFecha = (fechaInicio, fechaFin) => {
  var initialDate = new Date(fechaInicio);
  var finalDate = new Date(fechaFin);
  var actualDate = new Date();
  return (
    initialDate.getTime() < actualDate.getTime() &&
    finalDate.getTime() > actualDate.getTime()
  );
};
