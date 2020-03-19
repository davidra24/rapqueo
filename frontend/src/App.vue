<template>
  <div id="app">
    <div class="page-container md-layout-column">
      <Navbar id="nav" :slider="changeSlide" />
      <CartSlider :showSidepanel="showSidepanel" />
      <router-view class="app" />
    </div>
  </div>
</template>

<script>
  import CartSlider from "./components/cart/CartSlider";
  import Vue from "vue";
  import Navbar from "./components/navbar/navbar";

  import VueMaterial from "vue-material";
  import "vue-material/dist/vue-material.min.css";
  import "vue-material/dist/theme/default.css";

  import { library } from "@fortawesome/fontawesome-svg-core";
  import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
  import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

  library.add([faShoppingCart, faUser]);
  Vue.component("font-awesome-icon", FontAwesomeIcon);
  Vue.config.productionTip = false;

  // Install BootstrapVue
  Vue.use(BootstrapVue);
  // Optionally install the BootstrapVue icon components plugin
  Vue.use(IconsPlugin);
  //Vue Material
  Vue.use(VueMaterial);

  export default {
    data() {
      return {
        showSidepanel: false
      };
    },
    components: {
      Navbar,
      CartSlider
    },
    created() {},
    watch: {},
    methods: {
      changeSlide() {
        this.showSidepanel = !this.showSidepanel;
      }
    }
  };
</script>

<style>
  #app {
    font-family: "Roboto", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .app {
    margin-top: 50px;
  }
  #nav {
    overflow: hidden;
    position: fixed; /* Set the navbar to fixed position */
    top: 0; /* Position the navbar at the top of the page */
    width: 100%; /* Full width */
    z-index: 999;
  }
  .page-container {
    min-height: 300px;
    overflow: hidden;
    position: relative;
    border: 1px solid rgba(#000, 0.12);
  }
</style>
