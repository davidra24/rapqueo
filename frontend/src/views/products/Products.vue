<template>
  <Products />
</template>

<script>
// @ is an alias to /src
import Products from "@/components/products/Products.vue";
export default {
  name: "ProductsContainer",
  components: {
    Products
  }
};
</script>
