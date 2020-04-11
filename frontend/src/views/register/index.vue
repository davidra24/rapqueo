<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <form
          novalidate
          class="md-layout d-flex justify-content-center"
          @submit.prevent="validateUser"
        >
          <md-card class="md-layout-item md-size-50 md-small-size-100">
            <md-card-header>
              <div class="md-title">Registro de Usuarios</div>
            </md-card-header>

            <md-card-content>
              <md-field :class="getValidationClass('phone')">
                <label for="phone">Celular</label>
                <md-input
                  name="phone"
                  id="phone"
                  autocomplete="phone"
                  v-model="form.phone"
                  :disabled="sending"
                  type="tel"
                />
                <span class="md-error" v-if="!$v.form.phone.required">El número celular es requerido</span>
                <span
                  class="md-error"
                  v-else-if="!$v.form.phone.phoneValid"
                >El formato del número celular es incorrecto</span>
              </md-field>
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
                    <span class="md-error" v-if="!$v.form.firstName.required">El nombre es requerido</span>
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
            </md-card-content>

            <md-progress-bar md-mode="indeterminate" v-if="sending" />

            <md-card-actions class="d-flex justify-content-around">
              <md-button :disabled="sending" class="md-accent" @click="irLogin()">Ya tengo cuenta</md-button>
              <md-button type="submit" class="md-primary" :disabled="sending">Crear Usuario</md-button>
            </md-card-actions>
          </md-card>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
import {
  signup,
  login,
  public_key,
  notificationRegister
} from "@/util/constants";
import { postApi } from "@/util/api";
import { mapActions } from "vuex";
import { errorMsg, successMsg } from "@/util/utilMsg";
import { crypt, decrypt } from "@/util/utilCrypt";
import { urlBase64ToUint8Array, subscription } from "@/util";

const isPhone = value => /^3(0|1|2|5)\d{8}$/.test(value); //phone valid
export default {
  name: "Register",
  mixins: [validationMixin],
  data: () => ({
    redireccionamiento: "/",
    form: {
      phone: null,
      firstName: null,
      lastName: null,
      password: null,
      password2: null
    },
    sending: false
  }),
  validations: {
    form: {
      phone: {
        required,
        minLength: minLength(8),
        phoneValid: isPhone
      },
      firstName: {
        required
      },
      lastName: {
        required
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
  mounted() {
    this.validateSession();
  },
  methods: {
    ...mapActions(["setError", "setSession", "setUser"]),
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];
      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    irLogin() {
      this.$router.push("/login");
    },

    async subscribeNotification(id) {
      const subscribe = await subscription(urlBase64ToUint8Array(public_key));
      await console.log("subs", subscribe);
      await postApi(notificationRegister, { id, subscribe }).then(result => {
        console.log("Status: ", result);
      });
    },
    clearForm() {
      this.$v.$reset();
      this.form.phone = null;
      this.form.firstName = null;
      this.form.lastName = null;
      this.form.password = null;
      this.form.password2 = null;
    },
    saveUser() {
      this.sending = true;
      if (this.form.password === this.form.password2) {
        const data = {
          telefono: `+57${this.form.phone}`,
          nombre: this.form.firstName,
          apellido: this.form.lastName,
          contrasena: this.form.password
        };
        postApi(signup, data)
          .then(async result => {
            console.log("result", result);
            console.log("result.data", result.data);
            if (result.data) {
              const { code, msg, data } = result.data;
              if (parseInt(code) === 200) {
                await successMsg("Mercar Chevere", msg);
                await this.loginNow(data);
              } else {
                errorMsg("Mercar Chevere", msg);
              }
              this.sending = false;
            } else {
              errorMsg(
                "Mercar Chevere",
                "No se ha podido crear el usuario, error de conexión al servidor"
              );
              this.sending = false;
            }
          })
          .catch(err => {
            this.setError(err);
            this.sending = false;
            errorMsg(
              "Mercar Chevere",
              `${err}: Error de conexión con el servidor`
            );
          });
      } else {
        this.sending = false;
        errorMsg(
          "Mercar Chevere",
          "La contraseña y la verificación no coinciden"
        );
      }
    },
    async loginNow(data) {
      await postApi(login, data)
        .then(async result => {
          if (result.data) {
            const { code, msg, token, data } = await result.data;
            if (parseInt(code) === 200) {
              await this.$cookies.set("token", token);
              const crypted = await crypt(await JSON.stringify(data));
              await this.$cookies.set("session", crypted);
              await this.subscribeNotification(data.id);
              await successMsg("Mercar Chevere", msg);
              await this.createSession();
              await this.$router.push(this.redireccionamiento);
            } else {
              errorMsg("Mercar Chevere", msg);
            }
            this.sending = await false;
          } else {
            errorMsg(
              "Mercar Chevere",
              "No se ha podido crear el usuario, error de conexión al servidor"
            );
            this.sending = false;
          }
        })
        .catch(err => {
          this.setError(err);
          this.sending = false;
          console.log("error", err);
          errorMsg("Mercar Chevere", `${err}: Error de servidor`);
        });
    },
    validateUser() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.saveUser();
      }
    },
    async createSession() {
      const localSession = (await this.$cookies.get("session"))
        ? await this.$cookies.get("session")
        : null;
      const localToken = (await this.$cookies.get("token"))
        ? await this.$cookies.get("token")
        : null;
      this.setSession(localSession);
      if (localSession && localToken) {
        const decryptedSession = JSON.parse(decrypt(localSession));
        this.setUser(decryptedSession);
      }
    },
    async validateSession() {
      const localSession = (await this.$cookies.get("session"))
        ? await this.$cookies.get("session")
        : null;
      const localToken = (await this.$cookies.get("token"))
        ? await this.$cookies.get("token")
        : null;
      this.setSession(localSession);
      if (localSession && localToken) await this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 8%;
}
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
</style>
