<template>
  <div>
    <br />
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h2>
            <strong>CATEGORIAS</strong>
          </h2>
          <div class="row">
            <div class="col-12">
              <div class="row d-flex justify-content-center">
                <div class="col-8">
                  <md-field>
                    <label>Buscar categorías</label>
                    <md-input
                      name="search"
                      id="search"
                      v-model="filterCategorie"
                      md-layout="box"
                      class="text-center"
                    />
                  </md-field>
                </div>
              </div>
            </div>
            <div
              class="col-12 col-md-6 col-lg-4 clickable"
              style="margin-bottom: 2%;"
              v-for="categorie in filterCategories"
              :key="categorie._id"
              @click="goProducts(categorie._id)"
            >
              <b-card class="overflow-hidden" style="min-height:100%; max-height: 100%;">
                <b-row no-gutters class="d-flex align-items-center">
                  <b-col md="6" align-self="center">
                    <b-card-img
                      class="resize-img"
                      :alt="categorie.nombre"
                      :src="buscarImagen(categorie.imagen)"
                    ></b-card-img>
                  </b-col>
                  <b-col md="6">
                    <b-card-body>
                      <h5>{{categorie.nombre}}</h5>
                      <md-content class="md-scrollbar">
                        <b-card-text class="text-left">{{ categorie.descripcion }}</b-card-text>
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
import { mapState } from "vuex";
import { buscarImagen } from "../../../util/images";

export default {
  name: "CategoriesAdminComponent",
  data() {
    return {
      filterCategorie: ""
    };
  },
  computed: {
    ...mapState(["categories"]),
    filterCategories() {
      if (this.filterCategorie != "") {
        return this.categories.filter(categorie => {
          return categorie.nombre
            .toLowerCase()
            .includes(this.filterCategorie.toLowerCase());
        });
      } else {
        return this.categories;
      }
    }
  },
  methods: {
    buscarImagen(name) {
      return buscarImagen(name);
    },
    goProducts(id) {
      this.$router.push({ path: `/admin/editar/categorias/${id}` });
    }
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
