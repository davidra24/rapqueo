<template>
  <div class="row d-flex justify-content-center" style="margin-bottom: 4%;">
    <md-card style="width: 85%;">
      <b-overlay :show="show" rounded="sm">
        <b-overlay :show="producto" rounded="sm">
          <div
            class="container-fluid"
            @click="goProduct(product.id)"
            style="cursor: pointer;"
          >
            <md-card-header>
              <md-card-header-text>
                <h6>
                  <strong>{{ product.name }}</strong>
                </h6>
                <div class="md-subhead">{{ peso }} {{ unidad }}</div>
                <br />
                <div v-for="promo in promos" :key="promo.id">
                  <div
                    v-if="
                      promo.id_product === product.id &&
                        validateFecha(promo.fechaInicio, promo.fechaFin)
                    "
                  >
                    {{ promoVerify() }}
                    <b-card-text class="small text-muted">
                      <span
                        class="md-body-2"
                        style="text-decoration: line-through;"
                        >${{ promo.product.caracteristics.precio }}</span
                      >
                    </b-card-text>
                    <div>
                      ${{
                        cambioPrecio(
                          promo.producto.caracteristicas.precio *
                            (1 - promo.porcentaje / 100) *
                            cantidad,
                          promo.porcentaje / 100
                        )
                      }}
                    </div>
                  </div>
                </div>
                <div v-if="!promoV">${{ precio }}</div>
              </md-card-header-text>
              <md-card-media md-big>
                <img
                  v-if="!loadingImage"
                  class="img-fluid resize-img"
                  v-bind:src="foto"
                  v-bind:alt="product.name"
                />
                <div v-else><Mini /></div>
              </md-card-media>
            </md-card-header>
          </div>
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
          <div class="col-12">
            <md-button
              class="md-raised mrg-btn md-primary btn-block"
              @click="agregarCarrito(), agregado()"
              :disabled="false"
              variant="primary"
              >Agregar</md-button
            >
          </div>
          <template v-slot:overlay>
            <div class="text-center">
              <p>
                <strong>{{ product.name }}</strong>
              </p>
              <p>{{ peso }}{{ unidad }}</p>
              <b-icon icon="x" font-scale="3"></b-icon>
              <p>Este producto se encuentra agotado</p>
            </div>
          </template>
        </b-overlay>
        <template v-slot:overlay>
          <div class="text-center">
            <b-icon icon="check" font-scale="3"></b-icon>
            <p>Articulo agregado al carrito</p>
          </div>
        </template>
      </b-overlay>
    </md-card>
  </div>
</template>

<script>
import Loading from "@/components/loading";
import Mini from "@/components/loading/mini"
import { promos } from "@/util/constants";
import { addToCart } from "../../util";
import { mapActions, mapState } from "vuex";
import { getApi } from "@/util/api";
export default {
  name: "Product",
  props: ["product", "promo", "loadingImage"],
  component: {
    Loading,
    Mini,
    promos,
  },
  data() {
    const carac = JSON.parse(this.product.caracteristics);
    return {
      cantidad: 1,
      promoV: false,
      precio: carac.precio,
      peso: carac.peso,
      unidad: carac.unidad,
      foto: this.product.image,
      descuento: 1,
      show: false,
      producto: this.productVerify(),
    };
  },
  methods: {
    ...mapActions(["addCart", "setPromos", "setError"]),
    async fetchPromos() {
      await getApi(promos)
        .then((res) => {
          this.setPromos(res.data);
        })
        .catch((err) => {
          this.setError(err);
        });
    },
    validateFecha(fechaInicio, fechaFin) {
      var initialDate = new Date(fechaInicio);
      var finalDate = new Date(fechaFin);
      var actualDate = new Date();
      return (
        initialDate.getTime() < actualDate.getTime() &&
        finalDate.getTime() > actualDate.getTime()
      );
    },
    cambioPrecio(precioNuevo, porcentaje) {
      this.Precio = precioNuevo;
      this.descuento = 1 - porcentaje;
      return this.Precio;
    },
    promoVerify() {
      this.promoV = true;
    },
    productVerify() {
      if (JSON.parse(this.product.caracteristics).cantidad < 1) {
        return true;
      }
      return false;
    },
    goProduct(id) {
      this.$router.push({ path: `/productos/${id}` });
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
        precio: this.precio * this.descuento,
      };
      addToCart(cart);
      this.addCart(cart);
      this.precio = JSON.parse(this.product.caracteristics).precio;
      this.cantidad = 1;
    },
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
      this.precio =
        this.cantidad * JSON.parse(this.product.caracteristics).precio;
    },
  },
  computed: {
    ...mapState(["promos"]),
  },
  mounted() {
    if (!this.promos) {
      this.fetchPromos();
    }
  },
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
