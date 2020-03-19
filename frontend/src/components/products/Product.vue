<template>
  <div v-if="loading" class="col-12">
    <Loading />
  </div>
  <div v-else>
    <div class="row">
      <md-card style="width: 85%;">
        <div
          class="container-fluid"
          @click="goProduct(product._id)"
          style="cursor: pointer;"
        >
          <md-card-header>
            <md-card-header-text>
              <h6>
                <strong> {{ product.nombre }}</strong>
              </h6>
              <div class="md-subhead">{{ peso }} {{ unidad }}</div>
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
        </div>
        <div class="row">
          <div class="col-4">
            <md-button class="md-fab md-mini-mini md-primary" @click="resta()">
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
        <div class="col-12">
          <button
            class="btn mrg-btn btn-success btn-block"
            @click="agregarCarrito()"
          >
            Agregar
          </button>
        </div>
      </md-card>
    </div>
    <br />
  </div>
</template>

<script>
import Loading from '../loading';
import { addToCart } from '../../util';
export default {
  name: 'Product',
  props: ['product'],
  component: {
    Loading
  },
  data() {
    return {
      cantidad: 1,
      precio: this.product.caracteristicas.precio,
      peso: this.product.caracteristicas.peso,
      unidad: this.product.caracteristicas.unidad,
      foto: this.product.foto
    };
  },
  methods: {
    goProduct(id) {
      this.$router.push({ path: `/productos/${id}` });
    },
    agregarCarrito() {
      addToCart({
        id: this.product._id,
        nombre: this.nombre,
        imagen: this.product.foto,
        cantidad: this.cantidad,
        peso: this.peso,
        unidad: this.unidad,
        precio: this.precio
      });
    },
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
    }
  }
};
</script>

<style scoped>
.resize-img {
  width: 100%;
  height: 100%;
}
.md-mini-mini {
  width: 2rem;
  height: 2rem;
}
.mrg-btn {
  margin-top: 5%;
  margin-bottom: 5%;
}
</style>