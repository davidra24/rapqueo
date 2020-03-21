<template>
  <div>
    <br />
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h2>
            <strong>NAVEGA ENTRE LAS CATEGORIAS</strong>
          </h2>
          <div class="row">
            <div
              class="col-12 col-md-6 col-lg-4 clickable"
              style="margin-bottom: 2%;"
              v-for="categorie in categories"
              :key="categorie._id"
              @click="goProducts(categorie._id)"
            >
              <b-card class="overflow-hidden" style="min-height:100%; max-height: 100%;">
                <b-row no-gutters class="d-flex align-items-center">
                  <b-col md="6" align-self="center">
                    <b-card-img
                      class="resize-img"
                      :alt="categorie.nombre"
                      :src="require(`@/assets/img/${categorie.imagen}`)"
                    ></b-card-img>
                  </b-col>
                  <b-col md="6">
                    <b-card-body :title="categorie.nombre">
                      <md-content class="md-scrollbar">
                        <b-card-text>{{ categorie.descripcion }}</b-card-text>
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

export default {
  name: "Categories",
  computed: {
    ...mapState(["categories"])
  },
  methods: {
    goProducts(id) {
      this.$router.push({ path: `/categorias/${id}` });
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
