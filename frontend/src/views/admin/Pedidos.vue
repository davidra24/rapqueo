<template>
  <div>PEDIDOS</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'PedidosAdmin',
  computed: {
    ...mapState(['user'])
  },
  methods: {
    validateAdmin() {
      if (this.user) {
        if (!this.user.admin) {
          this.$router.push('/');
        }
      } else {
        this.$router.push('/');
      }
    }
  },
  mounted() {
    this.validateAdmin();
  }
};
</script>

<style scoped></style>
