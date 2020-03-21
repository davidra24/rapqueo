<template>
  <div>
    <div v-if="loading" class="col-12">
      <Loading />
    </div>
    <div v-else class="col-12 d-flex justify-content-center">
      <md-card
        style="min-width: 50%; max-width: 100%;"
        @click="goPromo(promo._id)"
      >
        <b-overlay :show="show" rounded="sm">
          <md-card-header>
            <md-card-header-text>
              <h6>
                <strong>{{ data.nombre }}</strong>
              </h6>
              <div class="md-subhead">{{ data.peso }} {{ data.unidad }}</div>
              <br />
              <b-card-text class="small text-muted">
                <span class="md-body-2" style="text-decoration: line-through;"
                  >${{ data.caracteristicas.precio }}</span
                >
              </b-card-text>
              <div>
                ${{
                  data.caracteristicas.precio *
                    (1 - promo.porcentaje / 100) *
                    cantidad
                }}
              </div>
            </md-card-header-text>
            <md-card-media md-big>
              <img
                class="img-fluid resize-img"
                v-bind:src="data.foto"
                v-bind:alt="data.nombre"
              />
            </md-card-media>
          </md-card-header>
          <b-card-text>
            <span class="md-body-1">{{ promo.mensaje }}</span>
          </b-card-text>
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
            <button
              class="btn btn-success btn-block"
              @click="agregarCarrito(), (myVar = agregado())"
              :disabled="show"
              variant="primary"
            >
              Agregar
            </button>
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
import { apiurl, products } from '../../util/constants';
import Loading from '../loading';
import { addToCart } from '../../util';
export default {
  name: 'Promos',
  props: ['promo'],
  components: {
    Loading
  },
  data() {
    return {
      cantidad: 1,
      show: false,
      loading: true,
      slide: 0,
      sliding: null,
      data: {},
      precio: 0
    };
  },
  methods: {
    goPromo(id) {
      this.$router.push({ path: `/promociones/${id}` });
    },
    fetch() {
      console.log(`${apiurl}/${products}/${this.promo.idProducto}`);

      fetch(`${apiurl}/${products}/${this.promo.idProducto}`)
        .then(data => {
          if (data.ok) {
            return data.json();
          }
        })
        .then(info => {
          this.loading = false;
          this.data = info;
        })
        .catch(err => {
          this.error = err;
        });
    },
    resta() {
      this.cantidad = this.cantidad > 1 ? this.cantidad - 1 : this.cantidad;
      this.precio =
        this.cantidad > 0
          ? this.cantidad *
            this.data.caracteristicas.precio *
            (1 - this.promo.porcentaje / 100)
          : this.precio;
    },
    suma() {
      this.cantidad = this.cantidad >= 0 ? this.cantidad + 1 : this.cantidad;
      this.precio =
        this.cantidad *
        this.data.caracteristicas.precio *
        (1 - this.promo.porcentaje / 100);
    },
    agregado() {
      this.show = true;
      setInterval(() => {
        this.show = false;
      }, 3000);
    },
    agregarCarrito() {
      addToCart({
        id: this.data._id,
        nombre: this.data.nombre,
        imagen: this.data.foto,
        cantidad: this.cantidad,
        peso: this.data.caracteristicas.peso,
        unidad: this.data.caracteristicas.unidad,
        precio:
          this.data.caracteristicas.precio * (1 - this.promo.porcentaje / 100)
      });
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style scoped>
.resize-img {
  width: 10rem;
  height: 8rem;
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
