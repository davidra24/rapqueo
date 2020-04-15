<template>
  <div class="container-fluid">
    <div class="row">
      <div v-if="loadingCategorie" class="col-12">
        <Loading />
      </div>
      <div v-else class="col-12 space">
        <div class="row">
          <div class="col-6 d-flex justify-content-end">
            <div style="width: 40%;">
              <img
                v-if="form.imagen"
                :src="require(`@/assets/img/${form.imagen}`)"
                alt="Skyscraper"
              />
              <div v-else>
                <Loading />
              </div>
              <md-button class="md-primary" @click="imageChange=true">Cambiar</md-button>
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
            class="md-layout col-6 d-flex justify-content-start"
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
                      <span
                        class="md-error"
                        v-if="!$v.form.nombre.required"
                      >El nombre de la categoria es requerida</span>
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
                      >La descripción de la categoría es requerida</span>
                    </md-field>
                  </div>
                </div>
              </md-card-content>

              <md-card-actions>
                <md-button type="submit" class="md-primary" :disabled="sending">Create user</md-button>
              </md-card-actions>
            </md-card>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/loading";
import { mapState, mapActions } from "vuex";
import { getOneOrManyApi } from "../../../util/api";
import { categories } from "../../../util/constants";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
export default {
  name: "EditarCategoria",
  mixins: [validationMixin],
  components: { Loading },
  data() {
    return {
      loadingCategorie: false,
      imageChange: false,
      sending: false,
      form: {
        nombre: "",
        imagen: "",
        descripcion: ""
      }
    };
  },
  validations: {
    form: {
      nombre: {
        required
      },
      descripcion: {
        required
      }
    }
  },
  computed: {
    ...mapState(["categorie"])
  },
  methods: {
    ...mapActions(["setCategorie", "setError"]),
    fetch(id) {
      this.loadingCategorie = true;
      getOneOrManyApi(categories, id)
        .then(res => {
          this.setCategorie(res.data);
          this.form = Object.assign({}, this.categorie);
          this.loadingCategorie = false;
        })
        .catch(err => {
          this.setError(err);
          this.loadingCategorie = false;
        });
    },
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];
      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    validateUser() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.saveUser();
      }
    },
    cambiarImagen() {}
  },
  async mounted() {
    const id = this.$route.params.id;
    if (!this.categorie || this.categorie._id !== id) {
      await this.fetch(id);
    } else {
      this.form = await Object.assign({}, this.categorie);
    }
  }
};
</script>

<style scoped>
.space {
  margin-top: 5%;
}
</style>