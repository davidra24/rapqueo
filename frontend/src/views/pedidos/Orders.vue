<template>
  <div class="container">
    <br />
    <div class="row">
      <div v-if="loading" class="col-12">
        <Loading />
      </div>
      <div v-else-if="!ordersUser || ordersUser.length <= 0" class="col-12">
        <h2>
          <strong>
            NO HA REALIZADO PEDIDOS
            <br />
          </strong>
        </h2>
      </div>
      <div v-else class="col-12">
        <h3>Mis pedidos</h3>
        <Orders />
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/loading";
import { getOneOrManyApi } from "@/util/api";
import { ordersByUser } from "@/util/constants";
import Orders from "@/components/orders/Orders.vue";
import { mapState, mapActions } from "vuex";
export default {
  name: "PedidosUsuario",
  components: {
    Loading,
    Orders
  },
  data() {
    return {
      loading: false
    };
  },
  computed: {
    ...mapState(["user", "ordersUser"])
  },
  methods: {
    ...mapActions(["setOrdersUser", "setUser", "setError"]),
    fetch(id) {
      this.loading = true;
      getOneOrManyApi(ordersByUser, id)
        .then(res => {
          this.setOrdersUser(res.data);
          this.loading = false;
        })
        .catch(err => {
          this.setError(err);
          this.loading = false;
        });
    },
    async validateUser() {
      const usrId = await this.$route.params.id;
      if (this.user) {
        if (this.user.id !== usrId) {
          await this.$router.push("/");
        } else {
          this.fetch(usrId);
        }
      } else {
        await this.$router.push("/");
      }
    }
  },
  async mounted() {
    await this.validateUser();
  }
};
</script>

<style scoped></style>
