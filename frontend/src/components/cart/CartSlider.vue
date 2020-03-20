<template>
  <md-drawer class="md-right" :md-active.sync="showSidepanel">
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
        <button class="btn btn-block btn-success" @click="irACarrito()">
          Comprar
        </button>
      </md-list-item>
    </md-list>
  </md-drawer>
</template>

<script>
import CartContent from '../cart/CartContent';
export default {
  name: 'CartSlider',
  props: {
    slider: Function,
    showSidepanel: Boolean
  },
  components: {
    CartContent
  },
  methods: {
    irACarrito() {
      if (this.slider) {
        this.slider();
      }
      this.$router.push('/carrito');
    }
  }
};
</script>

<style scoped></style>
