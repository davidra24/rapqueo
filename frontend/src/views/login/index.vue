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
              <div class="md-title">Iniciar Sesión</div>
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
            </md-card-content>

            <md-progress-bar md-mode="indeterminate" v-if="sending" />

            <md-card-actions class="d-flex justify-content-around">
              <md-button :disabled="sending" class="md-accent" @click="irSignUp()">No tengo cuenta</md-button>
              <md-button type="submit" class="md-primary" :disabled="sending">Iniciar Sesión</md-button>
            </md-card-actions>
          </md-card>
          <span
            style="margin-top: 2%; color: #FF5252;"
          >¡Para conocer el estado de tu pedido habilita nuestras notificaciones por favor!</span>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
import { login, public_key, notificationRegister } from "@/util/constants";
import { postApi } from "@/util/api";
import { mapActions } from "vuex";
import { errorMsg, successMsg } from "@/util/utilMsg";
import { urlBase64ToUint8Array, subscription } from "@/util";
import { crypt, decrypt } from "@/util/utilCrypt";

const isPhone = value => /^3(0|1|2|5)\d{8}$/.test(value); //phone valid
export default {
  name: "Login",
  mixins: [validationMixin],
  data: () => ({
    redireccionamiento: "/",
    form: {
      phone: null,
      password: null
    },
    sending: false,
    lastUser: null
  }),
  validations: {
    form: {
      phone: {
        required,
        minLength: minLength(8),
        phoneValid: isPhone
      },
      password: {
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
    irSignUp() {
      this.$router.push("/registro");
    },
    clearForm() {
      this.$v.$reset();
      this.form.phone = null;
      this.form.password = null;
    },
    async subscribeNotification(id) {
      const subscribe = await subscription(urlBase64ToUint8Array(public_key));
      await console.log("subs", subscribe);
      await postApi(notificationRegister, { id, subscribe }).then(
        async result => {
          await console.log("Status: ", result);
        }
      );
    },
    async saveUser() {
      this.sending = true;
      const data = {
        telefono: `+57${this.form.phone}`,
        contrasena: this.form.password
      };
      await postApi(login, data)
        .then(async result => {
          if (result.data) {
            const { code, msg, token, data } = await result.data;
            if (parseInt(code) === 200) {
              const str = await JSON.stringify(data);
              console.log(str);
              console.log(data);
              const crypted = await crypt(str);
              await this.$cookies.set("session", crypted);
              await this.$cookies.set("token", token);
              //await this.subscribeNotification(data.id);
              await this.createSession();
              await successMsg("Mercar Chevere", msg);
              this.sending = await false;
              await this.$router.push(this.redireccionamiento);
            } else {
              this.sending = await false;
              errorMsg("Mercar Chevere", msg);
            }
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
      console.log("localsesion", localSession);
      if (localSession && localToken) {
        const decryptedSession = await JSON.parse(decrypt(localSession));
        await this.setUser(decryptedSession);
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
