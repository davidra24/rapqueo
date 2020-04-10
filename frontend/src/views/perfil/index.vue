<template>
  <div class="container">
    <div class="row d-flex justify-content-center">
      <div class="col-8">
        <div role="tablist">
          <md-progress-bar md-mode="indeterminate" v-if="sending" />
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button
                class="white-header"
                block
                v-b-toggle.accordion-1
                variant="primary"
              >Datos Personales</b-button>
            </b-card-header>
            <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <!----------------------------------->
                <md-chip class="md-accent">{{formatTelephone(user.telefono)}}</md-chip>
                <div v-if="editarpersonales">
                  <form novalidate @submit.prevent="validateForm(0)">
                    <div class="md-layout md-gutter">
                      <div class="md-layout-item md-small-size-100">
                        <md-field :class="getValidationClass('firstName')">
                          <label for="first-name">Nombres</label>
                          <md-input
                            name="first-name"
                            id="first-name"
                            autocomplete="given-name"
                            v-model="form.firstName"
                            :disabled="sending"
                          />
                          <span
                            class="md-error"
                            v-if="!$v.form.firstName.required"
                          >El nombre es requerido</span>
                        </md-field>
                      </div>

                      <div class="md-layout-item md-small-size-100">
                        <md-field :class="getValidationClass('lastName')">
                          <label for="last-name">Apellidos</label>
                          <md-input
                            name="last-name"
                            id="last-name"
                            autocomplete="family-name"
                            v-model="form.lastName"
                            :disabled="sending"
                          />
                          <span
                            class="md-error"
                            v-if="!$v.form.lastName.required"
                          >El apellido es requerido</span>
                        </md-field>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-12 col-md-6">
                        <md-button
                          class="md-raised md-accent"
                          @click="cancelarPersonales()"
                          :disabled="sending"
                        >Cancelar</md-button>
                      </div>
                      <div class="col-12 col-md-6">
                        <md-button
                          class="md-raised md-primary"
                          :disabled="sending"
                          type="submit"
                        >Aceptar</md-button>
                      </div>
                    </div>
                  </form>
                </div>
                <div v-else>
                  <div class="md-layout md-gutter">
                    <div class="md-layout-item md-small-size-100">
                      <strong>Nombres:</strong>
                      &nbsp;&nbsp;{{user.nombre}}
                    </div>
                    <div class="md-layout-item md-small-size-100">
                      <strong>Apellidos:</strong>
                      &nbsp;&nbsp;{{user.apellido}}
                    </div>
                  </div>
                  <md-button
                    @click="editarPersonales()"
                    class="md-raised md-primary"
                    :disabled="sending"
                  >Editar</md-button>
                </div>
                <!----------------------------------->
              </b-card-body>
            </b-collapse>
          </b-card>
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button
                class="white-header"
                block
                v-b-toggle.accordion-2
                variant="primary"
              >Datos de seguridad</b-button>
            </b-card-header>
            <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <!------------------------------->
                <div v-if="editarseguridad">
                  <form novalidate @submit.prevent="validateForm(1)">
                    <div class="md-layout-item md-small-size-200">
                      <md-field :class="getValidationClass('lastPassword')">
                        <label for="password">Contraseña antigua</label>
                        <md-input
                          name="lastPassword"
                          id="lastPassword"
                          autocomplete="lastPassword"
                          v-model="form.lastPassword"
                          :disabled="sending"
                          type="password"
                        />
                        <span
                          class="md-error"
                          v-if="!$v.form.lastPassword.required"
                        >La contraseña es requerida</span>
                        <span
                          class="md-error"
                          v-else-if="!$v.form.lastPassword.minlength"
                        >La contraseña debe tener un mínimo de 8 caracteres</span>
                      </md-field>
                    </div>
                    <div class="md-layout md-gutter">
                      <div class="md-layout-item md-small-size-100">
                        <md-field :class="getValidationClass('password')">
                          <label for="password">Contraseña</label>
                          <md-input
                            name="password"
                            id="password"
                            autocomplete="password"
                            v-model="form.password"
                            :disabled="sending"
                            type="password"
                          />
                          <span
                            class="md-error"
                            v-if="!$v.form.password.required"
                          >La contraseña es requerida</span>
                          <span
                            class="md-error"
                            v-else-if="!$v.form.password.minlength"
                          >La contraseña debe tener un mínimo de 8 caracteres</span>
                        </md-field>
                      </div>

                      <div class="md-layout-item md-small-size-100">
                        <md-field :class="getValidationClass('password2')">
                          <label for="password">Repita su contraseña</label>
                          <md-input
                            name="password2"
                            id="password2"
                            autocomplete="password"
                            v-model="form.password2"
                            :disabled="sending"
                            type="password"
                          />
                          <span
                            class="md-error"
                            v-if="!$v.form.password2.required"
                          >Confirmación de contraseña es requerida</span>
                          <span
                            class="md-error"
                            v-else-if="!$v.form.password2.minlength"
                          >La contraseña debe tener un mínimo de 8 caracteres</span>
                        </md-field>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-12 col-md-6">
                        <md-button
                          class="md-raised md-accent"
                          :disabled="sending"
                          @click="cancelarSeguridad()"
                        >Cancelar</md-button>
                      </div>
                      <div class="col-12 col-md-6">
                        <md-button
                          class="md-raised md-primary"
                          :disabled="sending"
                          type="submit"
                        >Aceptar</md-button>
                      </div>
                    </div>
                  </form>
                </div>
                <div v-else>
                  <div class="col-12">
                    <strong>Contraseña:</strong>&nbsp;&nbsp;&nbsp;&nbsp;•••••••••••••••
                  </div>
                  <md-button
                    @click="editarSeguridad()"
                    class="md-raised md-primary"
                    :disabled="sending"
                  >Editar</md-button>
                </div>
                <!------------------------------->
              </b-card-body>
            </b-collapse>
          </b-card>

          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button
                class="white-header"
                block
                v-b-toggle.accordion-3
                variant="primary"
              >Datos de Envío</b-button>
            </b-card-header>
            <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <!--<b-card-text>{{ text }}</b-card-text>-->
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
import { mapState, mapActions } from "vuex";
import { crypt } from "../../util/utilCrypt";
import { putApi, postApi } from "../../util/api";
import { usuarios, verifyPassword } from "../../util/constants";
import { successMsg, errorMsg } from "../../util/utilMsg";

