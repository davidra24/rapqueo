<template>
  <div class="col-12">
    <CartComponent />
  </div>
</template>

<script>
// @ is an alias to /src
import CartComponent from "@/components/cart/";
export default {
  name: "Cart",
  components: {
    CartComponent
  }
};
</script>
