<template>
  <div>
    <div class="phone-viewport">
      <md-bottom-bar md-type="shift" :md-theme="'bottom-bar-' + theme">
        <b-navbar-nav class="ml-auto">
          <router-link class="no-link" to="/">
            <md-bottom-bar-item
              md-label="Inicio"
              md-icon="home"
              @click="theme = 'blue'"
            ></md-bottom-bar-item>
          </router-link>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <router-link class="no-link" to="/categorias">
            <md-bottom-bar-item
              md-label="Categorias"
              md-icon="pages"
              @click="theme = 'orange'"
            ></md-bottom-bar-item>
          </router-link>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <div class="md-toolbar-section-end">
            <md-badge :md-content="getCountCart">
              <md-bottom-bar-item
                md-label="Carrito"
                md-icon="shopping_cart"
                @click="
                  slideCart();
                  theme = 'teal';
                "
              ></md-bottom-bar-item>
            </md-badge>
          </div>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <!----->
          <div v-if="user" class="md-toolbar-section-end">
            <md-menu md-size="auto" md-align-trigger>
              <md-avatar
                v-if="user.foto"
                md-menu-trigger
                class="md-avatar-icon"
              >
                <img :src="user.foto" alt="People" />
              </md-avatar>
              <md-bottom-bar-item
                v-else
                md-menu-trigger
                :md-label="user.nombre"
                md-icon="account_circle"
              ></md-bottom-bar-item>
              <md-menu-content>
                <md-menu-item
                  >{{ user.nombre }} {{ user.apellido }}</md-menu-item
                >
                <md-menu-item>Perfil</md-menu-item>
                <md-menu-item>Mis pedidos</md-menu-item>
                <md-menu-item @click="cerrarSesion()"
                  >Cerrar Sesión</md-menu-item
                >
              </md-menu-content>
            </md-menu>
          </div>
          <div v-else class="md-toolbar-section-end">
            <md-menu md-size="auto" md-align-trigger>
              <md-bottom-bar-item
                md-menu-trigger
                md-label="usuario"
                md-icon="face"
              ></md-bottom-bar-item>
              <md-menu-content>
                <router-link class="no-link" to="/login">
                  <md-menu-item>Iniciar Sesión</md-menu-item>
                </router-link>
                <router-link class="no-link" to="/registro">
                  <md-menu-item>Registrarse</md-menu-item>
                </router-link>
              </md-menu-content>
            </md-menu>
          </div>
          <!----->
        </b-navbar-nav>
      </md-bottom-bar>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import { decrypt } from '../../util/utilCrypt';
export default {
  name: 'Navbar',
  props: {
    slider: Function
  },
  components: {},
  data() {
    return {
      theme: 'blue',
      checkInterval: null,
      showSidepanel: false,
      count: 0
    };
  },
  computed: {
    ...mapState(['openedCart', 'user', 'session']),
    ...mapGetters(['getCountCart'])
  },
  async mounted() {
    this.theme = await this.validatePath();
    if (!this.session) {
      await this.createSession();
    }
  },
  methods: {
    ...mapActions(['openCart', 'closeCart', 'setUser', 'setSession']),
    slideCart() {
      this.openedCart ? this.closeCart() : this.openCart();
    },
    validatePath() {
      switch (this.$route.path) {
        case '/':
          return 'blue';
        case '/productos':
          return 'orange';
        case '/carrito':
          return 'teal';
        default:
          return 'red';
      }
    },
    async createSession() {
      const localSession = (await this.$cookies.get('session'))
        ? await this.$cookies.get('session')
        : null;
      const localToken = (await this.$cookies.get('token'))
        ? await this.$cookies.get('token')
        : null;
      this.setSession(localSession);
      if (localSession && localToken) {
        const decryptedSession = JSON.parse(decrypt(localSession));
        this.setUser(decryptedSession);
      }
    },
    async cerrarSesion() {
      await this.$cookies.remove('session');
      await this.$cookies.remove('tokern');
      await this.setSession(null);
      await this.setUser(null);
      await this.$router.push('/');
    }
  }
};
</script>
<style lang="scss">
@import '~vue-material/dist/theme/engine';

@include md-register-theme(
  'bottom-bar-teal',
  (
    primary: md-get-palette-color(teal, A200)
  )
);

@include md-register-theme(
  'bottom-bar-orange',
  (
    primary: md-get-palette-color(orange, A200)
  )
);

@include md-register-theme(
  'bottom-bar-blue',
  (
    primary: md-get-palette-color(blue, A200),
    accent: md-get-palette-color(red, A200)
  )
);

@include md-register-theme(
  'bottom-bar-red',
  (
    primary: md-get-palette-color(red, A200)
  )
);

@import '~vue-material/dist/theme/all';
.md-content {
  max-width: 600px;
  max-height: 200px;
  overflow: auto;
}
</style>
