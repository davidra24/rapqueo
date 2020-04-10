<template style="height: 100%">
  <div id="app">
    <div class="page-container md-layout-column full-screen">
      <Navbar id="nav" />
      <CartSlider />
      <md-content class="md-scrollbar">
        <router-view class="app" />
      </md-content>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import CartSlider from "./components/cart/CartSlider";
import Navbar from "./components/navbar/navbar";
import { getCart } from "./util";
import "./styles/App.css";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";

import { mapActions } from "vuex";
import Vuelidate from "vuelidate";

import VueSweetalert2 from "vue-sweetalert2";

import vueCookies from "vue-cookies";

// If you don't need the styles, do not connect
import "sweetalert2/dist/sweetalert2.min.css";
import responsive from "vue-responsive";

Vue.use(responsive);
Vue.use(vueCookies);

Vue.$cookies.config("7d");
library.add([faShoppingCart, faUser]);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.config.productionTip = false;

Vue.use(VueSweetalert2);
Vue.use(Vuelidate);
// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
//Vue Material
Vue.use(VueMaterial);

export default {
  components: {
    Navbar,
    CartSlider
  },
  mounted() {
    this.loadCart();
  },
  methods: {
    ...mapActions(["closeCart", "setCart"]),
    close() {
      this.closeCart();
    },
    loadCart() {
      this.setCart(getCart());
    }
  }
};
</script>

<style lang="scss">
@import "node_modules/bootstrap/scss/bootstrap";
@import "node_modules/bootstrap-vue/src/index.scss";

#app {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.app {
  margin-top: 5%;
  overflow: auto;
  height: 100%;
  padding-bottom: 5%;
}
#nav {
  overflow: hidden;
  position: fixed; /* Set the navbar to fixed position */
  top: 0; /* Position the navbar at the top of the page */
  width: 100%; /* Full width */
  z-index: 999;
}
.page-container {
  min-height: 100%;
  max-height: 100%;
  overflow: hidden;
  position: relative;
  border: 1px solid rgba(#000, 0.12);
}
.full-screen {
  width: 100%;
  height: 100%;
}
.md-content {
  max-width: 100%;
  max-height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
