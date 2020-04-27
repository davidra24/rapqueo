<template>
  <div class="row">
    <div v-if="!promo" class="col-12">
      <Loading />
    </div>
    <div v-else class="col-12 clickable">
      <b-card style="min-height:18rem;max-width:20rem;" @click="goPromo(promo._id)">
        <span class="md-title">{{ promo.producto.nombre }}</span>
        <br />
        <div class="row">
          <div class="col-8">
            <md-badge class="md-primary badge-percent" v-bind:md-content="promo.porcentaje + '%'"></md-badge>
            <img
              class="resize-img"
              v-bind:src="promo.producto.foto"
              v-bind:alt="promo.producto.nombre"
            />
          </div>
          <div class="d-flex align-items-start flex-column bd-highlight mb-3">
            <br />
            <b-card-text class="small text-muted">
              <span
                class="md-body-2"
                style="text-decoration: line-through;"
              >${{ promo.producto.caracteristicas.precio }}</span>
            </b-card-text>
            <b-card-text>
              <span class="md-subheading">
                <strong>
                  {{
                  promo.producto.caracteristicas.precio *
                  (1 - promo.porcentaje / 100)
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
</template>

<script>
import Loading from "@/components/loading";
export default {
  name: "Promo",
  props: ["promo"],
  components: {
    Loading
  },
  data() {
    return {};
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

.badge-percent {
  width: 2rem;
  height: 2rem;
  font-size: 1em;
}
</style>
