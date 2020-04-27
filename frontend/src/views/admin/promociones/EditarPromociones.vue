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
                    <div class="md-layout-item md-small-size-100">
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
                    <div class="md-layout-item md-small-size-100">
                      <md-datepicker
                        v-model="form.fechaInicio"
                        name="mensaje"
                        id="mensaje"
                        :disabled="sending"
                        :class="getValidationClass('fechaInicio')"
                      >
                        <span
                          class="md-error"
                          v-if="!$v.form.mensaje.required"
                        >El mensaje de descuento es requerido</span>
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
import { products, promos } from "../../../util/constants";
import { successMsg, errorMsg, questionMsg } from "../../../util/utilMsg";
import Loading from "../../../components/loading";
import { validationMixin } from "vuelidate";
import { required, integer, between } from "vuelidate/lib/validators";
export default {
  name: "EditarPromociones",
  mixins: [validationMixin],
  components: { Loading },
  data() {
    return {
      sending: false,
      loadingPromo: false,
      form: {
        fechaInicio: "",
        fechaFin: "",
        porcentaje: "",
        mensaje: ""
      }
    };
  },
  computed: {
    ...mapState(["promo"])
  },
  validations: {
    form: {
      fechaInicio: { required },
      fechaFin: { required },
      porcentaje: {
        required,
        integer,
        between: between(0, 100)
      },
      mensaje: { required }
    }
  },
  methods: {
    ...mapActions(["setPromo", "setError"]),
    getValidationClass(fieldName) {
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
        `¿Está seguro que desea eliminar esta categoría?
            Recuerde que este cambio es para siempre`
      ).then(result => {
        if (result.value) {
          this.sending = true;
          deleteApi(products, id)
            .then(response => {
              if (response) {
                getApi(products).then(respuesta => {
                  this.setProducts(respuesta.data);
                  getApi(promos).then(responsee => {
                    this.setPromos(responsee.data);
                    successMsg(
                      "Mercar Chevere",
                      "El producto se ha eliminado con éxito"
                    );
                    this.sending = false;
                    this.$router.push("/admin/productos");
                  });
                });
              }
            })
            .catch(err => {
              errorMsg(
                "Mercar Chevere",
                "No se ha podido eliminar la categoría, error: " + err
              );
            });
        }
      });
    },
    save() {
      const { id } = this.$route.params;
      const body = this.form;
      this.sending = true;
      putApi(products, id, body)
        .then(() => {
          getApi(products).then(response => {
            this.setProducts(response.data);
            this.setProduct(body);
            successMsg(
              "Mercar Chevere",
              "Se ha actualizado satisfactoriamente el producto"
            );
            this.sending = false;
            this.$router.push("/admin/productos");
          });
        })
        .catch(error => {
          errorMsg(
            "Mercar Chevere",
            "No se ha podido actualizar el producto" + error
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
          this.form = Object.assign({}, this.promo);
          var date = new Date(this.promo.fechaInicio);
          this.form.fechaInicio = date;
          this.loadingPromo = false;
        })
        .catch(err => {
          this.setError(err);
          this.loadingPromo = false;
        });
    }
  },
  async created() {
    const id = this.$route.params.id;
    if (!this.promo || this.promo._id !== id) {
      await this.fetchPromo(id);
    } else {
      this.form = await Object.assign({}, this.promo);
    }
  }
};
</script>

<style scoped>
.video.front {
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}
.wrapper {
  background-color: black;
  display: grid;
  width: 100vw;
  height: 100vh;
  grid-template-columns: [left] 90vw [bs] 5vw [es] 5vw [right];
  grid-template-rows: [top] 5vh [bs] 5vh [es] 60vh [middle] 10vh [bottom] 20vh [end];
  justify-items: center;
  overflow: hidden;
  margin-right: auto;
  margin-left: auto;
}
.video {
  height: 100%;
  grid-column: left/right;
  grid-row: top / bottom;
  user-select: none;
  max-width: unset;
}
.switch-button {
  grid-column: bs / es;
  grid-row: bs / es;
  z-index: 5;
  border-radius: 100%;
  width: 6vh;
  height: 6vh;
  font-size: 2vh;
}
.photo-button-container {
  grid-column: left / right;
  grid-row: middle / bottom;
  z-index: 5;
  width: 100vw;
  height: 20vh;
  display: flex;
  justify-content: center;
}
.photo-button {
  width: 10vh;
  height: 10vh;
  border-radius: 100%;
}
.photo-button {
  font-size: 4vh;
  color: black;
}
.gallery {
  grid-column: left / right;
  grid-row: bottom / end;
}
</style>
