<template>
  <div class="row">
    <div v-if="loading" class="col-12">
      <Loading />
    </div>
    <div v-else class="col-12">
      <AllPromos />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { promos } from '@/util/constants';
import { getApi } from '@/util/api';
import Loading from '@/components/loading';
import AllPromos from '@/components/promos/AllPromos.vue';
export default {
  name: 'PromosContainer',
  components: {
    AllPromos,
    Loading,
  },
  computed: {
    ...mapState(['promos']),
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    ...mapActions(['setPromos', 'setError']),
    async fetch() {
      this.loading = true;
      await getApi(promos)
        .then((respuesta) => {
          this.setPromos(respuesta.data);
          this.loading = false;
        })
        .catch((err) => {
          this.setError(err);
          this.loading = false;
        });
    },
  },
  mounted() {
    if (!this.promos) {
      this.fetch();
    }
  },
};
</script>
