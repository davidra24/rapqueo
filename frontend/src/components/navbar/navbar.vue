<template>
  <div>
    <div class="phone-viewport">
      <md-bottom-bar md-type="shift" :md-theme="'bottom-bar-' + theme">
        <b-navbar-nav class="ml-auto">
          <router-link class="no-link" to="/">
            <md-bottom-bar-item md-label="Inicio" md-icon="home" @click="theme = 'blue'"></md-bottom-bar-item>
          </router-link>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <router-link class="no-link" to="/categorias">
            <md-bottom-bar-item md-label="Categorias" md-icon="pages" @click="theme = 'orange'"></md-bottom-bar-item>
          </router-link>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <div class="md-toolbar-section-end">
            <md-badge :md-content="getCountCart">
              <md-bottom-bar-item md-label="Carrito" md-icon="shopping_cart" @click="slideCart()"></md-bottom-bar-item>
            </md-badge>
          </div>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <div v-if="logged">
            <md-menu md-size="auto" md-align-trigger>
              <md-bottom-bar-item md-menu-trigger md-label="Perfil" @click="theme = 'teal'">
                <md-avatar class="md-avatar-icon">
                  <img src="https://placeimg.com/40/40/people/1" alt="People" />
                </md-avatar>
              </md-bottom-bar-item>
              <md-menu-content class="row">
                <md-menu-item class="col-12" to="/usuario">Mi perfil</md-menu-item>
                <md-menu-item class="col-12" @click="cerrarSesion()">Cerrar Sesión</md-menu-item>
              </md-menu-content>
            </md-menu>
          </div>
          <div v-else>
            <md-menu md-size="auto" md-align-trigger>
              <md-bottom-bar-item md-label="Perfil" md-icon="face" @click="theme = 'teal'"></md-bottom-bar-item>
              <md-menu-content class="row">
                <md-menu-item class="col-12" to="/login">Iniciar sesión</md-menu-item>
                <md-menu-item class="col-12" to="/registro">Registro</md-menu-item>
              </md-menu-content>
            </md-menu>
          </div>
        </b-navbar-nav>
      </md-bottom-bar>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  name: "Navbar",
  props: {
    slider: Function
  },
  components: {},
  data() {
    return {
      logged: true,
      theme: "blue",
      checkInterval: null,
      showSidepanel: false,
      count: 0
    };
  },
  computed: {
    ...mapState(["openedCart"]),
    ...mapGetters(["getCountCart"])
  },
  mounted() {
    this.theme = this.validatePath();
  },
  methods: {
    ...mapActions(["openCart", "closeCart"]),
    slideCart() {
      this.openedCart ? this.closeCart() : this.openCart();
    },
    cerrarSesion() {
      this.logged = false;
    },
    countElements() {
      const el = JSON.parse(localStorage.getItem("cart"));
      this.count = el ? el.length : 0;
    },
    validatePath() {
      switch (this.$route.path) {
        case "/":
          return "blue";
        case "/productos":
          return "orange";
        case "/carrito":
          return "red";
        default:
          return "teal";
      }
    }
  }
};
</script>
<style lang="scss">
@import "~vue-material/dist/theme/engine";

@include md-register-theme(
  "bottom-bar-teal",
  (
    primary: md-get-palette-color(teal, A200)
  )
);

@include md-register-theme(
  "bottom-bar-orange",
  (
    primary: md-get-palette-color(orange, A200)
  )
);

@include md-register-theme(
  "bottom-bar-blue",
  (
    primary: md-get-palette-color(blue, A200),
    accent: md-get-palette-color(red, A200)
  )
);

@include md-register-theme(
  "bottom-bar-red",
  (
    primary: md-get-palette-color(red, A200)
  )
);

@import "~vue-material/dist/theme/all";
.md-content {
  max-width: 600px;
  max-height: 200px;
  overflow: auto;
}
</style>
