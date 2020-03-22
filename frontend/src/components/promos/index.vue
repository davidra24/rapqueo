<template>
  <div class="container">
    <div class="row">
      <div v-if="!productsPromos" class="col-12">
        <Loading />
      </div>
      <div v-if="productsPromos && productsPromos.length != 0" class="col-12">
        <h2 class="text-center">
          <strong>APROVECHA NUESTRAS PROMOCIONES</strong>
        </h2>
        <CarouselCard :interval="2000" height="300px" type="card" arrow="always">
          <CarouselCardItem v-for="product in productsPromos" :key="product._id">
            <Promo />
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
    ...mapState(["productsPromos"])
  },
  methods: {
    goPromos() {
      this.$router.push({ path: `/promociones` });
    }
  }
};
</script>

<style scoped></style>
