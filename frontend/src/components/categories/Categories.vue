<template>
  <div>
    <br />
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h2>
            <strong>NAVEGA ENTRE LAS CATEGORIAS</strong>
          </h2>
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
          <div class="row">
            <div
              class="col-12 col-md-6 col-lg-4 clickable"
              style="margin-bottom: 2%;"
              v-for="categorie in filterCategories"
              :key="categorie.id"
              @click="goProducts(categorie.id)"
            >
              <b-card
                class="overflow-hidden"
                style="min-height:100%; max-height: 100%;"
              >
                <b-row no-gutters class="d-flex align-items-center">
                  <b-col md="6" align-self="center">
                    <b-card-img
                      class="resize-img"
                      :alt="categorie.name"
                      :src="foto"
                    ></b-card-img>
                  </b-col>
                  <b-col md="6">
                    <b-card-body>
                      <h5>{{ categorie.name }}</h5>
                      <md-content class="md-scrollbar">
                        <b-card-text class="text-left">{{
                          categorie.description
                        }}</b-card-text>
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
//import { photos } from "@/util/constants";
//import { getOneOrManyApi } from "@/util/api";

export default {
  name: "Categories",
  data() {
    return {
      filterCategorie: "",
      //foto: this.getPhoto(this.categorie.id_photo)
    };
  },
  computed: {
    ...mapState(["categories"]),
    filterCategories() {
      if (this.filterCategorie != "") {
        return this.categories.filter((categorie) => {
          return categorie.name
            .toLowerCase()
            .includes(this.filterCategorie.toLowerCase());
        });
      } else {
        return this.categories;
      }
    },
  },
  methods: {
    goProducts(id) {
      this.$router.push({ path: `/categorias/${id}` });
    },
    /*
    async getPhoto(id) {
      await getOneOrManyApi(photos, id)
        .then((res) => {
          return res.data.image;
        })
        .catch((err) => {
          this.setError(err);
        });
    },*/
  },
  mounted() {},
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
