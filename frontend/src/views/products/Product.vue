<template>
  <div>
    <br />
    <div class="container clickable">
      <div class="row">
        <div v-if="loading" class="col-12">
          <Loading />
        </div>
        <div v-else class="col-12">
          <div v-for="item in data" :key="item._id">
            <OneProduct v-bind:product="item" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiurl, products } from '../../util/constants';
import Loading from '../../components/loading';
import OneProduct from './OneProduct';
export default {
  name: 'OneProducts',
  components: {
    Loading,
    OneProduct
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
      fetch(apiurl + products)
        .then(data => {
          if (data.ok) {
            return data.json();
          }
        })
        .then(info => {
          this.loading = false;
          this.data = info.filter(producto => {
            return producto._id == this.$route.params.id;
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
<style lang="stylus" scoped></style>
