<template>
  <div>
    <div class="container">
      <div class="row">
        <Promos v-bind:promo="promo" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Promos from "@/components/promos/Promos";
export default {
  name: "OnePromo",
  computed: {
    ...mapState(["promo"])
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

<style scoped></style>
