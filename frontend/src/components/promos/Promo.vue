<template>
  <div>
    <div v-if="loading" class="col-12">
      <Loading />
    </div>
    <div v-else>
      <div class="row d-flex justify-content-center" style="width: 100%; max-height: 100%;">
        <b-card style="min-height:18rem;max-width:20rem;" @click="goPromo(promo._id)">
          <span class="md-title">{{ data.nombre }}</span>
          <br />
          <div class="row">
            <div class="col-8">
              <img class="resize-img" v-bind:src="data.foto" v-bind:alt="data.nombre" />
            </div>
            <div class="d-flex align-items-start flex-column bd-highlight mb-3">
              <br />
              <b-card-text class="small text-muted">
                <span
                  class="md-body-2"
                  style="text-decoration: line-through;"
                >${{ data.caracteristicas.precio }}</span>
              </b-card-text>
              <b-card-text>
                <span class="md-subheading">
                  <strong>
                    ${{
                    data.caracteristicas.precio * (1 - promo.porcentaje / 100)
                    }}
                  </strong>
                </span>
              </b-card-text>
            </div>
          </div>
          <b-card-text>
            <span class="md-body-1">{{ promo.mensaje }}</span>
          </b-card-text>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import { apiurl, products } from "../../util/constants";
import Loading from "../loading";
export default {
  name: "Promo",
  props: ["promo"],
  components: {
    Loading
  },
  data() {
    return {
      loading: true,
      slide: 0,
      sliding: null,
      data: {}
    };
  },
  methods: {
    goPromo(id) {
      this.$router.push({ path: `/promociones/${id}` });
    },
    fetch() {
      fetch(`${apiurl}${products}${this.promo.idProducto}`)
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
