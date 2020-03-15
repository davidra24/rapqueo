<template>
  <div class="container">
    <div v-if="loading" class="col-12">
      <Loading />
    </div>
    <div v-else>
      <div class="mt-4">
        <b-card
          img-src="https://placekitten.com/300/300"
          img-alt="Card image"
          img-left
          class="mb-3"
        >
          <b-card-text>
            <h1 class>{{product.nombre}}</h1>
            <h2 class="a">{{peso}}{{unidad}}</h2>
            <h3 class="a">${{precio}}</h3>
          </b-card-text>
          <br />
          <br />
          <br />
          <div class="row">
            <button class="btn-circle" @click="resta()">-</button>
            <h2 class="col-4 f-bold">{{cantidad}}</h2>
            <button class="btn-circle" @click="suma()">+</button>
            <div class="col-4.5"></div>
            <button class="col-4 btn btn-outline-dark">Agregar</button>
            <div class="col-4"></div>
          </div>
        </b-card>
      </div>
      <!--<p class="card-img-top">{{foto}}</p>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "OneProduct",
  props: ["product"],
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
.btn-circle {
  width: 45px;
  height: 45px;
  line-height: 45px;
  border-radius: 50%;
  border-color: grey;
}
.a {
  font-family: "Comic Sans MS", cursive, sans-serif;
}
</style>