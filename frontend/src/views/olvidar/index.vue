<template>
  <div class="container" style="padding-top:2%;">
    <div class="row">
      <div class="col-12">
        <form
          novalidate
          class="md-layout d-flex justify-content-center"
          @submit.prevent="validateData"
        >
          <md-card class="md-layout-item md-size-50 md-small-size-100">
            <md-card-header>
              <div class="md-title">Recuperar contraseña</div>
            </md-card-header>
            <div v-if="!cambiar">
              <md-card-content>
                <div class="md-layout md-gutter">
                  <div class="md-layout-item md-small-size-100">
                    <md-field :class="getValidationClass('email')">
                      <label for="email">Correo electrónico</label>
                      <md-input
                        name="email"
                        id="email"
                        autocomplete="email"
                        v-model="form.email"
                        :disabled="sending || lock"
                      />
                      <span
                        class="md-error"
                        v-if="!$v.form.email.required"
                      >Correo electrónico es requerido</span>
                      <span
                        class="md-error"
                        v-else-if="!$v.form.email.email"
                      >El correo electrónico es inválido</span>
                    </md-field>
                  </div>
                </div>
                <div v-if="!tengoCodigo">
                  <md-button type="submit" class="md-primary" :disabled="sending">Enviar correo</md-button>
                  <md-button
                    class="md-primary"
                    @click="tengoCodigo = true"
                    :disabled="sending"
                  >Ya tengo código</md-button>
                </div>
                <div v-else class="md-layout-item md-small-size-100">
                  <md-field>
                    <label for="code">Código</label>
                    <md-input
                      name="code"
                      id="code"
                      autocomplete="family-name"
                      v-model="form.code"
                      :disabled="sending"
                    />
                    <span
                      class="md-error"
                      v-if="!$v.form.code.required"
                    >Código de recuperación es requerido</span>
                    <span
                      class="md-error"
                      v-else-if="
                        !$v.form.code.minlength || !$v.form.code.maxlength
                      "
                    >
                      El código proporcionado no tiene la longitud
                      correcta
                    </span>
                  </md-field>
                  <md-button
                    class="md-primary"
                    @click="validarCodigo()"
                    :disabled="sending"
                  >Validar código</md-button>
                </div>
              </md-card-content>
            </div>
            <div v-else>
              <md-card-content>
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

                <md-button class="md-primary" type="submit" :disabled="sending">Cambiar contraseña</md-button>
              </md-card-content>
            </div>
            <md-progress-bar md-mode="indeterminate" v-if="sending" />
          </md-card>
          <md-snackbar :md-active.sync="sended">Codigo enviado al correo electrónico</md-snackbar>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  requiredIf,
  email,
  minLength,
  maxLength
} from "vuelidate/lib/validators";
import { postApi } from "../../util/api";
import { forgot, codeRecovery, recoveryPassword } from "../../util/constants";
import { errorMsg, successMsg } from "../../util/utilMsg";
export default {
  name: "Olvide",
  mixins: [validationMixin],
  data() {
    return {
      sended: false,
      sending: false,
      tengoCodigo: false,
      cambiar: false,
      form: {
        email: null,
        code: null,
        password: null,
        password2: null
      },
      lock: false
    };
  },
  validations: {
    form: {
      email: {
        required: requiredIf(function() {
          return !this.cambiar;
        }),
        email
      },
      code: {
        required: requiredIf(function() {
          return this.tengoCodigo;
        }),
        minLength: minLength(6),
        maxLength: maxLength(6)
      },
      password: {
        required: requiredIf(function() {
          return this.cambiar;
        }),
        minLength: minLength(8)
      },
      password2: {
        required: requiredIf(function() {
          return this.cambiar;
        }),
        minLength: minLength(8)
      }
    }
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];
      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    validarCodigo() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.sending = true;
        const body = {
          correo: this.form.email,
          codigo: this.form.code
        };
        postApi(codeRecovery, body)
          .then(response => {
            if (response.data) {
              const { code, msg } = response.data;
              if (parseInt(code) === 200) {
                this.sending = false;
                this.cambiar = true;
              } else {
                this.sending = false;
                errorMsg("Mercar Chevere", msg);
              }
            } else {
              this.sending = false;
              errorMsg(
                "Mercar Chevere",
                "El código proporcionado es incorrecto"
              );
            }
          })
          .catch(() => {
            this.sending = false;
          });
      }
    },
    cambiarPass(data) {
      this.sending = true;
      postApi(recoveryPassword, data)
        .then(response => {
          const { code, msg } = response.data;
          if (parseInt(code) === 200) {
            successMsg("Mercar Chevere", msg);
            this.sending = false;
            this.$router.push("/login");
          } else {
            errorMsg("Mercar Chevere", msg);
            this.sending = false;
          }
        })
        .catch(err => {
          errorMsg(
            "Mercar Chevere",
            "Se ha perdido la conexión con el servidor, error: " + err
          );
          this.sending = false;
        });
    },
    sendCode() {
      this.sending = true;
      const body = Object.assign({}, this.form);
      postApi(forgot, body).then(response => {
        const { code, msg } = response.data;
        if (parseInt(code) === 200) {
          this.lock = true;
          this.sended = true;
          this.tengoCodigo = true;
        } else {
          errorMsg("Mercar Chevere", msg);
        }
        this.sending = false;
      });
    },
    validateData() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        if (!this.cambiar) {
          this.sendCode();
        } else {
          if (this.form.password !== this.form.password2) {
            errorMsg(
              "Mercar Chevere",
              "La contraseña nueva no coincide con su verificación, por favor reviselas"
            );
          } else {
            const data = {
              correo: this.form.email,
              contrasena: this.form.password
            };
            this.cambiarPass(data);
          }
        }
      }
    }
  }
};
</script>

<style scoped></style>
