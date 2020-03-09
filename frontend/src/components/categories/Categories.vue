<template>
  <div>
    <br />
    <div class="container">
      <div class="row">
        <div v-if="loading" class="col-12">Cargando...</div>
        <div v-else class="col-12 col-md-6 col-lg-3">
          <div v-for="item in data" :key="item._id">
            <div class="card bg-light mb-3" style="max-width: 18rem;">
              <div class="card-header">{{item.nombre}}</div>
              <div class="card-body">
                <img alt srcset />
                <h5 class="card-title">{{item.imagen}}</h5>
                <p class="card-text">{{item.descripcion}}</p>
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
export default {
  name: "Categories",
  data() {
    return {
      loading: true,
      data: [],
      error: null
    };
  },
  methods: {
    fetch() {
      fetch(apiurl + categories, {
        type: "cors"
      })
        .then(data => {
          if (data.ok) {
            return data.json();
          }
        })
        .then(info => {
          this.loading = false;
          this.data = info;
        })
        .catch(err => {
          this.error = err;
        });
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
