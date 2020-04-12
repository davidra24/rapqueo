<template>
  <div class="container">
    <div class="row">
      <div v-if="loadingCategories" class="col-12">
        <Loading />
      </div>
      <div v-else class="col-12">
        <Categories />
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/loading";
import Categories from "@/components/categories/Categories.vue";
import { categories } from "@/util/constants";
import { getApi } from "@/util/api";
import { mapState, mapActions } from "vuex";
export default {
  name: "CategoriesContainer",
  components: {
    Loading,
    Categories
  },
  computed: {
    ...mapState(["categories"])
  },
  data() {
    return {
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
    }
  },
  mounted() {
    if (!this.categories) {
      this.fetchCategories();
    }
  }
};
</script>

<style scoped>
</style>
