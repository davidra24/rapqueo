<template>
  <div>
    <br />

    <br />
    <div class="container">
      <div class="row">
        <div v-if="loading" class="col-12">
          <Loading />
        </div>
        <div v-else class="col-12">
          <OnePromo />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { promos } from '@/util/constants';
import { getOneOrManyApi } from '@/util/api';
import Loading from '@/components/loading';
import OnePromo from '@/components/promos/OnePromo';
export default {
  name: 'Promo',
  components: {
    Loading,
    OnePromo,
  },
  computed: {
    ...mapState(['promo']),
  },
  data() {
    return {
      loading: true,
    };
  },
  methods: {
    ...mapActions(['setPromo', 'setError']),
    async fetch(id) {
      await getOneOrManyApi(promos, id)
        .then((res) => {
          this.setPromo(res.data);
          this.loading = false;
        })
        .catch((error) => {
          this.setError(error);
          this.loading = false;
        });
    },
  },
  mounted() {
    const id = this.$route.params.id;
    if (!this.promo || this.promo._id != id) {
      this.fetch(id);
    } else {
      this.loading = false;
    }
  },
};
</script>
<style lang="stylus" scoped></style>
