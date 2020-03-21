<template>
  <div>
    <br />
    <div class="container clickable">
      <div class="row">
        <div v-if="loading" class="col-12">
          <Loading />
        </div>
        <div v-else class="col-12">
          <OneProduct v-bind:product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { products } from "@/util/constants";
import { getOneOrManyApi } from "@/util/api";
import Loading from "@/components/loading";
import OneProduct from "@/components/products/OneProduct.vue";
import { mapState, mapActions } from "vuex";
export default {
  name: "OneProducts",
  components: {
    Loading,
    OneProduct
  },
  computed: {
    ...mapState(["product"])
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    ...mapActions(["setProduct", "setError"]),
    async fetch(id) {
      this.loading = true;
      await getOneOrManyApi(products, id)
        .then(res => {
          this.setProduct(res.data);
          this.loading = false;
        })
        .catch(err => {
          this.setError(err);
          this.loading = false;
        });
    }
  },
  created() {
    const id = this.$route.params.id;
    if (!this.product || this.product.id != id) {
      this.fetch(id);
    }
  }
};
</script>
<style lang="stylus" scoped></style>
