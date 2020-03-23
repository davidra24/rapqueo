<template>
  <div class="row">
    <div class="col-12">
      <div class="row d-flex justify-content-center" style="width: 100%; max-height: 100%;">
        <b-card style="min-height:18rem;max-width:20rem;" @click="goPromo(productsPromos._id)">
          <span class="md-title">{{ productsPromos.nombre }}</span>
          <br />
          <div class="row">
            <div class="col-8">
              <img
                class="resize-img"
                v-bind:src="productsPromos.foto"
                v-bind:alt="productsPromos.nombre"
              />
            </div>
            <div class="d-flex align-items-start flex-column bd-highlight mb-3">
              <br />
              <b-card-text class="small text-muted">
                <span
                  class="md-body-2"
                  style="text-decoration: line-through;"
                >${{ productsPromos.caracteristicas.precio }}</span>
              </b-card-text>
              <b-card-text>
                <span class="md-subheading">
                  <strong>
                    ${{
                    productsPromos.caracteristicas.precio * (1 - productsPromos.porcentaje / 100)
                    }}
                  </strong>
                </span>
              </b-card-text>
            </div>
          </div>
          <b-card-text>
            <span class="md-body-1">{{ productsPromos.mensaje }}</span>
          </b-card-text>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Promo",
  computed: {
    ...mapState(["productsPromos"])
  },
  data() {
    return {
      slide: 0,
      sliding: null
    };
  },
  methods: {
    goPromo(id) {
      this.$router.push({ path: `/promociones/${id}` });
    }
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
