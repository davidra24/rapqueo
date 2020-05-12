<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-6 col-lg-4" v-for="promo in filteredPromos" :key="promo._id">
        <Promos v-bind:promo="promo" />
      </div>
    </div>
  </div>
</template>
<script>
import Promos from "./Promos";
import { mapState } from "vuex";
export default {
  name: "AllPromos",
  computed: {
    ...mapState(["filteredPromos"])
  },
  components: {
    Promos
  }
};
</script>

<style scoped>
.clickable {
  cursor: pointer;
}
</style>
