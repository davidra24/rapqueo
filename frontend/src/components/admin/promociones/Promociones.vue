<template>
  <div>
    <br />
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h2>
            <strong>PROMOCIONES</strong>
          </h2>
          <div class="row">
            <div
              class="col-12 col-md-6 col-lg-4"
              style="margin-bottom: 2%; cursor: pointer;"
              v-for="promo in promos"
              :key="promo._id"
              @click="goPromo(promo._id)"
            >
              <b-card style="min-height:18rem;max-width:20rem;">
                <span class="md-title">{{ promo.producto.nombre }}</span>
                <br />
                <div>{{formatDate(promo.fechaInicio)}} - {{formatDate(promo.fechaFin)}}</div>
                <strong>{{validarPromo(promo)}}</strong>
                <div class="row">
                  <div class="col-8">
                    <md-badge
                      class="md-primary badge-percent"
                      v-bind:md-content="promo.porcentaje + '%'"
                    ></md-badge>
                    <img
                      class="resize-img"
                      v-bind:src="promo.producto.foto"
                      v-bind:alt="promo.producto.nombre"
                    />
                  </div>
                  <div class="d-flex align-items-start flex-column bd-highlight mb-3">
                    <br />
                    <b-card-text class="small text-muted">
                      <span
                        class="md-body-2"
                        style="text-decoration: line-through;"
                      >${{ promo.producto.caracteristicas.precio }}</span>
                    </b-card-text>
                    <b-card-text>
                      <span class="md-subheading">
                        <strong>
                          {{
                          promo.producto.caracteristicas.precio *
                          (1 - promo.porcentaje / 100)
                          }}
                        </strong>
                      </span>
                    </b-card-text>
                  </div>
                </div>
                <b-card-text>
                  <span class="md-body-1">{{ promo.mensaje }}</span>
                </b-card-text>
              </b-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "PromocionesAdminComponent",
  computed: {
    ...mapState(["promos"])
  },
  methods: {
    goPromo(id) {
      this.$router.push({ path: `/admin/editar/promociones/${id}` });
    },
    formatDate(date) {
      const newDate = date.split("");
      var result = "";
      result += `${newDate[8]}${newDate[9]}/${newDate[5]}${newDate[6]}/${newDate[0]}${newDate[1]}${newDate[2]}${newDate[3]}`;
      return result;
    },
    validateFecha(fechaInicio, fechaFin) {
      var initialDate = new Date(fechaInicio);
      var finalDate = new Date(fechaFin);
      var actualDate = new Date();
      return (
        initialDate.getTime() < actualDate.getTime() &&
        finalDate.getTime() > actualDate.getTime()
      );
    },
    validarPromo(promo) {
      if (
        promo.producto.caracteristicas.cantidad > 0 &&
        this.validateFecha(promo.fechaInicio, promo.fechaFin)
      ) {
        return "Promocion activa";
      } else {
        return "Promocion inactiva";
      }
    }
  }
};
</script>

<style scoped>
.resize-img {
  width: 10rem;
  height: 8rem;
}
.md-mini-mini {
  width: 2rem;
  height: 2rem;
}
.mrg-btn {
  margin-top: 5%;
  margin-bottom: 5%;
}

.badge-percent {
  width: 2rem;
  height: 2rem;
  font-size: 1em;
}
</style>