<template>
  <div class="row">
    <div class="col-12 d-flex justify-content-center">
      <md-card style="min-width: 50%; max-width: 100%;">
        <b-overlay :show="show" rounded="sm">
          <md-card-header>
            <md-card-header-text>
              <h6>
                <strong>{{ promo.producto.nombre }}</strong>
              </h6>
              <b-card-text class="small text-muted">
                <span
                  class="md-body-2"
                  style="text-decoration: line-through;"
                >${{ promo.producto.caracteristicas.precio }}</span>
              </b-card-text>
              <div>
                ${{
                promo.producto.caracteristicas.precio *
                (1 - promo.porcentaje / 100) *
                cantidad
                }}
              </div>
            </md-card-header-text>
            <md-card-media md-big>
              <md-badge class="md-primary badge-percent" v-bind:md-content="promo.porcentaje+'%'"></md-badge>
              <img
                class="img-fluid resize-img"
                v-bind:src="promo.producto.foto"
                v-bind:alt="promo.producto.nombre"
              />
            </md-card-media>
          </md-card-header>
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
          <div class="col-12 mrg-btn">
            <md-button
              class="md-raised md-primary btn-block"
              @click="agregarCarrito(), (myVar = agregado())"
              :disabled="show"
              variant="primary"
            >Agregar</md-button>
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
import { addToCart } from "@/util";
import { mapActions } from "vuex";
export default {
  name: "OnePromo",
  props: ["promo"],
  data() {
    return {
      cantidad: 1,
      peso: this.promo.producto.caracteristicas.peso,
      unidad: this.promo.producto.caracteristicas.unidad,
      foto: this.promo.producto.foto,
      show: false
    };
  },
  methods: {
    ...mapActions(["addCart"]),
    resta() {
      this.cantidad = this.cantidad > 1 ? this.cantidad - 1 : this.cantidad;
    },
    suma() {
      this.cantidad = this.cantidad >= 0 ? this.cantidad + 1 : this.cantidad;
    },
    agregado() {
      this.show = true;
      setInterval(() => {
        this.show = false;
      }, 3000);
    },
    agregarCarrito() {
      const cart = {
        id: this.promo.producto._id,
        nombre: this.promo.producto.nombre,
        imagen: this.promo.producto.foto,
        cantidad: this.cantidad,
        peso: this.peso,
        unidad: this.unidad,
        precio:
          this.promo.producto.caracteristicas.precio *
          (1 - this.promo.porcentaje / 100) *
          this.cantidad
      };
      addToCart(cart);
      this.addCart(cart);
    }
  }
};
</script>

<style scoped>
.clickable {
  cursor: pointer;
}
.resize-img {
  width: 95%;
  height: 95%;
}
.mrg-btn {
  padding-top: 5%;
  padding-bottom: 5%;
}
.badge-percent {
  width: 3rem;
  height: 3rem;
  font-size: 1.3em;
}
</style>
