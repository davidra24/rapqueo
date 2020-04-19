<template>
  <div class="row">
    <div class="col-12 d-flex justify-content-center">
      <md-card style="min-width: 50%; max-width: 100%;">
        <b-overlay :show="show" rounded="sm">
          <md-card-header>
            <md-card-header-text>
              <h6>
                <strong>{{ product.nombre }}</strong>
              </h6>
              <div class="md-subhead">
                {{ product.caracteristicas.peso }}
                {{ product.caracteristicas.unidad }}
              </div>
              <br />
              <div>${{ precio }}</div>
            </md-card-header-text>
            <md-card-media md-big>
              <img
                class="img-fluid resize-img"
                v-bind:src="product.foto"
                v-bind:alt="product.nombre"
              />
            </md-card-media>
          </md-card-header>
          <div class="row">
            <div class="col-4">
              <md-button
                class="md-fab md-mini-mini md-primary"
                @click="resta()"
              >
                <md-icon>remove</md-icon>
              </md-button>
            </div>
            <div class="col-4">
              <h2 class="f-bold">{{ cantidad }}</h2>
            </div>
            <div class="col-4">
              <md-button class="md-fab md-mini-mini md-primary" @click="suma()">
                <md-icon>add</md-icon>
              </md-button>
            </div>
          </div>
          <div class="col-12 mrg-btn">
            <md-button
              class="md-raised md-primary btn-block"
              @click="agregarCarrito(), (myVar = agregado())"
              :disabled="show"
              variant="primary"
              >Agregar</md-button
            >
          </div>
          <template v-slot:overlay>
            <div class="text-center">
              <b-icon icon="check" font-scale="3"></b-icon>
              <p>Articulo agregado al carrito</p>
            </div>
          </template>
        </b-overlay>
      </md-card>
    </div>
  </div>
</template>

<script>
import { addToCart } from '@/util';
import { mapActions, mapState } from 'vuex';
export default {
  name: 'OneProduct',
  computed: {
    ...mapState(['product']),
  },
  data() {
    return {
      cantidad: 1,
      precio: 0,
      show: false,
    };
  },
  mounted() {
    this.precio = this.product.caracteristicas.precio;
  },
  methods: {
    ...mapActions(['addCart']),
    resta() {
      this.cantidad = this.cantidad > 1 ? this.cantidad - 1 : this.cantidad;
      this.precio =
        this.cantidad > 0
          ? this.cantidad * this.product.caracteristicas.precio
          : this.precio;
    },
    suma() {
      this.cantidad = this.cantidad >= 0 ? this.cantidad + 1 : this.cantidad;
      this.precio = this.cantidad * this.product.caracteristicas.precio;
    },
    agregado() {
      this.show = true;
      setInterval(() => {
        this.show = false;
      }, 3000);
    },
    agregarCarrito() {
      const cart = {
        id: this.product._id,
        nombre: this.product.nombre,
        imagen: this.product.foto,
        cantidad: this.cantidad,
        peso: this.peso,
        unidad: this.unidad,
        precio: this.precio,
      };
      addToCart(cart);
      this.addCart(cart);
    },
  },
};
</script>

<style scoped>
.resize-img {
  width: 95%;
  height: 95%;
}
.mrg-btn {
  padding-top: 5%;
  padding-bottom: 5%;
}
</style>
