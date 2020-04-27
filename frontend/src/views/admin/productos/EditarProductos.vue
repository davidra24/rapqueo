<template>
  <div class="container">
    <div class="row">
      <div class="col-12" v-if="loadingProduct">
        <Loading />
      </div>
      <div class="col-12" v-else>
        <div class="container">
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="d-flex justify-content-center">
                <div style="width: 100%;">
                  <img v-if="form.foto" :src="form.foto" alt="Skyscraper" style="width:80%" />
                  <div v-else>
                    <Loading />
                  </div>
                  <div v-if="!showCamera">
                    <md-button class="md-primary" @click="changeCamera()">Tomar foto</md-button>
                  </div>
                  <md-dialog
                    md-fullscreen
                    :md-active.sync="showCamera"
                    class="d-flex justify-content-center"
                  >
                    <div class="wrapper">
                      <video class="video" :class="activeDevice === 0 ? 'front' : ''" ref="video" />
                      <canvas style="display:none" ref="canva" />
                      <button
                        v-if="videoDevices.length > 1"
                        class="button is-rounded is-outlined switch-button"
                        @click="switchCamera"
                      >
                        <font-awesome-icon icon="sync-alt"></font-awesome-icon>
                      </button>
                      <div class="photo-button-container">
                        <button class="button photo-button" @click="TakePhoto">
                          <font-awesome-icon icon="camera"></font-awesome-icon>
                        </button>
                      </div>
                    </div>
                  </md-dialog>
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
                  <div class="md-title">Producto</div>
                </md-card-header>
                <md-card-content>
                  <div class="md-layout md-gutter">
                    <div class="md-layout-item md-small-size-100">
                      <md-field :class="getValidationClass('nombre')">
                        <label for="nombre">Nombre</label>
                        <md-input
                          name="nombre"
                          id="nombre"
                          v-model="form.nombre"
                          :disabled="sending"
                        />
                        <span
                          class="md-error"
                          v-if="!$v.form.nombre.required"
                        >El nombre del producto es requerido</span>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100">
                      <md-field :class="getValidationClass('peso')">
                        <label for="peso">Peso</label>
                        <md-input
                          name="peso"
                          id="peso"
                          type="number"
                          v-model="form.caracteristicas.peso"
                          :disabled="sending"
                        />
                        <span
                          class="md-error"
                          v-if="!$v.form.caracteristicas.peso.required"
                        >La característica de peso es requerida</span>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100">
                      <md-field :class="getValidationClass('unidad')">
                        <label for="unidad">Unidad</label>
                        <md-input
                          name="unidad"
                          id="unidad"
                          v-model="form.caracteristicas.unidad"
                          :disabled="sending"
                        />
                        <span
                          class="md-error"
                          v-if="!$v.form.caracteristicas.unidad.required"
                        >La característica de unidad es requerida</span>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100">
                      <md-field :class="getValidationClass('cantidad')">
                        <label for="cantidad">Cantidad</label>
                        <md-input
                          name="cantidad"
                          id="cantidad"
                          type="number"
                          v-model="form.caracteristicas.cantidad"
                          :disabled="sending"
                        />
                        <span
                          class="md-error"
                          v-if="!$v.form.caracteristicas.cantidad.required"
                        >La característica de cantidad es requerida</span>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100">
                      <md-field :class="getValidationClass('sabor')">
                        <label for="sabor">sabor</label>
                        <md-input
                          name="sabor"
                          id="sabor"
                          v-model="form.caracteristicas.sabor"
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
                          v-model="form.caracteristicas.precio"
                          :disabled="sending"
                        />
                        <span
                          class="md-error"
                          v-if="!$v.form.caracteristicas.precio.required"
                        >La característica de precio es requerida</span>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100">
                      <md-field :class="getValidationClass('marca')">
                        <label for="marca">Marca</label>
                        <md-input
                          name="marca"
                          id="marca"
                          v-model="form.caracteristicas.marca"
                          :disabled="sending"
                        />
                        <span
                          class="md-error"
                          v-if="!$v.form.caracteristicas.marca.required"
                        >La característica de marca es requerida</span>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100">
                      <md-field :class="getValidationClass('categoria')">
                        <label for="categoria">Categoria</label>
                        <md-select
                          name="categoria"
                          id="categoria"
                          v-model="form.idCategoria"
                          :disabled="sending"
                        >
                          <md-option
                            v-for="categorie in categories"
                            :key="categorie._id"
                            :value="categorie._id"
                          >{{categorie.nombre}}</md-option>
                        </md-select>
                        <span
                          class="md-error"
                          v-if="!$v.form.idCategoria.required"
                        >La categoría es requerida</span>
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
import { products, categories, promos } from "../../../util/constants";
import { successMsg, errorMsg, questionMsg } from "../../../util/utilMsg";
import Loading from "../../../components/loading";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
export default {
  name: "EditarProductos",
  mixins: [validationMixin],
  components: { Loading },
  data() {
    return {
      sending: false,
      showCamera: false,
      loadingProduct: false,
      form: {
        nombre: "",
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
      },
      photo: "",
      mediaStream: null,
      videoDevices: [],
      activeDevice: 0
    };
  },
  computed: {
    ...mapState(["product", "products", "categories", "promos"])
  },
  validations: {
    form: {
      nombre: {
        required
      },
      idCategoria: {
        required
      },
      caracteristicas: {
        peso: {
          required
        },
        unidad: {
          required
        },
        cantidad: {
          required
        },
        precio: {
          required
        },
        marca: {
          required
        }
      }
    }
  },
  methods: {
    ...mapActions(["setProduct", "setProducts", "setCategories", "setPromos"]),
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
    async changeCamera() {
      this.showCamera = true;
      const devices = await navigator.mediaDevices.enumerateDevices();
      this.videoDevices = devices.filter(d => d.kind === "videoinput");
      this.StartRecording(0);
    },
    fetchProduct(id) {
      this.loadingProduct = true;
      getOneOrManyApi(products, id)
        .then(res => {
          this.setProduct(res.data);
          this.form = Object.assign({}, this.product);
          this.loadingProduct = false;
        })
        .catch(err => {
          this.setError(err);
          this.loadingProduct = false;
        });
    },
    fetchCategories() {
      this.loadingProduct = true;
      getApi(categories)
        .then(res => {
          this.setCategories(res.data);
          this.loadingProduct = false;
        })
        .catch(err => {
          this.setError(err);
          this.loadingProduct = false;
        });
    },
    async StartRecording(deviceIdx) {
      let video = this.$refs.video;
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: { exact: this.videoDevices[deviceIdx].deviceId } }
      });
      video.srcObject = await this.mediaStream;
      video.play();
    },
    async TakePhoto() {
      let video = this.$refs.video;
      let canva = this.$refs.canva;
      let width = video.videoWidth;
      let height = video.videoHeight;
      canva.width = width;
      canva.height = height;
      let ctx = canva.getContext("2d");
      ctx.save();
      if (this.activeDevice === 0) {
        ctx.scale(-1, 1);
        ctx.drawImage(video, width * -1, 0, width, height);
      } else {
        ctx.drawImage(video, 0, 0);
      }
      ctx.restore();
      this.form.foto = canva.toDataURL("image/png");
      this.showCamera = false;
    },
    switchCamera() {
      const tracks = this.mediaStream.getVideoTracks();
      tracks.forEach(track => {
        track.stop();
      });
      this.StartRecording((this.activeDevice + 1) % 2);
      this.activeDevice = (this.activeDevice + 1) % 2;
    }
  },
  async mounted() {
    const id = this.$route.params.id;
    if (!this.product || this.product._id !== id) {
      await this.fetchProduct(id);
    } else {
      this.form = await Object.assign({}, this.product);
    }
    if (!this.categories) {
      await this.fetchCategories();
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
