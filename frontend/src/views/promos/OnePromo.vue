<template>
  <div>
    <br />
    <div class="container">
      <div class="row">
        <div v-if="loading" class="col-12">
          <Loading />
        </div>
        <div v-else class="col-12">
          <div class="row">
            <div class="col-12" v-for="item in data" :key="item._id">
              <Promos v-bind:promo="item" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { apiurl, promos } from "../../util/constants";
import Loading from "../../components/loading";
import Promos from "../../components/promos/Promos";
export default {
  name: "AllPromos",
  components: {
    Loading,
    Promos
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
      fetch(apiurl + promos)
        .then(data => {
          if (data.ok) {
            return data.json();
          }
        })
        .then(info => {
          this.loading = false;
          this.data = info.filter(promo => {
            return promo._id == this.$route.params.id;
          });
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
.clickable {
  cursor: pointer;
}
</style>

<style scoped></style>
