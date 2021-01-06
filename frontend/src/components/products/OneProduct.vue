<template>
  <div class="row">
    <div class="col-12 d-flex justify-content-center">
      <md-card style="min-width: 50%; max-width: 100%;">
        <b-overlay :show="show" rounded="sm">
          <md-card-header>
            <md-card-header-text>
              <h6>
                <strong>{{ product.name }}</strong>
              </h6>
              <div class="md-subhead">
                {{ peso }}
                {{ unidad }}
              </div>
              <br />
              <div>${{ precio }}</div>
            </md-card-header-text>
            <md-card-media md-big>
              <img
                class="img-fluid resize-img"
                v-bind:src="foto"
                v-bind:alt="product.name"
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
import { mapActions, mapState } from "vuex";
import { photos } from "@/util/constants";
import { getOneOrManyApi } from "@/util/api";
export default {
  name: "OneProduct",
  computed: {
    ...mapState(["product"])
  },
  data() {
    return {
      cantidad: 1,
      precio: 0,
      peso: '',
      unidad: '',
      foto: '',
      show: false
    };
  },
  mounted() {
    this.getPhoto(this.product);
    this.carac = JSON.parse(this.product.caracteristics);
    this.peso = this.carac.peso
    this.unidad = this.carac.unidad
    this.precio = this.carac.precio;
    this.foto = this.product.image;
  },
  methods: {
    ...mapActions(["addCart"]),
    resta() {
      this.cantidad = this.cantidad > 1 ? this.cantidad - 1 : this.cantidad;
      this.precio =
        this.cantidad > 0
          ? this.cantidad * JSON.parse(this.product.caracteristics).precio
          : this.precio;
    },
    suma() {
      this.cantidad =
        this.cantidad < JSON.parse(this.product.caracteristics).cantidad
          ? this.cantidad + 1
          : this.cantidad;
      this.precio = this.cantidad * JSON.parse(this.product.caracteristics).precio;
    },
    agregado() {
      this.show = true;
      setInterval(() => {
        this.show = false;
      }, 3000);
    },
    agregarCarrito() {
      const cart = {
        id: this.product.id,
        nombre: this.product.name,
        imagen: this.foto,
        cantidad: this.cantidad,
        peso: this.peso,
        unidad: this.unidad,
        precio: this.precio
      };
      addToCart(cart);
      this.addCart(cart);
    },
    async getPhoto(product) {
      const {data: {image}} = await getOneOrManyApi(photos, product.id_photo);
      await this.setProduct({...product, image})
    },
  }
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
