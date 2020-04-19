<template>
  <div class="container">
    <div class="row">
      <div v-if="loadingProductos" class="col-12">
        <Loading />
      </div>
      <div v-else class="col-12">
        <ProductosAdminComponent />
        <vue-fab mainBtnColor="#448AFF" @clickMainBtn="clickAdd" size="big"></vue-fab>
      </div>
    </div>
  </div>
</template>


<script>
import Loading from "../../../components/loading";
import { mapState, mapActions } from "vuex";
import ProductosAdminComponent from "../../../components/admin/productos/Productos";
import { products } from "../../../util/constants";
import { getApi } from "../../../util/api";
export default {
  name: "ProductosAdmin",
  computed: {
    ...mapState(["user", "products"])
  },
  data() {
    return {
      loadingProductos: false
    };
  },
  components: { Loading, ProductosAdminComponent },
  methods: {
    ...mapActions(["setProducts", "setError"]),
    async fetchProducts() {
      this.loadingProductos = true;
      await getApi(products)
        .then(res => {
          this.setProducts(res.data);
          this.loadingProductos = false;
        })
        .catch(err => {
          this.setError(err);
          this.loadingProductos = false;
        });
    },
    validateAdmin() {
      if (this.user) {
        if (!this.user.admin) {
          this.$router.push("/");
        }
      } else {
        this.$router.push("/");
      }
    },
    clickAdd() {
      this.$router.push("/admin/agregar/producto");
    }
  },
  mounted() {
    //this.validateAdmin();
    if (!this.products) {
      this.fetchProducts();
    }
  }
};
</script>

<style scoped></style>
