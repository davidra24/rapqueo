<template>
  <md-drawer class="md-right" :md-active.sync="openedCart">
    <md-toolbar class="md-transparent" md-elevation="0">
      <span class="md-title">
        <strong>Carrito</strong>
      </span>
    </md-toolbar>
    <md-list class="d-flex justify-content-center col-12">
      <md-list-item>
        <h4>
          <strong>CARRITO DE COMPRAS</strong>
        </h4>
      </md-list-item>
      <md-list-item v-show="getCountCart > 0">
        <CartContent />
      </md-list-item>
      <md-list-item v-show="getCountCart > 0">
        <h6>
          <strong>Precio Total:</strong>
          ${{ totalPriece }}
        </h6>
      </md-list-item>
      <md-list-item v-show="getCountCart > 0">
        <button class="btn btn-block btn-success" @click="irACarrito()">Comprar</button>
      </md-list-item>
      <md-list-item v-show="getCountCart === 0">
        <div class="d-flex bd-highlight mb-3">
          <h5 class="bd-highlight texter">
            En este momento no existen
            <br />productos en el carrito.
          </h5>
        </div>
      </md-list-item>
    </md-list>
  </md-drawer>
</template>

<script>
import CartContent from "./CartContent";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "CartSlider",
  computed: {
    ...mapState(["openedCart"]),
    ...mapGetters(["getCountCart", "totalPriece"])
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

<style scoped>
.texter {
  width: 200px;
  word-wrap: break-word;
}
</style>
