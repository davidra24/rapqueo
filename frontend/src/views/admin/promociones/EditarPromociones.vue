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
                    v-if="form.producto.foto"
                    :src="form.producto.foto"
                    alt="Skyscraper"
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
                    <div class="md-layout-item md-small-size-100">
                      <md-field :class="getValidationClass('producto')">
                        <label for="producto">Producto</label>
                        <md-select
                          name="producto"
                          id="producto"
                          v-model="form.producto._id"
                          :disabled="sending"
                        >
                          <md-option
                            v-for="product in products"
                            :key="product._id"
                            :value="product._id"
                          >{{product.nombre}}</md-option>
                        </md-select>
                        <span
                          class="md-error"
                          v-if="!$v.form.producto._id.required"
                        >El producto es requerida</span>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100">
                      <md-field :class="getValidationClass('peso')">
                        <label for="peso">Peso</label>
                        <md-input
                          name="peso"
                          id="peso"
                          type="number"
                          v-model="form.producto.caracteristicas.peso"
                          disabled
                        />
                      </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100">
                      <md-field :class="getValidationClass('unidad')">
                        <label for="unidad">Unidad</label>
                        <md-input
                          name="unidad"
                          id="unidad"
                          v-model="form.producto.caracteristicas.unidad"
                          disabled
                        />
                      </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100">
                      <md-field :class="getValidationClass('cantidad')">
                        <label for="cantidad">Cantidad</label>
                        <md-input
                          name="cantidad"
                          id="cantidad"
                          type="number"
                          v-model="form.producto.caracteristicas.cantidad"
                          disabled
                        />
                      </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100">
                      <md-field :class="getValidationClass('sabor')">
                        <label for="sabor">sabor</label>
                        <md-input
                          name="sabor"
                          id="sabor"
                          v-model="form.producto.caracteristicas.sabor"
                          :disabled="sending"
                        />
                      </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100">
                      <md-field :class="getValidationClass('precio')">
                        <label for="precio">Precio</label>
                        <md-input
                          name="precio"
                          id="precio"
                          type="number"
                          v-model="form.producto.caracteristicas.precio"
                          disabled
                        />
                      </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100">
                      <md-field :class="getValidationClass('marca')">
                        <label for="marca">Marca</label>
                        <md-input
                          name="marca"
                          id="marca"
                          v-model="form.producto.caracteristicas.marca"
                          disabled
                        />
                      </md-field>
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
      selectedDate: null,
      sending: false,
      loadingPromo: false,
      form: {
        fechaInicio: "",
        fechaFin: "",
        porcentaje: "",
        mensaje: "",
        producto: {
          _id: "",
          foto: "",
          caracteristicas: {
            peso: "",
            unidad: "",
            cantidad: "",
            sabor: "",
            precio: "",
            marca: ""
          },
          idCategoria: ""
        }
      }
    };
  },
  computed: {
    ...mapState(["promo", "products", "product"])
  },
  validations: {
    form: {
      fechaInicio: { required },
      fechaFin: { required },
      porcentaje: {
        integer,
        between: between(1, 100)
      },
      mensaje: { required },
      producto: {
        _id: {
          required
        },
        idCategoria: { required },
        caracteristicas: {
          peso: { required },
          unidad: { required },
          cantidad: { required },
          precio: { required },
          marca: { required }
        }
      }
    }
  },
  methods: {
    ...mapActions(["setPromo", "setProducts", "setProduct"]),
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
          this.loadingPromo = false;
        })
        .catch(err => {
          this.setError(err);
          this.loadingPromo = false;
        });
    },
    fetchProducts() {
      this.loadingPromo = true;
      getApi(products)
        .then(res => {
          this.setProducts(res.data);
          this.loadingPromo = false;
        })
        .catch(err => {
          this.setError(err);
          this.loadingPromo = false;
        });
    },
    fetchProduct(id) {
      getOneOrManyApi(products, id)
        .then(res => {
          this.setProduct(res.data);
          this.form.producto = Object.assign({}, this.product);
        })
        .catch(err => {
          this.setError(err);
        });
    }
  },
  async mounted() {
    const id = this.$route.params.id;
    if (!this.promo || this.promo._id !== id) {
      await this.fetchPromo(id);
    } else {
      this.form = await Object.assign({}, this.promo);
    }
    if (!this.products) {
      await this.fetchProducts();
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
