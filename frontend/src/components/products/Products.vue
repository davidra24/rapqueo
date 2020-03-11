<template>
  <div>
    <br />
    <div class="container clickable">
      <div class="row">
        <div v-if="loading" class="col-12">Cargando...</div>
        <div v-else class="col-12 col-md-6 col-lg-3">
          <div v-for="item in data" :key="item._id" @click="goProduct(item._id)">
            <div>xd</div>
            <div class="card bg-light mb-3" style="max-width: 18rem;">
              <div class="card-header">{{ item.nombre }}</div>
              <div class="card-body">
                <img alt src="`../../assets/${item.imagen}`" />
                <h5 class="card-title">{{ item.foto[0] }}</h5>
                <p class="card-text">{{ item.id_categoria }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { apiurl, products } from "../../util/constans";
import { mapState, mapActions } from "vuex";
export default {
  name: "Products",
  data() {
    return {
      loading: true,
      data: [],
      error: null
    };
  },
  computed: {
    ...mapState(["getProducts"])
  },
  methods: {
    ...mapActions(["addAllproducts"]),
    crearCategorias(products) {
      this.addAllproducts(products);
    },
    fetch() {
      fetch(apiurl + products)
        .then(data => {
          if (data.ok) {
            return data.json();
          }
        })
        .then(info => {
          this.loading = false;
          this.data = info;
          this.crearProductos(info);
          localStorage.setItem("productos", info);
        })
        .catch(err => {
          this.error = err;
        });
    },
    goProduct(id_categoria, id) {
      this.$router.push({ path: `/categories/${id_categoria}/${id}` });
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

<script>
</script>
<style scoped></style>
