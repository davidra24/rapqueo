<template>
  <div>
    <br />
    <div class="container">
      <div class="row">
        <div v-if="loading" class="col-12">
          <Loading />
        </div>
        <div v-else class="col-12">
          <CarouselPromo />
          <h2>
            <strong>NAVEGA ENTRE LAS CATEGORIAS</strong>
          </h2>
          <div class="row">
            <div
              class="col-12 col-md-6 col-lg-4 clickable"
              style="margin-bottom: 2%;"
              v-for="item in data"
              :key="item._id"
              @click="goProducts(item._id)"
            >
              <b-card
                class="overflow-hidden"
                style="min-height:100%; max-height: 100%;"
              >
                <b-row no-gutters class="d-flex align-items-center">
                  <b-col md="6" align-self="center">
                    <b-card-img
                      class="resize-img"
                      :alt="item.nombre"
                      :src="require(`@/assets/img/${item.imagen}`)"
                    ></b-card-img>
                  </b-col>
                  <b-col md="6">
                    <b-card-body :title="item.nombre">
                      <md-content class="md-scrollbar">
                        <b-card-text>{{ item.descripcion }}</b-card-text>
                      </md-content>
                    </b-card-body>
                  </b-col>
                </b-row>
              </b-card>
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CarouselPromo from '../promos';
import { apiurl, categories } from '../../util/constants';
import Loading from '../loading';
import { mapState, mapActions } from 'vuex';
export default {
  name: 'Categories',
  components: {
    Loading,
    CarouselPromo
  },
  data() {
    return {
      loading: true,
      data: [],
      error: null
    };
  },
  computed: {
    ...mapState(['categories'])
  },
  methods: {
    ...mapActions(['addAllcategories']),
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
          localStorage.setItem('categorias', info);
        })
        .catch(err => {
          this.error = err;
        });
    },
    goProducts(id) {
      this.$router.push({ path: `/categorias/${id}` });
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
.resize-img {
  width: 8rem;
  margin-bottom: auto;
  margin-top: auto;
}
</style>
