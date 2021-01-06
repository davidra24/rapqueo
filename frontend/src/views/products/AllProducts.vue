<template>
  <div class="row">
    <div v-if="loadingPromos" class="col-12">
      <Loading />
    </div>
    <div v-else class="col-12">
      <CarouselPromo />
    </div>
    <div v-if="loadingProducts" class="col-12">
      <Loading />
    </div>
    <div v-else class="col-12">
      <AllProducts v-bind:loadingImage="loadingImage" />
    </div>
  </div>
</template>

<script>
import CarouselPromo from "@/components/promos";
import { products, photos, filteredPromos } from "@/util/constants";
import { getApi, getOneOrManyApi } from "@/util/api";
import AllProducts from "@/components/products/AllProducts.vue";
import Loading from "@/components/loading";
import { mapState, mapActions } from "vuex";
export default {
  name: "AllProductsContainer",
  components: {
    Loading,
    CarouselPromo,
    AllProducts,
  },
  computed: {
    ...mapState(["products", "filteredPromos"]),
  },
  data() {
    return {
      loadingPromos: false,
      loadingProducts: false,
      loadingImage: false,
    };
  },
  methods: {
    ...mapActions(["setProducts", "setError", "setFilteredPromos"]),
    async fetchProducts() {
      this.loadingProducts = true;
      await getApi(products)
        .then((res) => {
          this.setProducts(res.data);
          this.getPhotos(res.data);
          this.loadingProducts = false;
        })
        .catch((err) => {
          this.setError(err);
          this.loadingProducts = false;
        });
    },
    async getPhotos(products) {
      this.loadingImage = true;
      const auxProducts = [];
      await products.forEach(async (product, index) => {
          const {data: {image}} = await getOneOrManyApi(photos, product.id_photo)
          await auxProducts.push({...product, image})
          if(products.length -1 === index){
            this.loadingProducts = true
            await this.setProducts(auxProducts)
            this.loadingImage = await false;
            this.loadingProducts = false
          }
        })
    },

    async fetchPromos() {
      this.loadingPromos = true;
      await getApi(filteredPromos)
        .then((res) => {
          this.setFilteredPromos(res.data);
          this.loadingPromos = false;
        })
        .catch((err) => {
          this.setError(err);
          this.loadingPromos = false;
        });
    },
  },
  mounted() {
    if (!this.products) {
      this.fetchProducts();
    }
    if (!this.promos) {
      this.fetchPromos();
    }
  },
};
</script>
