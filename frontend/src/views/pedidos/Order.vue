<template>
  <div>
    <br />
    <div class="container clickable">
      <div class="row">
        <div v-if="loading" class="col-12">
          <Loading />
        </div>
        <div v-else class="col-12">
          <OneOrder v-bind:order="order" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { pedidos } from "@/util/constants";
import { getOneOrManyApi } from "@/util/api";
import Loading from "@/components/loading";
import OneOrder from "@/components/orders/OneOrder";
export default {
  name: "Order",
  components: {
    Loading,
    OneOrder
  },
  computed: {
    ...mapState(["order"])
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    ...mapActions(["setOrder", "setError"]),
    async fetch(id) {
      this.loading = true;
      await getOneOrManyApi(pedidos, id)
        .then(res => {
          this.setOrder(res.data);
          this.loading = false;
        })
        .catch(err => {
          this.setError(err);
          this.loading = false;
        });
    }
  },
  mounted() {
    console.log(this.$route.params.id);
    const id = this.$route.params.id;
    if (!this.order || this.order._id != id) {
      this.fetch(id);
    }
  }
};
</script>
<style lang="stylus" scoped></style>
