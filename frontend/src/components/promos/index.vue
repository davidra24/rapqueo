<template>
  <div>
    <br />
    <br />
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div v-if="validarPromos()" class="col-12 col-md-10 col-lg-8">
          <h2 class="text-center">
            <strong>APROVECHA NUESTRAS PROMOCIONES</strong>
          </h2>
          <div v-responsive="['hidden-xs', 'hidden-sm']">
            <CarouselCard :interval="2000" height="300px" type="card" arrow="hover">
              <CarouselCardItem
                class="d-flex justify-content-center"
                v-for="promo in promos"
                :key="promo._id"
              >
                <Promo :promo="promo" />
              </CarouselCardItem>
            </CarouselCard>
          </div>
          <div v-responsive="['hidden-all', 'xs', 'sm']">
            <CarouselCard :interval="2000" height="300px" arrow="hover">
              <CarouselCardItem
                class="d-flex justify-content-center"
                v-for="promo in promos"
                :key="promo._id"
              >
                <Promo :promo="promo" />
              </CarouselCardItem>
            </CarouselCard>
          </div>
          <md-button class="md-primary ml-auto p-2 bd-highlight" @click="goPromos()">VER TODO</md-button>
        </div>
        <div v-else></div>
      </div>
    </div>
  </div>
</template>

<script>
import Promo from "./Promo.vue";
import { CarouselCard, CarouselCardItem } from "vue-carousel-card";
import "vue-carousel-card/styles/index.css";
import { mapState } from "vuex";
export default {
  name: "CarouselPromo",
  components: {
    Promo,
    CarouselCard,
    CarouselCardItem
  },
  computed: {
    ...mapState(["promos"])
  },
  methods: {
    goPromos() {
      this.$router.push({ path: `/promociones` });
    },
    /*    validateFecha(fechaInicio, fechaFin) {
      var initialDate = new Date(fechaInicio);
      var finalDate = new Date(fechaFin);
      var actualDate = new Date();
      return (
        initialDate.getTime() < actualDate.getTime() &&
        finalDate.getTime() > actualDate.getTime()
      );
    },
    validarPromo(promo) {
      return (
        promo.producto.caracteristicas.cantidad > 0 &&
        this.validateFecha(promo.fechaInicio, promo.fechaFin)
      );
    },*/
    validarPromos() {
      return this.promos;
    }
  }
};
</script>

<style scoped></style>
