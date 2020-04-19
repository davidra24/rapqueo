<template>
  <div>
    <br />
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h2>
            <strong>PRODUCTOS</strong>
          </h2>
          <div class="row">
            <div
              class="col-12 col-md-6 col-lg-4"
              style="margin-bottom: 2%; cursor: pointer;"
              v-for="product in products"
              :key="product._id"
              @click="goProduct(product._id)"
            >
              <md-card style="min-width: 50%; max-width: 100%;">
                <md-card-header>
                  <md-card-header-text>
                    <h6>
                      <strong>{{ product.nombre }}</strong>
                    </h6>
                    <div
                      class="md-subhead"
                    >{{ product.caracteristicas.peso }} {{ product.caracteristicas.unidad }}</div>
                    <br />
                    <div>${{ product.caracteristicas.precio }}</div>
                  </md-card-header-text>
                  <md-card-media md-big>
                    <img
                      class="img-fluid resize-img"
                      v-bind:src="product.foto"
                      v-bind:alt="product.nombre"
                    />
                  </md-card-media>
                </md-card-header>
              </md-card>
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ProductosAdminComponent",
  computed: {
    ...mapState(["products"])
  },
  methods: {
    goProduct(id) {
      this.$router.push({ path: `/admin/editar/productos/${id}` });
    }
  }
};
</script>

<style scoped>
.resize-img {
  width: 95%;
  height: 95%;
  margin: auto;
}
</style>