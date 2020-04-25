<template>
  <div>
    <br />
    <br />
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div v-if="!promos" class="col-12">
          <Loading />
        </div>
        <div v-else-if="promos.length > 0 && validarAllPromos()" class="col-12 col-md-10 col-lg-8">
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
                <Promo v-if="validarPromos(promo)" :promo="promo" />
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
                <Promo v-if="validarPromos(promo)" :promo="promo" />
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
import Loading from "@/components/loading";
export default {
  name: "CarouselPromo",
  components: {
    Loading,
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
    validateFecha(fechaInicio, fechaFin) {
      var initialDate = new Date(fechaInicio);
      var finalDate = new Date(fechaFin);
      var actualDate = new Date();
      return (
        initialDate.getTime() < actualDate.getTime() &&
        finalDate.getTime() > actualDate.getTime()
      );
    },
    validarPromos(promo) {
      return (
        promo.producto.caracteristicas.cantidad > 0 &&
        this.validateFecha(promo.fechaInicio, promo.fechaFin)
      );
    },
    validarAllPromos() {
      let valido = false;
      this.promos.forEach(promo => {
        valido =
          promo.producto.caracteristicas.cantidad > 0 &&
          this.validateFecha(promo.fechaInicio, promo.fechaFin);
      });
      return valido;
    }
  }
};
</script>

<style scoped></style>
