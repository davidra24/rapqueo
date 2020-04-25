<template>
  <div>
    <br />
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="row">
            <div class="col-12 col-md-6 col-lg-6" v-for="order in ordersState" :key="order._id">
              <Pedido v-bind:order="order" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Pedido from "./Pedido";
import { mapState } from "vuex";
export default {
  name: "Pedidos",
  computed: {
    ...mapState(["ordersState"])
  },
  components: {
    Pedido
  }
};
</script>
<style scoped>
.clickable {
  cursor: pointer;
}
</style>
