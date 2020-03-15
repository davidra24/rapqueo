<template>
  <div v-if="loading" class="col-12">
    <Loading />
  </div>
  <div v-else class="col-12">
    <div class="row">
      <md-card>
        <div class="container" @click="goProduct(product._id)">
          <md-card-header>
            <md-card-header-text>
              <div class="md-title">{{ product.nombre }}</div>
              <div class="md-subhead">{{ peso }} {{ unidad }}</div>
              <br />
              <div>${{ precio }}</div>
            </md-card-header-text>

            <md-card-media md-big>
              <img
                class="img-fluid rounded-0 resize-img"
                v-bind:src="product.foto"
                v-bind:alt="product.nombre"
              />
            </md-card-media>
          </md-card-header>
        </div>
        <md-card-actions>
          <md-button class="md-fab md-mini-mini md-primary" @click="resta()">
            <md-icon>remove</md-icon>
          </md-button>
          <div class="col-1"></div>
          <h2 class="f-bold">{{ cantidad }}</h2>
          <div class="col-1"></div>
          <md-button class="md-fab md-mini-mini md-primary" @click="suma()">
            <md-icon>add</md-icon>
          </md-button>
          <button class="btn">Agregar</button>
        </md-card-actions>
      </md-card>
    </div>

    <br />
  </div>
</template>

<script>
export default {
  name: "Product",
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
    goProduct(id) {
      this.$router.push({ path: `/productos/${id}` });
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
.btn-circle {
  width: 45px;
  height: 45px;
  line-height: 45px;
  border-radius: 50%;
  border-color: grey;
}
.visible {
  visibility: visible;
}
.invisible {
  visibility: hidden;
}
.resize-img {
  width: 10rem;
}
.md-mini-mini {
  width: 2rem;
  height: 2rem;
}
</style>
