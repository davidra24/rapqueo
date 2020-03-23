<template>
  <div class="row">
    <div v-if="loadingPromos" class="col-12">
      <Loading />
    </div>
    <div v-else class="col-12">
      <CarouselPromo />
    </div>
    <div v-if="loadingCategories" class="col-12">
      <Loading />
    </div>
    <div v-else class="col-12">
      <Categories />
    </div>
  </div>
</template>

<script>
import CarouselPromo from "@/components/promos";
import Loading from "@/components/loading";
import Categories from "@/components/categories/Categories.vue";
import { categories, promos } from "@/util/constants";
import { getApi } from "@/util/api";
import { mapState, mapActions } from "vuex";
export default {
  name: "CategoriesContainer",
  components: {
    Loading,
    Categories,
    CarouselPromo
  },
  computed: {
    ...mapState(["categories", "promos"])
  },
  data() {
    return {
      loadingPromos: false,
      loadingCategories: false
    };
  },
  methods: {
    ...mapActions(["setCategories", "setError", "setPromos"]),
    async fetchCategories() {
      this.loadingCategories = true;
      await getApi(categories)
        .then(res => {
          this.setCategories(res.data);
          this.loadingCategories = false;
        })
        .catch(err => {
          this.setError(err);
          this.loadingCategories = false;
        });
    },
    async fetchPromos() {
      this.loadingPromos = true;
      await getApi(promos)
        .then(res => {
          this.setPromos(res.data);
          this.loadingPromos = false;
        })
        .catch(err => {
          this.setError(err);
          this.loadingPromos = false;
        });
    }
  },
  created() {
    if (!this.categories) {
      this.fetchCategories();
    }
    if (!this.promos) {
      this.fetchPromos();
    }
  }
};
</script>
