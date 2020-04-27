<template>
  <div class="container">
    <div class="row">
      <div v-if="loadingPromociones" class="col-12">
        <Loading />
      </div>
      <div v-else class="col-12">
        <PromocionesAdminComponent />
        <vue-fab mainBtnColor="#448AFF" @clickMainBtn="clickAdd" size="big"></vue-fab>
      </div>
    </div>
  </div>
</template>


<script>
import Loading from "../../../components/loading";
import { mapState, mapActions } from "vuex";
import PromocionesAdminComponent from "../../../components/admin/promociones/Promociones";
import { promos } from "../../../util/constants";
import { getApi } from "../../../util/api";
export default {
  name: "PromocionesAdmin",
  computed: {
    ...mapState(["user", "promos"])
  },
  data() {
    return {
      loadingPromociones: false
    };
  },
  components: { Loading, PromocionesAdminComponent },
  methods: {
    ...mapActions(["setPromos", "setError"]),
    async fetchPromos() {
      this.loadingPromociones = true;
      await getApi(promos)
        .then(res => {
          this.setPromos(res.data);
          this.loadingPromociones = false;
        })
        .catch(err => {
          this.setError(err);
          this.loadingPromociones = false;
        });
    },
    validateAdmin() {
      if (this.user) {
        if (!this.user.admin) {
          this.$router.push("/");
        } else {
          if (!this.promos) {
            this.fetchPromos();
          }
        }
      } else {
        this.$router.push("/");
      }
    },
    clickAdd() {
      this.$router.push("/admin/agregar/promocion");
    }
  },
  mounted() {
    this.validateAdmin();
  }
};
</script>

<style scoped></style>
