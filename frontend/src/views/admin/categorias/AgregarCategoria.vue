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
              <img
                v-if="form.imagen"
                :src="buscarImagen(form.imagen)"
                alt="Skyscraper"
              />
              <div v-else>
                <Loading />
              </div>
              <md-button class="md-primary" @click="imageChange = true"
                >Cambiar</md-button
              >
              <md-dialog :md-active.sync="imageChange">
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-12">HOLA MUNDO</div>
                  </div>
                </div>
              </md-dialog>
            </div>
          </div>
          <form
            novalidate
            class="md-layout col-12 col-sm-6 col-md-5 col-lg-6 d-flex justify-content-start"
            @submit.prevent="validateUser"
          >
            <md-card class="md-layout-item md-size-50 md-small-size-100">
              <md-progress-bar md-mode="indeterminate" v-if="sending" />
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

              <md-card-actions>
                <md-button type="submit" class="md-primary" :disabled="sending"
                  >Actualizar</md-button
                >
              </md-card-actions>
            </md-card>
          </form>
          <div class="products col-12 row">
            <div v-if="loadingProducts" class="col-12">
              <Loading />
            </div>
            <div v-else class="col-12">
              <div class="container">
                <div class="row">
                  <div
                    class="col-12 col-md-6 col-lg-4"
                    v-for="product in productsCategorie"
                    :key="product._id"
                  >
                    <ProductsCategorieEdit
                      :product="product"
                      @deleteProduct="deleteProduct"
                    />
                  </div>
                  <div
                    class="col-12 col-md-6 col-lg-4"
                    @click="modalProducto = true"
                  >
                    <ProductsCategorieEdit
                      :product="null"
                      style="cursor: pointer;"
                    />
                    <md-dialog md-fullscreen :md-active.sync="modalProducto">
                      <div class="container-fluid">
                        <div class="row">
                          <div class="col-12">
                            <div
                              class="d-flex justify-content-center"
                              v-if="loadingNoCategorie"
                            >
                              <Loading />
                            </div>
                            <div
                              class="d-flex justify-content-center"
                              v-else-if="
                                !productsNoCategorie ||
                                  productsNoCategorie.length === 0
                              "
                            >
                              <h1>No hay productos sin categoría asignada</h1>
                            </div>

                            <div v-else class="d-flex justify-content-center">
                              <div class="row" style="margin: 5%">
                                <div
                                  class="col-12 col-md-6 col-lg-4"
                                  style="min-width: 17rem;"
                                  v-for="product in productsNoCategorie"
                                  :key="product._id"
                                  @click="agregarProducto(product._id)"
                                >
                                  <ProductsCategorieEdit
                                    :product="product"
                                    :esAgregar="true"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </md-dialog>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '@/components/loading';
import { mapState, mapActions } from 'vuex';
import { getOneOrManyApi, getApi, putApi } from '../../../util/api';
import {
  categories,
  productsByCategorie,
  productosSinCategoria,
  products,
} from '../../../util/constants';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import ProductsCategorieEdit from '../../../components/admin/categorias/Products';
import { successMsg, errorMsg } from '../../../util/utilMsg';
import { buscarImagen } from '../../../util/images';
export default {
  name: 'AgregarCategorias',
  mixins: [validationMixin],
  components: { Loading, ProductsCategorieEdit },
  data() {
    return {
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
    ...mapState(['categorie', 'productsCategorie', 'productsNoCategorie']),
  },
  methods: {
    ...mapActions([
      'setCategorie',
      'setError',
      'setProductsCategorie',
      'setProductsNoCategorie',
    ]),
    buscarImagen(name) {
      return buscarImagen(name);
    },
    async fetchProducts(id) {
      this.loadingProducts = true;
      await getOneOrManyApi(productsByCategorie, id)
        .then((res) => {
          this.setProductsCategorie(res.data);
          console.log(res.data);
          this.loadingProducts = false;
        })
        .catch((err) => {
          this.setError(err);
          this.loadingProducts = false;
        });
    },
    fetch(id) {
      this.loadingCategorie = true;
      getOneOrManyApi(categories, id)
        .then((res) => {
          this.setCategorie(res.data);
          this.form = Object.assign({}, this.categorie);
          this.loadingCategorie = false;
        })
        .catch((err) => {
          this.setError(err);
          this.loadingCategorie = false;
        });
    },
    fetchNoCategories() {
      this.loadingNoCategorie = true;
      getApi(productosSinCategoria)
        .then((res) => {
          this.setProductsNoCategorie(res.data);
          this.loadingNoCategorie = false;
        })
        .catch((err) => {
          this.setError(err);
          this.loadingNoCategorie = false;
        });
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
        this.save();
      }
    },
    save() {
      this.sending = true;
      // Instead of this timeout, here you can call your API
      window.setTimeout(() => {
        this.sending = false;
      }, 1500);
    },
    agregarProducto(id) {
      this.modalProducto = false;
      this.loadingProducts = true;
      this.productsNoCategorie.map(async (producto, index) => {
        if (producto._id === id) {
          const body = {
            ...producto,
            idCategoria: this.$route.params.id,
          };
          await this.guardarProductos(id, body).then(() => {
            const products = this.productsCategorie;
            const auxProd = this.productsNoCategorie;
            products.push(producto);
            this.setProductsCategorie(products);
            auxProd.splice(index, 1);
            this.setProductsNoCategorie(auxProd);
          });
          return;
        }
      });
      this.loadingProducts = false;
    },
    deleteProduct(id) {
      this.modalProducto = false;
      this.loadingProducts = true;
      this.productsCategorie.map(async (producto, index) => {
        if (producto._id === id) {
          const body = {
            ...producto,
            idCategoria: null,
          };
          await this.guardarProductos(id, body).then(() => {
            const products = this.productsNoCategorie;
            const auxProd = this.productsCategorie;
            products.push(producto);
            this.setProductsNoCategorie(products);
            auxProd.splice(index, 1);
            this.setProductsCategorie(auxProd);
          });
          successMsg(
            'Eliminado',
            'Se ha eliminado el producto de la categoría con éxito.'
          );
          return;
        }
      });
      this.loadingProducts = false;
    },
    async guardarProductos(id, body) {
      await putApi(products, id, body)
        .then((response) => {
          if (response.data) {
            successMsg(
              'Mercar Chevere',
              'Configuración de producto guardada con éxito'
            );
          } else {
            errorMsg(
              'Mercar Chevere',
              'No se ha podido actualizar el producto'
            );
          }
        })
        .catch((err) => {
          console.log('error', err);
          errorMsg('Mercar Chevere', 'No se ha podido actualizar el producto');
        });
    },
    cambiarImagen() {},
  },
  async mounted() {
    const id = this.$route.params.id;
    if (!this.categorie || this.categorie._id !== id) {
      await this.fetch(id);
      await this.fetchProducts(id);
    } else {
      this.form = await Object.assign({}, this.categorie);
    }
    if (!this.productsNoCategorie) {
      await this.fetchNoCategories();
    }
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
