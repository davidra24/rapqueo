<template>
  <div>
    <br />
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="row">
            <div
              class="col-12 col-md-6 col-lg-4"
              v-for="product in productsCategorie"
              :key="product._id"
            >
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
  name: "Products",
  computed: {
    ...mapState(["productsCategorie"])
  },
  components: {
    Product
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.clickable {
  cursor: pointer;
}
</style>

