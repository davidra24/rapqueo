<template>
  <div class="container">
    <div class="row">
      <div v-if="loading" class="col-12">
        <Loading />
      </div>
      <div v-else class="col-12">
        <div class="row d-flex justify-content-center">
          <div class="col-6 d-flex justify-content-center" style="margin-top: 2%;">
            <md-card style="padding-left: 3%; padding-right: 3%; width: 100%">
              <md-card-header>
                <md-card-header-text>
                  <h2>
                    <strong>Precio del envío</strong>
                  </h2>
                </md-card-header-text>
              </md-card-header>
              <md-card-content>
                <md-field>
                  <label>Precio</label>
                  <span class="md-prefix">$</span>
                  <md-input v-model="precio_envio"></md-input>
                </md-field>
              </md-card-content>
              <md-card-actions>
                <md-button class="md-primary">Cambiar</md-button>
              </md-card-actions>
            </md-card>
          </div>
          <div class="col-6 d-flex justify-content-center" style="margin-top: 2%;">
            <md-card style="padding-left: 3%; padding-right: 3%; width: 100%">
              <md-card-header>
                <md-card-header-text>
                  <h2>
                    <strong>Permisos de usuario</strong>
                  </h2>
                </md-card-header-text>
              </md-card-header>
              <md-card-content>
                <md-field>
                  <label>Teléfono de usuario</label>
                  <md-input v-model="telefono" type="number"></md-input>
                </md-field>
                <md-field v-if="permissions">
                  <label>Nombre de usuario</label>
                  <md-input v-model="nombre" type="text"></md-input>
                </md-field>
              </md-card-content>
              <md-card-actions>
                <div v-if="permissions">
                  <md-switch v-model="admin" @change="handleChange('admin')">Administrador</md-switch>
                  <md-switch v-model="mensajero" @change="handleChange('msg')">Mensajero</md-switch>
                </div>
                <md-button class="md-primary" @click="searchUser">Buscar</md-button>
              </md-card-actions>
            </md-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { postApi, putApi } from "../../../util/api";
import { userByPhone, usuarios } from "../../../util/constants";
import { errorMsg, successMsg } from "../../../util/utilMsg";
import { mapState } from "vuex";
import Loading from "../../../components/loading";
export default {
  name: "Usuarios",
  computed: {
    ...mapState(["user"])
  },
  data() {
    return {
      id: "",
      loading: false,
      precio_envio: "",
      telefono: "",
      nombre: "",
      admin: false,
      mensajero: false,
      permissions: false
    };
  },
  components: {
    Loading
  },
  methods: {
    async searchUser() {
      this.loading = true;
      const body = {
        telefono: `+57${this.telefono}`
      };
      await postApi(userByPhone, body)
        .then(response => {
          if (response.data) {
            const { code } = response.data;
            if (parseInt(code) === 200) {
              const { data } = response.data;
              const { _id, nombre, apellido, admin, mensajero } = data;
              this.id = _id;
              this.nombre = `${nombre} ${apellido}`;
              this.admin = admin ? admin : false;
              this.mensajero = mensajero ? mensajero : false;
              this.permissions = true;
              this.loading = false;
            } else {
              const { msg } = response.data;
              errorMsg("Mercar Chevere", msg);
              this.loading = false;
            }
          } else {
            errorMsg("Mercar Chevere", "Error de servidor");
            this.loading = false;
          }
        })
        .catch(err => {
          errorMsg("Mercar Chevere", "Error de servidor: " + err);
          this.loading = false;
        });
    },
    async handleChange(type) {
      this.loading = true;
      if (type === "admin") {
        this.mensajero = !this.admin;
      } else {
        this.admin = !this.mensajero;
      }
      const data = { admin: this.admin, mensajero: this.mensajero };

      await putApi(usuarios, this.id, data)
        .then(response => {
          if (response.data) {
            const { code, msg } = response.data;
            if (parseInt(code) === 200) {
              successMsg("Mercar Chevere", msg);
            } else {
              errorMsg("Mercar Chevere", msg);
            }
          } else {
            errorMsg("Mercar Chevere", "Error de servidor ");
          }
          this.loading = false;
        })
        .catch(err => {
          errorMsg("Mercar Chevere", "Error de servidor " + err);
          this.loading = false;
        });
    },
    validateAdmin() {
      if (this.user) {
        if (!this.user.admin) {
          this.$router.push("/");
        }
      } else {
        this.$router.push("/");
      }
    }
  },
  mounted() {
    this.validateAdmin();
  }
};
</script>

<style scoped>
</style>