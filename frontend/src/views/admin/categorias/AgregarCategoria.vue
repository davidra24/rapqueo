<template>
  <div class="container-fluid">
    <div class="row">
      <div v-if="loadingCategorie" class="col-12">
        <Loading />
      </div>
      <div v-else class="col-12 space">
        <div class="row">
          <div class="col-12 col-sm-5 col-md-6 d-flex justify-content-center">
            <div style="width: 50%;">
              <div class="row">
                <div class="col-12" v-if="form.imagen">
                  <img :src="buscarImagen(form.imagen)" alt="Skyscraper" />
                </div>
                <div v-else class="col-12">
                  <h4>
                    <p>Seleccione una imagen</p>
                  </h4>
                  <md-button class="md-primary" @click="changeImage()"
                    >Seleccionar</md-button
                  >
                </div>
                <div class="col-12">
                  <span style="color:red;" v-if="!imagenSeleccionada"
                    >La imagen es requerida</span
                  >
                </div>
              </div>

              <md-dialog :md-active.sync="imageChange">
                <md-content
                  v-if="cargarImagenes"
                  class="md-scrollbar d-flex justify-content-center"
                >
                  <Loading />
                </md-content>
                <md-content v-else class="md-scrollbar">
                  <div class="container-fluid">
                    <div class="row">
                      <div class="col-12">
                        <div class="container">
                          <div class="row" style="margin-bottom: 2%;">
                            <div
                              style="margin-top: 2%;"
                              class="col-12 col-md-6 col-lg-4"
                              v-for="categoria in categorias_i"
                              :key="categoria._id"
                            >
                              <md-card>
                                <md-card-media-cover md-solid>
                                  <md-card-media>
                                    <img
                                      class="img-fluid"
                                      :src="categoria.imagen"
                                      alt="Skyscraper"
                                    />
                                  </md-card-media>
                                  <md-card-area>
                                    <md-card-header>
                                      <span class="md-title">
                                        {{ categoria.nombre }}
                                      </span>
                                      <md-card-actions>
                                        <md-button
                                          @click="
                                            seleccionarImagen(categoria.nombre)
                                          "
                                          >Seleccionar</md-button
                                        >
                                      </md-card-actions>
                                    </md-card-header>
                                  </md-card-area>
                                </md-card-media-cover>
                              </md-card>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </md-content>
              </md-dialog>
            </div>
          </div>
          <form
            novalidate
            class="md-layout col-12 col-sm-6 col-md-5 col-lg-6 d-flex justify-content-start"
            @submit.prevent="validateUser"
          >
            <md-card class="md-layout-item md-size-50 md-small-size-100">
              <md-card-header>
                <div class="md-title">Información</div>
              </md-card-header>
              <md-card-content>
                <div class="md-layout md-gutter">
                  <div class="md-layout-item md-small-size-100">
                    <md-field :class="getValidationClass('nombre')">
                      <label for="nombre">Nombre</label>
                      <md-input
                        name="nombre"
                        id="nombre"
                        autocomplete="given-name"
                        v-model="form.nombre"
                        :disabled="sending"
                      />
                      <span class="md-error" v-if="!$v.form.nombre.required"
                        >El nombre de la categoria es requerida</span
                      >
                    </md-field>
                  </div>

                  <div class="md-layout-item md-small-size-100">
                    <md-field :class="getValidationClass('descripcion')">
                      <label for="descripcion">Descripción</label>
                      <md-textarea
                        name="descripcion"
                        id="descripcion"
                        autocomplete="family-name"
                        v-model="form.descripcion"
                        :disabled="sending"
                      />
                      <span
                        class="md-error"
                        v-if="!$v.form.descripcion.required"
                        >La descripción de la categoría es requerida</span
                      >
                    </md-field>
                  </div>
                </div>
              </md-card-content>
              <md-progress-bar md-mode="indeterminate" v-if="sending" />
              <md-card-actions>
                <md-button type="submit" class="md-primary" :disabled="sending"
                  >Guardar</md-button
                >
              </md-card-actions>
            </md-card>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '@/components/loading';
import { mapState, mapActions } from 'vuex';
import { postApi, getApi } from '../../../util/api';
import { categories } from '../../../util/constants';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import { successMsg, errorMsg } from '../../../util/utilMsg';
import { buscarImagen, imagenes } from '../../../util/images';

export default {
  name: 'AgregarCategorias',
  mixins: [validationMixin],
  components: { Loading },
  data() {
    return {
      imagenSeleccionada: true,
      cargarImagenes: true,
      categorias_i: null,
      loadingCategorie: false,
      loadingProducts: false,
      loadingNoCategorie: false,
      imageChange: false,
      modalProducto: false,
      sending: false,
      form: {
        nombre: '',
        imagen: '',
        descripcion: '',
      },
    };
  },
  validations: {
    form: {
      nombre: {
        required,
      },
      descripcion: {
        required,
      },
    },
  },
  computed: {
    ...mapState(['categories', 'user']),
  },
  methods: {
    ...mapActions(['setCategories']),
    changeImage() {
      this.cargarImagenes = true;
      this.imageChange = true;
      setTimeout(() => {
        this.obtenerImagenes().then((response) => {
          this.categorias_i = response;
          this.cargarImagenes = false;
        });
      }, 1000);
    },
    async obtenerImagenes() {
      return await new Promise((resolve) => {
        resolve(imagenes);
      });
    },
    seleccionarImagen(nombre) {
      this.form.imagen = nombre;
      this.imageChange = false;
    },
    buscarImagen(name) {
      return buscarImagen(name);
    },
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty,
        };
      }
    },
    validateUser() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        if (!this.form.imagen) {
          this.imagenSeleccionada = false;
          return;
        }
        this.save();
      }
    },
    async save() {
      const body = Object.assign({}, this.form);
      this.imagenSeleccionada = true;
      this.sending = true;
      await this.guardarCategoria(body)
        .then((response) => {
          if (response) {
            getApi(categories).then((respuesta) => {
              this.setCategories(respuesta.data);
              this.sending = false;
            });
            this.$router.push('/admin/categorias');
          }
        })
        .catch(() => {
          this.sending = false;
        });
    },
    async guardarCategoria(body) {
      return await postApi(categories, body)
        .then((response) => {
          if (response.data) {
            successMsg('Mercar Chevere', 'Categoría almacenada con éxito');
            return response.data;
          } else {
            errorMsg(
              'Mercar Chevere',
              'No se ha podido almacenar la categoría'
            );
            return response;
          }
        })
        .catch((err) => {
          errorMsg('Mercar Chevere', 'No se ha podido actualizar el producto');
          return err;
        });
    },
    validateAdmin() {
      if (this.user) {
        if (!this.user.admin) {
          this.$router.push('/');
        }
      } else {
        this.$router.push('/');
      }
    },
  },
  async mounted() {
    this.validateAdmin();
  },
};
</script>

<style scoped>
.products {
  margin-top: 2%;
}
.space {
  margin-top: 5%;
}
.md-dialog {
  width: 90%;
}
</style>
