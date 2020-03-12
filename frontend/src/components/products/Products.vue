<template>
  <div>
    <br />
    <div class="container clickable">
      <div class="row">
        <div v-if="loading" class="col-12">
          <Loading />
        </div>
        <div v-else class="col-12">
          <div class="row">
            <div class="col-12 col-md-6 col-lg-3">
              <div v-for="item in data" :key="item._id" @click="goProduct(item._id)">
                <div class="card bg-light mb-3" style="max-width: 18rem;">
                  <div class="card-header">{{ item.nombre }}</div>
                  <div class="card-body">
                    <img alt src="`../../assets/${item.imagen}`" />
                    <h5 class="card-title">{{ item.nombre }}</h5>
                    <p class="card-text">{{ item.caracteristicas }}</p>
                  </div>
                </div>
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
import Loading from "../loading";
export default {
  name: "Products",
  components: {
    Loading
  },
  data() {
    return {
      loading: true,
      data: [],
      error: null
    };
  },
  methods: {
    fetch() {
      console.log(this.$route.params.id);
      fetch(apiurl + products)
        .then(data => {
          if (data.ok) {
            return data.json();
          }
        })
        .then(info => {
          this.loading = false;
          this.data = info.filter(producto => {
            return producto.idCategoria == this.$route.params.id;
          });
        })
        .catch(err => {
          this.error = err;
        });
    },
    goProduct(id) {
      this.$router.push({ path: `/${id}` });
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

<style scoped></style>
