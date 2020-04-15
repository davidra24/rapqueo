<template>
  <div>
    <p>Nombre: {{order.nombre_usuario}}</p>
    <p>Telefono: {{formatTelephone(order.telefono)}}</p>
    <p>Fecha y hora de pedido: {{order.hora_fecha}}</p>
    <p>Metodo de pago: {{order.metodo_pago}}</p>
    <div>
      Direccion:
      <p>
        {{order.direccion.direccion}}
        {{order.direccion.barrio}}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "OneOrder",
  props: ["order"],
  data() {
    return {};
  },
  methods: {
    formatTelephone(number) {
      const phone = number.split("");
      var result = "";
      result += `${phone[3]}${phone[4]}${phone[5]} ${phone[6]}${phone[7]}${phone[8]} ${phone[9]}${phone[10]}${phone[11]}${phone[12]}`;
      return result;
    }
  }
};
</script>

<style scoped>
</style>
