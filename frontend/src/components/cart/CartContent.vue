<template>
  <div class="container">
    <div class style="margin-bottom: 4%;">
      <div v-for="item in cart" :key="item.id">
        <md-card>
          <md-card-header>
            <md-avatar>
              <img v-bind:src="item.imagen" v-bind:alt="item.nombre" />
            </md-avatar>
            <div class="d-flex bd-highlight mb-3">
              <p class="texter bd-highlight col-10 text-truncate">{{ item.nombre }}</p>
              <md-button
                class="ml-auto p-2 md-icon-button md-accent col-1"
                @click="quitarProducto(item.id)"
              >
                <md-icon>delete_outline</md-icon>
              </md-button>
            </div>
            <div class="md-subhead p-2">Cantidad: {{ item.cantidad }}</div>
            <div class="ml-auto p-2">${{ item.precio }}</div>
          </md-card-header>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { deleteItemInCart } from "../../util";
import { getCart } from "@/util";
export default {
  name: "CartContent",
  computed: {
    ...mapState(["cart"])
  },
  methods: {
    ...mapActions(["setCart"]),
    quitarProducto(id) {
      deleteItemInCart(id);
      this.setCart(getCart());
    }
  }
};
</script>

<style scoped>
</style>
