<template>
  <div class="container">
    <div class="row">
      <div
        class="col-12 col-md-6 col-lg-4"
        v-for="promo in getPromosValidas"
        :key="promo._id"
      >
        <Promos v-bind:promo="promo" />
      </div>
    </div>
  </div>
</template>
<script>
import Promos from './Promos';
import { mapState, mapGetters } from 'vuex';
export default {
  name: 'AllPromos',
  computed: {
    ...mapState(['promos']),
    ...mapGetters(['getPromosValidas']),
  },
  components: {
    Promos,
  },
};
</script>

<style scoped>
.clickable {
  cursor: pointer;
}
</style>
