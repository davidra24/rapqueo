<template>
  <div>PEDIDOS USUARIO</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'PedidosUsuario',
  computed: {
    ...mapState(['user'])
  },
  methods: {
    validateAdmin() {
      const usrId = this.$route.params.id;
      if (this.user) {
        if (this.user.admin) {
          this.$router.push('/');
        } else if (this.user.id !== usrId) {
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
