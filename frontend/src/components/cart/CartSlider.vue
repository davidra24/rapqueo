<template>
  <md-drawer class="md-right" :md-active.sync="openedCart">
    <md-toolbar class="md-transparent" md-elevation="0">
      <span class="md-title">
        <strong>Carrito</strong>
      </span>
    </md-toolbar>
    <md-list>
      <md-list-item class="d-flex justify-content-center">
        <h4>
          <strong>CARRITO DE COMPRAS</strong>
        </h4>
      </md-list-item>
      <md-list-item>
        <CartContent />
      </md-list-item>
      <md-list-item>
        <button class="btn btn-block btn-success" @click="irACarrito()">Comprar</button>
      </md-list-item>
    </md-list>
  </md-drawer>
</template>

<script>
import CartContent from "./CartContent";
import { mapState, mapActions } from "vuex";

export default {
  name: "CartSlider",
  computed: {
    ...mapState(["openedCart"])
  },
  components: {
    CartContent
  },
  methods: {
    ...mapActions(["closeCart"]),
    irACarrito() {
      if (this.openedCart) {
        this.closeCart();
      }
      this.$router.push("/carrito");
    }
  }
};
</script>

<style scoped></style>
