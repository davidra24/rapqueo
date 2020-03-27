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
  import CartSlider from "./components/cart/CartSlider";
  import Vue from "vue";
  import Navbar from "./components/navbar/navbar";
  import { getCart } from "./util";

  import VueMaterial from "vue-material";
  import "vue-material/dist/vue-material.min.css";
  import "vue-material/dist/theme/default.css";

  import { library } from "@fortawesome/fontawesome-svg-core";
  import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
  import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
  import { mapActions } from "vuex";
  import responsive from "vue-responsive";

  library.add([faShoppingCart, faUser]);
  Vue.component("font-awesome-icon", FontAwesomeIcon);
  Vue.config.productionTip = false;

  Vue.use(responsive);
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
    created() {
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
