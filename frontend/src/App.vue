<template style="height: 100%">
  <div id="myapp">
    <div class="page-container md-layout-column full-screen">
      <Navbar id="nav" />
      <CartSlider />
      <md-content class="md-scrollbar">
        <div v-responsive="['hidden-all', 'xs']">
          <router-view class="app_responsive" />
        </div>
        <div v-responsive="['hidden-xs']">
          <router-view class="app" />
        </div>
      </md-content>
    </div>
  </div>
</template>

<script>
//Vue
import Vue from "vue";

//Components
import CartSlider from "./components/cart/CartSlider";
import Navbar from "./components/navbar/navbar";

//Styles
import "./styles/App.css";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
import "sweetalert2/dist/sweetalert2.min.css";

//Libraries
import VueFab from "vue-float-action-button";
import VueSweetalert2 from "vue-sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faShoppingCart,
  faUser,
  faMoneyBillWave,
  faCreditCard,
  faPlusCircle,
  faCamera,
  faSyncAlt,
  faCheck,
  faShippingFast,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import VueMaterial from "vue-material";
import responsive from "vue-responsive";

//Data
import { getCart } from "./util";
import { mapActions } from "vuex";
import Vuelidate from "vuelidate";
import vueCookies from "vue-cookies";

Vue.use(VueFab, { iconType: "MaterialDesign" });
Vue.use(responsive);
Vue.use(vueCookies);

Vue.$cookies.config("7d");

library.add([
  faShoppingCart,
  faUser,
  faMoneyBillWave,
  faCreditCard,
  faPlusCircle,
  faCamera,
  faSyncAlt,
  faCheck,
  faShippingFast,
  faEnvelope
]);
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
    this.$material.locale = {
      startYear: 2020,
      endYear: 2099,
      dateFormat: "yyyy-MM-dd",
      days: [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado"
      ],
      shortDays: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
      shorterDays: ["D", "L", "M", "Mi", "J", "V", "S"],
      months: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
      ],
      shortMonths: [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic"
      ],
      shorterMonths: [
        "En",
        "Fe",
        "Ma",
        "Ab",
        "My",
        "Jn",
        "Jl",
        "Ag",
        "Se",
        "Oc",
        "No",
        "Di"
      ],
      firstDayOfAWeek: 0
    };
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

#myapp {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  position: fixed;
}
.app_responsive {
  margin-top: 18%;
  overflow: hidden;
  height: 100%;
  padding-bottom: 5%;
  margin-left: auto;
  margin-right: auto;
}
.app {
  margin-top: 5%;
  overflow: hidden;
  height: 100%;
  padding-bottom: 5%;
  margin-left: auto;
  margin-right: auto;
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
