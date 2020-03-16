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
            <div
              class="col-12 col-md-6 col-lg-4"
              v-for="item in data"
              :key="item._id"
            >
              <Product v-bind:product="item" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { apiurl, products } from '../../util/constants';
import Loading from '../loading';
import Product from './Product';
export default {
  name: 'Products',
  components: {
    Loading,
    Product
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
