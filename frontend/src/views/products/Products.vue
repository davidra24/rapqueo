<template>
  <div>
    <br />
    <div class="row">
      <div v-if="loading" class="col-12">
        <Loading />
      </div>
      <div v-else-if="productsCategorie.length === 0" class="col-12">
        <h2>
          <strong>
            NO HAY PRODUCTOS PARA ESTA CATEGORÍA
            <br />:(
          </strong>
        </h2>
      </div>
      <div v-else class="col-12">
        <Products />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Loading from "@/components/loading";
import { getOneOrManyApi } from "@/util/api";
import { productsByCategorie } from "@/util/constants";
import Products from "@/components/products/Products.vue";
import { mapState, mapActions } from "vuex";
export default {
  name: "ProductsContainer",
  components: {
    Loading,
    Products
  },
  data() {
    return {
      loading: false
    };
  },
  computed: {
    ...mapState(["productsCategorie"])
  },
  methods: {
    ...mapActions(["setProductsCategorie", "setError"]),
    async fetch(id) {
      this.loading = true;
      await getOneOrManyApi(productsByCategorie, id)
        .then(res => {
          this.setProductsCategorie(res.data);
          console.log(res.data);

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
    if (
      !this.productsCategorie ||
      this.productsCategorie[0].idCategoria != id
    ) {
      this.fetch(id);
    }
  }
};
</script>
