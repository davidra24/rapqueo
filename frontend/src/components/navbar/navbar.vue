<template>
  <div>
    <div class="phone-viewport">
      <md-bottom-bar md-type="shift" :md-theme="'bottom-bar-' + theme">
        <b-navbar-nav class="ml-auto">
          <router-link class="no-link" to="/">
            <md-bottom-bar-item
              md-label="Inicio"
              md-icon="home"
              @click="theme = 'teal'"
            ></md-bottom-bar-item>
          </router-link>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <router-link class="no-link" to="/productos">
            <md-bottom-bar-item
              md-label="Productos"
              md-icon="pages"
              @click="theme = 'orange'"
            ></md-bottom-bar-item>
          </router-link>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <div class="md-toolbar-section-end">
            <md-bottom-bar-item
              md-label="Carrito"
              md-icon="shopping_cart"
              @click="slideCart()"
            ></md-bottom-bar-item>
          </div>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <router-link class="no-link" to="/usuario">
            <div v-if="logged">
              <md-bottom-bar-item md-label="Perfil" @click="theme = 'blue'">
                <md-avatar class="md-avatar-icon">
                  <img src="https://placeimg.com/40/40/people/1" alt="People" />
                </md-avatar>
              </md-bottom-bar-item>
            </div>
            <div v-else>
              <md-bottom-bar-item
                md-label="Perfil"
                md-icon="face"
                @click="theme = 'blue'"
              ></md-bottom-bar-item>
            </div>
          </router-link>
        </b-navbar-nav>
      </md-bottom-bar>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Navbar",
    props: {
      slider: Function
    },
    components: {},
    data() {
      return {
        logged: true,
        theme: "teal",
        items: this.countElements(),
        checkInterval: null,
        showSidepanel: false
      };
    },
    computed: {},
    created() {
      this.theme = this.validatePath();
    },
    methods: {
      slideCart() {
        if (this.slider) {
          this.slider();
        }
      },
      countElements() {
        return JSON.parse(localStorage.getItem("cart")).length;
      },
      validatePath() {
        switch (this.$router.path) {
          case "/":
            return "teal;";
          case "/productos":
            return "orange";
          case "/carrito":
            return "red";
          default:
            return "blue";
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
