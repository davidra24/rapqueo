<template>
  <div class="container">
    <div style="margin-bottom: -2%;">
      <md-card style="width: 95%;">
        <md-card-header>
          <md-avatar>
            <img v-bind:src="item.imagen" v-bind:alt="item.nombre" />
            <md-tooltip md-direction="top">{{ item.nombre }}</md-tooltip>
          </md-avatar>
          <div class="d-flex bd-highlight">
            <p class="texter bd-highlight col-10 text-truncate">
              <md-tooltip md-direction="top">{{ item.nombre }}</md-tooltip>
              {{ item.nombre }}
            </p>
            <md-button
              class="ml-auto p-2 md-icon-button md-accent"
              @click="quitarProducto(item.id)"
            >
              <md-icon>delete_outline</md-icon>
            </md-button>
          </div>
          <div class="md-subhead p-2">Cantidad: {{ item.cantidad }}</div>
          <div class="ml-auto p-2">$ {{ item.precio }}</div>
        </md-card-header>
      </md-card>
    </div>
  </div>
</template>

<script>
import { deleteItemInCart } from "../../util";
import { getCart } from "../../util";
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "BuyContent",
  props: ["item"],
  computed: {
    ...mapState(["cart"]),
    ...mapGetters(["getCountCart"])
  },
  methods: {
    ...mapActions(["setCart"]),
    quitarProducto(id) {
      deleteItemInCart(id);
      this.setCart(getCart());
      if (this.getCountCart == 0) {
        this.$router.push("/");
      }
    }
  }
};
</script>

<style scoped>
</style>