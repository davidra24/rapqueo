<template>
  <div class="container">
    <div v-for="item in cart" :key="item.id">
      <md-card overlay style>
        <md-card-header>
          <md-avatar>
            <img v-bind:src="item.imagen" v-bind:alt="item.nombre" />
          </md-avatar>
          <div class="d-flex">
            <div class="md-title">
              <p>{{ item.nombre }}</p>
            </div>
            <md-button class="ml-auto p-2 md-icon-button" @click="quitarProducto(this.item.id)">
              <md-icon>delete_outline</md-icon>
            </md-button>
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
  },
  methods: {
    quitarProducto(id) {
      console.log(id);
      //Quitar objeto de carrito, buena :v
    }
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
