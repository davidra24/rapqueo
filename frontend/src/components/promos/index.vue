<template>
  <div class="container">
    <div class="row">
      <div v-if="!promos || promos.length === 0" class="col-12">
        <Loading />
      </div>
      <div v-if="promos && promos.length != 0" class="col-12">
        <h2 class="text-center">
          <strong>APROVECHA NUESTRAS PROMOCIONES</strong>
        </h2>
        <CarouselCard :interval="2000" height="300px" type="card" arrow="always">
          <CarouselCardItem v-for="promo in promos" :key="promo._id">
            <Promo :promo="promo" />
          </CarouselCardItem>
        </CarouselCard>
        <md-button class="md-primary ml-auto p-2 bd-highlight" @click="goPromos()">VER TODO</md-button>
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
  computed: {
    ...mapState(["promos"])
  },
  methods: {
    goPromos() {
      this.$router.push({ path: `/promociones` });
    },
    validateFecha(fechaInicio) {
      var inicialDate = new Date(fechaInicio);
      var actualDate = new Date();
      return inicialDate.getTime() < actualDate.getTime();
    }
  }
};
</script>

<style scoped></style>
