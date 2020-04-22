<template>
  <div class="row d-flex justify-content-center" style="margin-bottom: 4%; heigth:20%">
    <div class="col-12">
      <b-card bg-variant="light" :header="estado" class="text-center">
        <div class="d-flex justify-content-start">
          <strong class="left col-6">Nombre:</strong>
          <div class="right">{{ order.nombre_usuario }}</div>
        </div>
        <div class="d-flex justify-content-start">
          <strong class="left col-6">Telefono:</strong>
          <div class="right">{{ formatTelephone(order.telefono) }}</div>
        </div>

        <div class="d-flex justify-content-start">
          <strong class="left col-6">Metodo de pago:</strong>
          <div class="right">{{ order.metodo_pago }}</div>
        </div>
        <div class="d-flex justify-content-start flex-column">
          <div class="d-flex">
            <strong class="left col-6">Direccion:</strong>
            <div class="right">{{ order.direccion.direccion }}</div>
          </div>
        </div>
        <div class="d-flex justify-content-start">
          <strong class="left col-6">Total:</strong>
          <div class="right">${{ order.total }}</div>
        </div>
        <br />
        <md-button class="btn btn-block md-raised md-primary" @click="goOrder(order._id)">Ver pedido</md-button>
      </b-card>
    </div>
  </div>
</template>

<script>
import Loading from "../loading";
export default {
  name: "Order",
  props: ["order"],
  component: {
    Loading
  },
  data() {
    return {
      estado: ""
    };
  },
  methods: {
    formatTelephone(number) {
      const phone = number.split("");
      var result = "";
      result += `${phone[3]}${phone[4]}${phone[5]} ${phone[6]}${phone[7]}${phone[8]} ${phone[9]}${phone[10]}${phone[11]}${phone[12]}`;
      return result;
    },
    validateState() {
      if (this.order.estado === 0) {
        this.estado = "Pedido pendiente";
      } else {
        if (this.order.estado === 1) {
          this.estado = "Pedido en progreso";
        } else {
          this.estado = "Pedido entregado";
        }
      }
    },
    goOrder(id) {
      this.$router.push({ path: `/pedido/${id}` });
    }
  },
  mounted() {
    this.validateState();
  }
};
</script>

<style scoped>
.left {
  text-align: left;
}
.right {
  text-align: left;
}
</style>
