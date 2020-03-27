<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <br />
          <h2>
            <strong>NUESTROS PRODUCTOS</strong>
          </h2>
          <br />
        </div>
        <div class="col-12">
          <div class="row">
            <div class="col-12 col-md-6 col-lg-4" v-for="product in products" :key="product._id">
              <Product v-blur="product.caracteristicas.cantidad" v-bind:product="product" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Product from "./Product";
import { mapState } from "vuex";
export default {
  name: "AllProducts",
  components: {
    Product
  },
  computed: {
    ...mapState(["products"])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.clickable {
  cursor: pointer;
}
.resize-img {
  width: 8rem;
}
</style>
