<template>
  <div class="row">
    <div v-if="loading" class="col-12">
      <Loading />
    </div>
    <div v-else class="col-12">
      <AllProducts />
    </div>
  </div>
</template>

<script>
import { products } from '@/util/constants';
import AllProducts from '@/components/products/AllProducts.vue';
import Loading from '@/components/loading';
import { getApi } from '@/util/api';
import { mapState, mapActions } from 'vuex';
export default {
  name: 'ProductsContainer',
  data() {
    return {
      loading: false
    };
  },
  components: {
    AllProducts,
    Loading
  },
  computed: {
    ...mapState(['products'])
  },
  methods: {
    ...mapActions(['setProducts']),
    async fetch() {
      this.loading = true;
      await getApi(products)
        .then(res => {
          this.setProducts(res.data);
          this.loading = false;
        })
        .catch(err => {
          this.setError(err);
          this.loading = false;
        });
    }
  },
  created() {
    if (!this.products) {
      this.fetch();
    }
  }
};
</script>
