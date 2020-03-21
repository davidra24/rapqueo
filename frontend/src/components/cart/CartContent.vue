<template>
  <div class="container">
    <div v-for="item in cart" :key="item.id">
      <md-card overlay style>
        <md-card-header>
          <md-avatar>
            <img v-bind:src="item.imagen" v-bind:alt="item.nombre" />
          </md-avatar>
          <div class="md-title">
            <p>{{ item.nombre }}</p>
          </div>
          <div class="d-flex">
            <div class="md-subhead p-2 bd-highlight">{{ item.cantidad }}</div>
            <div class="ml-auto p-2 bd-highlight">{{ item.precio }}</div>
          </div>
        </md-card-header>
      </md-card>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CartContent",
  computed: {
    ...mapState(["cart"])
  }
};
</script>

<style scoped>
.md-content {
  max-width: 400px;
  max-height: 200px;
  overflow: auto;
}
</style>
