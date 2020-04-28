<template>
  <div class="container">
    <div class="row">
      <div class="col-12" v-if="loadingPromo">
        <Loading />
      </div>
      <div class="col-12" v-else>
        <div class="container">
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="d-flex justify-content-center">
                <div style="width: 100%;">
                  <img
                    class="resize-img"
                    v-bind:src="promo.producto.foto"
                    v-bind:alt="promo.producto.nombre"
                    style="width:80%"
                  />
                </div>
              </div>
            </div>
            <form
              novalidate
              class="md-layout col-12 col-sm-6 col-md-5 col-lg-6 d-flex justify-content-start"
              @submit.prevent="validate"
            >
              <md-card class="md-layout-item md-size-50 md-small-size-100">
                <md-card-header>
                  <div class="md-title">Promocion</div>
                </md-card-header>
                <md-card-content>
                  <div class="md-layout md-gutter">
                    <div
                      class="md-layout-item md-small-size-100 d-flex align-items-start flex-column"
                    >
                      <h6>Producto: {{promo.producto.nombre}}</h6>
                      <h6>Peso: {{promo.producto.caracteristicas.peso}}{{promo.producto.caracteristicas.unidad}}</h6>
                      <h6>Cantidad: {{promo.producto.caracteristicas.cantidad}}</h6>
                      <h6>Precio: ${{promo.producto.caracteristicas.precio}}</h6>
                    </div>
                    <div class="md-layout-item md-small-size-100">
                      <md-field :class="getValidationClass('porcentaje')">
                        <label for="porcentaje">Porcentaje de descuento</label>
                        <md-input
                          name="porcentaje"
                          id="porcentaje"
                          v-model="form.porcentaje"
                          :disabled="sending"
                        />
                        <span
                          class="md-error"
                          v-if="!$v.form.porcentaje.required"
                        >El porcentaje de descuento es requerido</span>
                        <span
                          class="md-error"
                          v-else-if="!$v.form.porcentaje.invalid"
                        >El formato de descuento es incorrecto</span>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 col-12">
                      <md-field :class="getValidationClass('mensaje')">
                        <label for="mensaje">Mensaje</label>
                        <md-textarea
                          name="mensaje"
                          id="mensaje"
                          v-model="form.mensaje"
                          :disabled="sending"
                        />
                        <span
                          class="md-error"
                          v-if="!$v.form.mensaje.required"
                        >El mensaje de descuento es requerido</span>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 col-12">
                      <md-datepicker
                        v-model="form.fechaInicio"
                        name="fechaInicio"
                        id="fechaInicio"
                        :disabled="sending"
                        :class="getValidationClass('fechaInicio')"
                        md-immediately
                      >
                        <label for="fechaInicio">Fecha inicio</label>
                        <span
                          class="md-error"
                          v-if="!$v.form.fechaInicio.required"
                        >La fecha inicial es requerida</span>
                        <span
                          class="md-error"
                          v-else-if="!$v.form.fechaInicio.invalid"
                        >La fecha inicial debe ser antes de la fecha final</span>
                      </md-datepicker>
                    </div>
                    <div class="md-layout-item md-small-size-100 col-12">
                      <md-datepicker
                        v-model="form.fechaFin"
                        name="fechaFin"
                        id="fechaFin"
                        :disabled="sending"
                        :class="getValidationClass('fechaFin')"
                        md-immediately
                        @md-closed="validDates()"
                      >
                        <label for="fechaFinal">Fecha final</label>
                        <span
                          class="md-error"
                          v-if="!$v.form.fechaFin.required"
                        >La fecha final es requerida</span>
                        <span
                          class="md-error"
                          v-else-if="!$v.form.fechaFin.invalid"
                        >La fecha inicial debe ser antes de la fecha final</span>
                      </md-datepicker>
                    </div>
                  </div>
                </md-card-content>
                <md-progress-bar md-mode="indeterminate" v-if="sending" />
                <md-card-actions>
                  <md-button @click="eliminar()" class="md-accent" :disabled="sending">Eliminar</md-button>
                  <md-button type="submit" class="md-primary" :disabled="sending">Actualizar</md-button>
                </md-card-actions>
              </md-card>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { getOneOrManyApi, getApi, putApi, deleteApi } from "../../../util/api";
