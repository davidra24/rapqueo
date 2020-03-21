<template>
  <div>
    <div v-if="loading">
      <Loading />
    </div>
    <div v-else>
      <div v-if="data[0]">
        <div class="d-flex">
          <h2>
            <strong>APROVECHA NUESTRAS PROMOCIONES</strong>
          </h2>
          <md-button class="md-primary ml-auto p-2 bd-highlight" @click="goPromos()">VER TODO</md-button>
        </div>
        <CarouselCard :interval="2000" height="300px" type="card" arrow="always">
          <CarouselCardItem v-for="item in data" :key="item._id">
            <Promo v-bind:promo="item" />
          </CarouselCardItem>
        </CarouselCard>
      </div>
    </div>
  </div>
</template>

<script>
import { apiurl, promos } from "../../util/constants";
import Loading from "../loading";
import Promo from "@/components/promos/Promo.vue";
import { CarouselCard, CarouselCardItem } from "vue-carousel-card";
import "vue-carousel-card/styles/index.css";
export default {
  name: "CarouselPromo",
  components: {
    Promo,
    CarouselCard,
    CarouselCardItem,
    Loading
  },
  data() {
    return {
      data: [],
      loading: true,
      error: null
    };
  },
  methods: {
    fetch() {
      fetch(apiurl + promos)
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
    goPromos() {
      this.$router.push({ path: `/promociones` });
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style scoped></style>
