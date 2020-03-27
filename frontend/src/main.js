import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap-vue/dist/bootstrap-vue";
import blur from "@/directives/blur";

Vue.config.productionTip = false;
Vue.use(blur);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