import { promos } from "../../../util/constants";
import { successMsg, errorMsg, questionMsg } from "../../../util/utilMsg";
import Loading from "../../../components/loading";
import { validationMixin } from "vuelidate";
import {
  required,
  integer,
  between,
  minValue,
  maxValue
} from "vuelidate/lib/validators";
export default {
  name: "EditarPromociones",
  mixins: [validationMixin],
  components: { Loading },
  data() {
    return {
      sending: false,
      loadingPromo: false,
      validDate: false,
      initialDate: 0,
      finalDate: 0,
      form: {
        fechaInicio: "",
        fechaFin: "",
        porcentaje: "",
        mensaje: ""
      }
    };
  },
  computed: {
    ...mapState(["promo", "promos"])
  },
  validations: {
    form: {
      fechaInicio: {
        required,
        maxValue(value) {
          return maxValue(this.finalDate)(value);
        }
      },
      fechaFin: {
        required,
        minValue(value) {
          return minValue(this.initialDate)(value);
        }
      },
      porcentaje: {
        required,
        integer,
        between: between(0, 100)
      },
      mensaje: { required }
    }
  },
  methods: {
    ...mapActions(["setPromo", "setPromos", "setError"]),
    getValidationClass(fieldName) {
      if (this.form.fechaInicio) {
        this.initialDate = this.form.fechaInicio.getTime();
      } else {
        this.initialDate = 0;
      }
      if (this.form.fechaFin) {
        this.finalDate = this.form.fechaFin.getTime();
      } else {
        this.finalDate = 0;
      }
      const field = this.$v.form[fieldName];
      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    async eliminar() {
      const { id } = this.$route.params;
      await questionMsg(
        "Mercar Chevere",
        `¿Está seguro que desea eliminar esta promocion?
            Recuerde que este cambio es para siempre`
      ).then(result => {
        if (result.value) {
          this.sending = true;
          deleteApi(promos, id)
            .then(response => {
              if (response) {
                getApi(promos).then(respuesta => {
                  this.setPromos(respuesta.data);
                  successMsg(
                    "Mercar Chevere",
                    "La promocion se ha eliminado con éxito"
                  );
                  this.sending = false;
                  this.$router.push("/admin/promociones");
                });
              }
            })
            .catch(err => {
              errorMsg(
                "Mercar Chevere",
                "No se ha podido eliminar la promocion, error: " + err
              );
            });
        }
      });
    },
    save() {
      const { id } = this.$route.params;
      const body = this.form;
      this.sending = true;
      putApi(promos, id, body)
        .then(() => {
          getApi(promos).then(response => {
            this.setPromos(response.data);
            this.setPromo(body);
            successMsg(
              "Mercar Chevere",
              "Se ha actualizado satisfactoriamente la promocio "
            );
            this.sending = false;
            this.$router.push("/admin/promociones");
          });
        })
        .catch(error => {
          errorMsg(
            "Mercar Chevere",
            "No se ha podido actualizar el promocion" + error
          );
        });
    },
    validate() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.save();
      }
    },
    fetchPromo(id) {
      this.loadingPromo = true;
      getOneOrManyApi(promos, id)
        .then(res => {
          this.setPromo(res.data);
          this.form.porcentaje = this.promo.porcentaje;
          this.form.mensaje = this.promo.mensaje;
          this.form.fechaInicio = new Date(this.promo.fechaInicio);
          this.form.fechaFin = new Date(this.promo.fechaFin);
          this.loadingPromo = false;
        })
        .catch(err => {
          this.setError(err);
          this.loadingPromo = false;
        });
    }
  },
  async created() {
    this.$material.locale.dateFormat = "dd/MM/yyyy";
    const id = this.$route.params.id;
    if (!this.promo || this.promo._id !== id) {
      this.fetchPromo(id);
    } else {
      this.form.porcentaje = this.promo.porcentaje;
      this.form.mensaje = this.promo.mensaje;
      this.form.fechaInicio = new Date(this.promo.fechaInicio);
      this.form.fechaFin = new Date(this.promo.fechaFin);
    }
  }
};
</script>

<style scoped>
</style>
