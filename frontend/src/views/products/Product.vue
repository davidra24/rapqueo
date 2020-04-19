<template>
  <div>
    <br />
    <div class="container clickable">
      <div class="row">
        <div v-if="loading" class="col-12">
          <Loading />
        </div>
        <div v-else class="col-12">
          <OneProduct />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { products } from '@/util/constants';
import { getOneOrManyApi } from '@/util/api';
import Loading from '@/components/loading';
import OneProduct from '@/components/products/OneProduct.vue';
export default {
  name: 'Product',
  components: {
    Loading,
    OneProduct,
  },
  computed: {
    ...mapState(['product']),
  },
  data() {
    return {
      loading: true,
    };
  },
  methods: {
    ...mapActions(['setProduct', 'setError']),
    async fetch(id) {
      await getOneOrManyApi(products, id)
        .then((res) => {
          this.setProduct(res.data);
          this.loading = false;
        })
        .catch((err) => {
          this.setError(err);
          this.loading = false;
        });
    },
  },
  mounted() {
    const id = this.$route.params.id;
    if (!this.product || this.product._id != id) {
      this.fetch(id);
    } else {
      this.loading = false;
    }
  },
};
</script>
<style lang="stylus" scoped></style>
