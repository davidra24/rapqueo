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
            <div class="col-12">
              <div class="row d-flex justify-content-center">
                <div class="col-8">
                  <md-field>
                    <label>Buscar productos</label>
                    <md-input
                      name="search"
                      id="search"
                      v-model="filterProduct"
                      md-layout="box"
                      class="text-center"
                    />
                  </md-field>
                </div>
              </div>
            </div>
            <div
              class="col-12 col-md-6 col-lg-4"
              style="margin-bottom: 2%; cursor: pointer;"
              v-for="product in filterProducts"
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
  data() {
    return {
      filterProduct: ""
    };
  },
  computed: {
    ...mapState(["products"]),
    filterProducts() {
      if (this.filterProduct != "") {
        return this.products.filter(product => {
          return product.nombre
            .toLowerCase()
            .includes(this.filterProduct.toLowerCase());
        });
      } else {
        return this.products;
      }
    }
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