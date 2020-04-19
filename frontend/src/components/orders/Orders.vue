<template>
  <div>
    <br />
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="row">
            <div
              class="col-12 col-md-6 col-lg-4"
              v-for="order in ordersUser"
              :key="order._id"
            >
              <Order v-bind:order="order" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Order from "./Order";
  import { mapState } from "vuex";
  export default {
    name: "Orders",
    computed: {
      ...mapState(["ordersUser"]),
    },
    components: {
      Order,
    },
  };
</script>
<style scoped>
  .clickable {
    cursor: pointer;
  }
</style>
