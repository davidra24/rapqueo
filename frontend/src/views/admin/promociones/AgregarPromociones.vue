<template>
  <div class="container">
    <div class="row">
      <div class="col-12" v-if="loadingProducts">
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
                    v-bind:src="this.foto"
                    v-bind:alt="this.nombre"
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
                  <div class="md-title">Promoción</div>
                </md-card-header>
                <md-card-content>
                  <div class="md-layout md-gutter">
                    <div
                      class="md-layout-item md-small-size-100 d-flex align-items-start flex-column"
                    >
                      <div class="md-layout-item md-small-size-100">
                        <md-field :class="getValidationClass('producto')">
                          <label for="producto">Producto</label>
                          <md-select
                            name="producto"
                            id="producto"
                            v-model="form.idProducto"
                            :disabled="sending"
                            @md-selected="fetchProduct(form.idProducto)"
                          >
                            <md-option
                              v-for="product in products"
                              :key="product._id"
                              :value="product._id"
                            >{{product.nombre}}</md-option>
                          </md-select>
                          <span
                            class="md-error"
                            v-if="!$v.form.idProducto.required"
                          >La categoría es requerida</span>
                        </md-field>
                      </div>
                      <div v-if="this.precio" class="d-flex align-items-start flex-column">
                        <h6>Peso: {{peso}}{{unidad}}</h6>
                        <h6>Cantidad: {{cantidad}}</h6>
                        <h6>Precio: ${{precio}}</h6>
                      </div>
                    </div>
                    <div class="md-layout-item md-small-size-100 col-12">
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
                  <md-button type="submit" class="md-primary" :disabled="sending">Guardar</md-button>
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
import { getOneOrManyApi, getApi, postApi } from "../../../util/api";
import { products } from "../../../util/constants";
import { successMsg, errorMsg } from "../../../util/utilMsg";
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
  name: "AgregarPromociones",
  mixins: [validationMixin],
  components: { Loading },
  data() {
    return {
      sending: false,
      loadingProducts: false,
      initialDate: 0,
      finalDate: 0,
      foto: "",
      nombre: "",
      peso: 0,
      unidad: "",
      cantidad: 0,
      precio: 0,
      form: {
        idProducto: "",
        fechaInicio: "",
        fechaFin: "",
        porcentaje: "",
        mensaje: ""
      }
    };
  },
  computed: {
    ...mapState(["promo", "products", "product"])
  },
  validations: {
    form: {
      idProducto: {
        required
      },
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
    ...mapActions(["setPromo", "setProducts", "setProduct", "setError"]),
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
    save() {
      if (!this.form.foto) {
        this.imagenSeleccionada = false;
      } else {
        this.imagenSeleccionada = true;
        this.sending = true;
        const body = this.form;
        postApi(products, body)
          .then(() => {
            getApi(products).then(response => {
              this.setProducts(response.data);
              successMsg(
                "Mercar Chevere",
                "Se ha almacenado satisfactoriamente el producto"
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
      }
    },
    validate() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.save();
      }
    },
    fetchProduct(id) {
      this.loadingProduct = true;
      getOneOrManyApi(products, id)
        .then(res => {
          this.setProduct(res.data);
          this.nombre = this.product.nombre;
          this.foto = this.product.foto;
          this.peso = this.product.caracteristicas.peso;
          this.unidad = this.product.caracteristicas.unidad;
          this.cantidad = this.product.caracteristicas.cantidad;
          this.precio = this.product.caracteristicas.precio;
          this.loadingProduct = false;
        })
        .catch(err => {
          this.setError(err);
          this.loadingProduct = false;
        });
    },
    fetchProducts() {
      this.loadingProducts = true;
      getApi(products)
        .then(res => {
          this.setProducts(res.data);
          this.loadingProducts = false;
        })
        .catch(err => {
          this.setError(err);
          this.loadingProducts = false;
        });
    }
  },
  async created() {
    if (!this.products) {
      await this.fetchProducts();
    }
    this.$material.locale.dateFormat = "dd/MM/yyyy";
    this.form.fechaInicio = new Date();
    this.form.fechaFin = new Date();
  }
};
</script>

<style scoped>
</style>