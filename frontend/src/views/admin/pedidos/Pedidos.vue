<template>
  <div class="d-flex justify-content-center">
    <div class="col-12 col-md-10 col-lg-8">
      <div>
        <md-tabs md-alignment="fixed">
          <md-tab md-label="Pendientes" md-icon="local_post_office" @click="goPedidos(0)"></md-tab>
          <md-tab md-label="En camino" md-icon="local_shipping" @click="goPedidos(1)"></md-tab>
          <md-tab md-label="Entregados" md-icon="done" @click="goPedidos(2)"></md-tab>
        </md-tabs>
      </div>
      <div class="container">
        <br />
        <div class="row">
          <div v-if="loading" class="col-12">
            <Loading />
          </div>
          <div v-else-if="!ordersState || ordersState.length === 0" class="col-12">
            <h2>
              <strong>
                NO HAY PEDIDOS PARA ESTA CATEGORÍA
                <br />
              </strong>
            </h2>
          </div>
          <div v-else class="col-12">
            <Pedidos />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/loading";
import { getOneOrManyApi } from "@/util/api";
import { ordersByState } from "@/util/constants";
import { mapState, mapActions } from "vuex";
import Pedidos from "@/components/admin/pedidos/Pedidos";
export default {
  name: "PedidosAdmin",
  components: {
    Loading,
    Pedidos
  },
  data() {
    return {
      loading: false
    };
  },
  computed: {
    ...mapState(["user", "ordersState"])
  },
  methods: {
    ...mapActions(["setOrdersState", "setError"]),
    async fetch(id) {
      this.loading = true;
      await getOneOrManyApi(ordersByState, id)
        .then(res => {
          this.setOrdersState(res.data);
          console.log(res.data);
          this.loading = false;
        })
        .catch(err => {
          this.setError(err);
          this.loading = false;
        });
    },
    goPedidos(state) {
      const id = state;
      if (!this.ordersState) {
        this.fetch(id);
      } else if (this.ordersState.length === 0) {
        this.fetch(id);
      } else if (this.ordersState[0].State != id) {
        this.fetch(id);
      }
    },
    validateAdmin() {
      if (this.user) {
        if (!this.user.admin) {
          this.$router.push("/");
        } else {
          this.goPedidos(0);
        }
      } else {
        this.$router.push("/");
      }
    }
  },
  mounted() {
    this.validateAdmin();
  }
};
</script>

<style scoped></style>