export default {
  name: "Perfil",
  mixins: [validationMixin],
  computed: {
    ...mapState(["user"])
  },
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        lastPassword: "",
        password: "",
        password2: ""
      },
      editarpersonales: false,
      editarseguridad: false,
      sending: false
    };
  },
  validations: {
    form: {
      firstName: {
        required
      },
      lastName: {
        required
      },
      lastPassword: {
        required,
        minLength: minLength(8)
      },
      password: {
        required,
        minLength: minLength(8)
      },
      password2: {
        required,
        minLength: minLength(8)
      }
    }
  },
  methods: {
    ...mapActions(["setUser", "setSession", "setError"]),
    editarPersonales() {
      this.form.firstName = this.user.nombre;
      this.form.lastName = this.user.apellido;
      this.editarpersonales = true;
    },
    guardarPersonales() {
      this.editarpersonales = false;
      const data = {
        nombre: this.form.firstName,
        apellido: this.form.lastName
      };
      this.actualizarDatos(data);
    },
    cancelarPersonales() {
      this.editarpersonales = false;
    },
    editarSeguridad() {
      this.form.firstName = this.user.nombre;
      this.form.lastName = this.user.apellido;
      this.editarseguridad = true;
    },
    guardarSeguridad() {
      const data = {
        contrasena: this.form.password
      };
      const password = this.form.lastPassword;
      if (this.form.password != this.form.password2) {
        errorMsg(
          "Mercar Chevere",
          "La contraseña nueva no coincide con su verificación, por favor reviselas"
        );
      } else {
        this.verifyPassword(password, data);
      }
    },
    cancelarSeguridad() {
      this.form.lastPassword = "";
      this.form.password = "";
      this.form.password2 = "";
      this.editarseguridad = false;
    },
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];
      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    async validataUser() {
      const usrId = await this.$route.params.id;
      if (this.user) {
        if (this.user.id !== usrId) {
          await this.$router.push("/");
        }
      } else {
        await this.$router.push("/");
      }
    },
    validateForm(id) {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        switch (id) {
          case 0:
            this.guardarPersonales();
            break;
          case 1:
            this.guardarSeguridad();
            break;
          default:
            break;
        }
      }
    },
    formatTelephone(number) {
      const phone = number.split("");
      var result = "";
      result += `${phone[3]}${phone[4]}${phone[5]} ${phone[6]}${phone[7]}${phone[8]} ${phone[9]}${phone[10]}${phone[11]}${phone[12]}`;
      return result;
    },
    async actualizarStorage(data) {
      const crypted = await crypt(JSON.stringify(data));
      await this.$cookies.set("session", crypted);
      await this.setSession(crypted);
    },
    async verifyPassword(password, cuerpo) {
      this.sending = true;
      const body = {
        telefono: this.user.telefono,
        contrasena: password
      };
      postApi(verifyPassword, body).then(async result => {
        if (result.data) {
          const { code, msg } = result.data;
          if (parseInt(code) === 200) {
            await this.actualizarDatos(cuerpo);
            this.form.lastPassword = await "";
            this.form.password = await "";
            this.form.password2 = await "";
            this.editarseguridad = await false;
          } else {
            errorMsg("Mercar Chevere", msg);
          }
        } else {
          errorMsg(
            "Mercar Chevere",
            "No se ha podido actualizar los datos, erro de conexión con el servidor"
          );
        }
        this.sending = false;
      });
    },
    async actualizarDatos(body) {
      this.sending = true;
      const id = this.user.id;
      putApi(usuarios, id, body)
        .then(result => {
          if (result.data) {
            const { code, msg, data } = result.data;
            if (parseInt(code) === 200) {
              const usuario = { ...data, ...body };
              this.actualizarStorage(usuario);
              this.setUser(usuario);
              successMsg("Mercar Chevere", msg);
            } else {
              errorMsg("Mercar Chevere", msg);
            }
          } else {
            errorMsg(
              "Mercar Chevere",
              "No se ha podido actualizar los datos, erro de conexión con el servidor"
            );
          }
          this.sending = false;
        })
        .catch(err => {
          this.setError(err);
          this.sending = false;
          console.log("error", err);
          errorMsg("Mercar Chevere", `${err}: Error de servidor`);
        });
    }
  },
  async mounted() {
    await this.validataUser();
  }
};
</script>

<style scoped>
.white-header {
  background-color: #448aff;
  color: white;
}
</style>
