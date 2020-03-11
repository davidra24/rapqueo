<template>
  <div>
    <br />
    <div class="container clickable">
      <div class="row">
        <div v-if="loading" class="col-12">Cargando...</div>
        <div v-else class="col-12 col-md-6 col-lg-3">
          <div v-for="item in data" :key="item._id" @click="goProducts(item._id)">
            <div class="card bg-light mb-3" style="max-width: 18rem;">
              <div class="card-header">{{ item.nombre }}</div>
              <div class="card-body">
                <img alt src="`../../assets/${item.imagen}`" />
                <h5 class="card-title">{{ item.imagen }}</h5>
                <p class="card-text">{{ item.descripcion }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiurl, categories } from "../../util/constans";
import { mapState, mapActions } from "vuex";
export default {
  name: "Categories",
  data() {
    return {
      loading: true,
      data: [],
      error: null
    };
  },
  computed: {
    ...mapState(["getCategories"])
  },
  methods: {
    ...mapActions(["addAllcategories"]),
    crearCategorias(categories) {
      this.addAllcategories(categories);
    },
    fetch() {
      fetch(apiurl + categories)
        .then(data => {
          if (data.ok) {
            return data.json();
          }
        })
        .then(info => {
          this.loading = false;
          this.data = info;
          this.crearCategorias(info);
          localStorage.setItem("categorias", info);
        })
        .catch(err => {
          this.error = err;
        });
    },
    goProducts(id) {
      this.$router.push({ path: `/categories/${id}` });
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.clickable {
  cursor: pointer;
}
</style>
