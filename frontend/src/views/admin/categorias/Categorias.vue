<template>
  <div class="container">
    <div class="row">
      <div v-if="loadingCategories" class="col-12">
        <Loading />
      </div>
      <div v-else class="col-12">
        <CategoriesAdminComponent />
        <vue-fab mainBtnColor="#448AFF" @clickMainBtn="clickAdd" size="big"></vue-fab>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/loading";
import CategoriesAdminComponent from "@/components/admin/categorias/Categorias";
import { categories } from "@/util/constants";
import { getApi } from "@/util/api";
import { mapState, mapActions } from "vuex";

export default {
  name: "CategoriasAdmin",
  components: {
    Loading,
    CategoriesAdminComponent
  },
  computed: {
    ...mapState(["categories", "user"])
  },
  data() {
    return {
      loadingCategories: false
    };
  },
  methods: {
    ...mapActions(["setCategories", "setError"]),
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
      this.$router.push("/admin/agregar/categoria");
    }
  },
  mounted() {
    //this.validateAdmin();
    if (!this.categories) {
      this.fetchCategories();
    }
  }
};
</script>

<style scoped></style>
