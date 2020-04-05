<template>
  <div>PERFIL</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Perfil',
  computed: {
    ...mapState(['user'])
  },
  methods: {
    validataUser() {
      const usrId = this.$route.params.id;
      if (this.user) {
        if (this.user.id !== usrId) {
          this.$router.push('/');
        }
      } else {
        this.$router.push('/');
      }
    }
  },
  mounted() {
    this.validataUser();
  }
};
</script>

<style scoped></style>
