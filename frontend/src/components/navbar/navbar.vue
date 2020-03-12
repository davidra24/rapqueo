<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <router-link class="no-link" to="/">MercarChevere</router-link>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <router-link class="no-link" to="/categorias">Categorias</router-link>
        </b-navbar-nav>
        <b-navbar-nav>
          <router-link class="no-link" to="/productos">Productos</router-link>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <router-link class="no-link" to="/carrito" right>Carrito</router-link>
          <router-link class="no-link" to="/profile">Usuario</router-link>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {};
  },
  computed: {},
  created() {},
  methods: {}
};
</script>

<style scoped>
.no-link {
  color: white;
  padding: 1em;
}
</style>
