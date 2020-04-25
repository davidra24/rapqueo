<template>
  <div class="d-flex justify-content-center">
    <div class="col-12 col-md-10 col-lg-8">
      <b-card bg-variant="light" :header="estado" class="text-center">
        <div class="d-flex justify-content-start">
          <strong class="left">Nombre:</strong>
          <div class="right">{{ order.nombre_usuario }}</div>
        </div>
        <div class="d-flex justify-content-start">
          <strong class="left">Telefono:</strong>
          <div class="right">{{ formatTelephone(order.telefono) }}</div>
        </div>
        <div class="d-flex justify-content-start">
          <strong class="left">Fecha y hora de pedido:</strong>
          <div class="right">{{ order.hora_fecha }}</div>
        </div>
        <div class="d-flex justify-content-start">
          <strong class="left">Metodo de pago:</strong>
          <div class="right">{{ order.metodo_pago }}</div>
        </div>
        <div class="d-flex justify-content-start flex-column">
          <div class="d-flex">
            <strong class="left">Direccion:</strong>
            <div class="right">
              {{ order.direccion.direccion }},
              {{ order.direccion.barrio }}
            </div>
          </div>
          <div class="d-flex" v-if="order.direccion.datos_adicionales">
            <strong class="left">Datos adicionales:</strong>
            <div class="right">{{ order.direccion.datos_adicionales }}</div>
          </div>
        </div>
        <div class="d-flex justify-content-start">
          <strong class="left">Total:</strong>
          <div class="right">${{ order.total }}</div>
        </div>
        <br />
        <div class="container">
          <div class="row">
            <div
              class="col-12 col-md-6 col-lg-6"
              v-for="product in order.productos"
              :key="product.id"
            >
              <md-card overlay style>
                <md-card-header>
                  <div class="d-flex flex-column">
                    <div class="d-flex justify-content-start">
                      <strong>Producto:</strong>
                      {{ product.nombre }}
                    </div>
                    <div class="d-flex justify-content-start">
                      <strong>Tamaño:</strong>
                      {{ product.caracteristicas }}
                    </div>
                    <div class="d-flex justify-content-start">
                      <strong>Cantidad:</strong>
                      {{ product.cantidad }}
                    </div>
                    <div class="d-flex justify-content-start">
                      <strong>Precio:</strong>
                      ${{ product.precio }}
                    </div>
                  </div>
                </md-card-header>
              </md-card>
            </div>
          </div>
        </div>
        <br />
        <button
          v-if="boton && this.user.admin"
          class="btn btn-block btn-success"
          @click="changeState()"
        >{{ this.boton }}</button>
      </b-card>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "OneOrder",
  props: ["order"],
  data() {
    return {
      estado: "",
      boton: ""
      //state: 0,
    };
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    formatTelephone(number) {
      const phone = number.split("");
      var result = "";
      result += `${phone[3]}${phone[4]}${phone[5]} ${phone[6]}${phone[7]}${phone[8]} ${phone[9]}${phone[10]}${phone[11]}${phone[12]}`;
      return result;
    },
    changeState() {
      this.order.estado += 1;
      this.validateState();
      // this.saveState(this.order.estado);
    },
    async validateState() {
      if (this.order.estado === 0) {
        this.estado = "Pedido pendiente";
        this.boton = "Pedido en camino";
      } else {
        if (this.order.estado === 1) {
          this.estado = "Pedido en camino";
          this.boton = "Pedido entregado";
        } else {
          this.estado = "Pedido entregado";
          this.boton = "";
        }
      }
    }
  },
  mounted() {
    this.validateState();
  }
};
</script>

<style scoped>
.left {
  margin-left: 10%;
  text-align: left;
  width: 40%;
}
.right {
  margin-right: 10%;
  text-align: left;
  width: 40%;
}
</style>
