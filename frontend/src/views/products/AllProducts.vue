<template>
  <AllProducts />
</template>

<script>
// @ is an alias to /src
import AllProducts from "@/components/products/AllProducts.vue";
export default {
  name: "ProductsContainer",
  components: {
    AllProducts
  }
};
</script>
