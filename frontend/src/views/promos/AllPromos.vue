<template>
  <div class="container">
    <div class="row">
      <div v-if="loading" class="col-12">
        <Loading />
      </div>
      <div v-else class="col-12">
        <div class="col-12">
          <div class="row">
            <AllPromos />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { filteredPromos } from "@/util/constants";
import { getApi } from "@/util/api";
import Loading from "@/components/loading";
import AllPromos from "@/components/promos/AllPromos.vue";
export default {
  name: "PromosContainer",
  components: {
    AllPromos,
    Loading
  },
  computed: {
    ...mapState(["filteredPromos"])
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    ...mapActions(["setFilteredPromos", "setError"]),
    async fetch() {
      this.loading = true;
      await getApi(filteredPromos)
        .then(respuesta => {
          this.setFilteredPromos(respuesta.data);
          this.loading = false;
        })
        .catch(err => {
          this.setError(err);
          this.loading = false;
        });
    }
  },
  mounted() {
    if (!this.filteredPromos) {
      this.fetch();
    }
  }
};
</script>
