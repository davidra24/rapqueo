<template>
  <div>
    <br />
    <br />
    <div class="container">
      <div class="row">
        <div v-if="!promos || promos.length === 0" class="col-12">
          <Loading />
        </div>
        <div class="col-1"></div>
        <div v-if="promos && promos.length != 0" class="col-10">
          <div v-for="promo in promos" :key="promo._id">
            <div
              v-if="(Promos<1)&&(promo.producto.caracteristicas.cantidad>0) && (validateFecha(promo.fechaInicio,promo.fechaFin))"
            >{{validatePromos()}}</div>
          </div>
          <div v-if="Promos===1">
            <h2 class="text-center">
              <strong>APROVECHA NUESTRAS PROMOCIONES</strong>
            </h2>
            <CarouselCard
              v-responsive="['hidden-xs','hidden-sm']"
              :interval="2000"
              height="300px"
              type="card"
              arrow="hover"
            >
              <div v-for="promo in promos" :key="promo._id">
                <div
                  v-if="(promo.producto.caracteristicas.cantidad>0) && (validateFecha(promo.fechaInicio,promo.fechaFin))"
                >
                  <CarouselCardItem>
                    <Promo :promo="promo" />
                  </CarouselCardItem>
                </div>
              </div>
            </CarouselCard>
            <CarouselCard
              v-responsive="['hidden-all', 'xs', 'sm']"
              :interval="2000"
              height="300px"
              arrow="hover"
            >
              <div v-for="promo in promos" :key="promo._id">
                <div
                  v-if="(promo.producto.caracteristicas.cantidad>0) && (validateFecha(promo.fechaInicio,promo.fechaFin))"
                >
                  <CarouselCardItem>
                    <Promo :promo="promo" />
                  </CarouselCardItem>
                </div>
              </div>
            </CarouselCard>
            <md-button class="md-primary ml-auto p-2 bd-highlight" @click="goPromos()">VER TODO</md-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Promo from "./Promo.vue";
import { CarouselCard, CarouselCardItem } from "vue-carousel-card";
import "vue-carousel-card/styles/index.css";
import { mapState } from "vuex";
import { Loading } from "@/components/loading";
export default {
  name: "CarouselPromo",
  components: {
    Loading,
    Promo,
    CarouselCard,
    CarouselCardItem
  },
  data() {
    return {
      Promos: 0
    };
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
    validatePromos() {
      this.Promos++;
    }
  }
};
</script>

<style scoped></style>
