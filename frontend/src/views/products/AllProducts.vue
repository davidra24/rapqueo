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
      <AllProducts />
    </div>
  </div>
</template>

<script>
import CarouselPromo from '@/components/promos';
import { products, promos } from '@/util/constants';
import AllProducts from '@/components/products/AllProducts.vue';
import Loading from '@/components/loading';
import { getApi } from '@/util/api';
import { mapState, mapActions } from 'vuex';
export default {
  name: 'ProductsContainer',
  components: {
    Loading,
    CarouselPromo,
    AllProducts
  },
  computed: {
    ...mapState(['products', 'promos'])
  },
  data() {
    return {
      loadingPromos: false,
      loadingProducts: false
    };
  },
  methods: {
    ...mapActions(['setProducts', 'setError', 'setPromos']),
    async fetchProducts() {
      this.loadingProducts = true;
      await getApi(products)
        .then(res => {
          this.setProducts(res.data);
          this.loadingProducts = false;
        })
        .catch(err => {
          this.setError(err);
          this.loadingProducts = false;
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
  mounted() {
    if (!this.products) {
      this.fetchProducts();
    }
    if (!this.promos) {
      this.fetchPromos();
    }
  }
};
</script>
