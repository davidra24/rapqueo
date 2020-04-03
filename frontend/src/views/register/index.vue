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
                <span class="md-error" v-if="!$v.form.phone.required"
                  >El número celular es requerido</span
                >
                <span class="md-error" v-else-if="!$v.form.phone.phoneValid"
                  >El formato del número celular es incorrecto</span
                >
              </md-field>
              <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <md-field :class="getValidationClass('firstName')">
                    <label for="first-name">Nombre</label>
                    <md-input
                      name="first-name"
                      id="first-name"
                      autocomplete="given-name"
                      v-model="form.firstName"
                      :disabled="sending"
                    />
                    <span class="md-error" v-if="!$v.form.firstName.required"
                      >El nombre es requerido</span
                    >
                  </md-field>
                </div>

                <div class="md-layout-item md-small-size-100">
                  <md-field :class="getValidationClass('lastName')">
                    <label for="last-name">Apellido</label>
                    <md-input
                      name="last-name"
                      id="last-name"
                      autocomplete="family-name"
                      v-model="form.lastName"
                      :disabled="sending"
                    />
                    <span class="md-error" v-if="!$v.form.lastName.required"
                      >El apellido es requerido</span
                    >
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
                    <span class="md-error" v-if="!$v.form.password.required"
                      >La contraseña es requerida</span
                    >
                    <span
                      class="md-error"
                      v-else-if="!$v.form.password.minlength"
                      >La contraseña debe tener un mínimo de 8 caracteres</span
                    >
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
                    <span class="md-error" v-if="!$v.form.password2.required"
                      >Confirmación de contraseña es requerida</span
                    >
                    <span
                      class="md-error"
                      v-else-if="!$v.form.password2.minlength"
                      >La contraseña debe tener un mínimo de 8 caracteres</span
                    >
                  </md-field>
                </div>
              </div>
            </md-card-content>

            <md-progress-bar md-mode="indeterminate" v-if="sending" />

            <md-card-actions class="d-flex justify-content-around">
              <md-button
                :disabled="sending"
                class="md-accent"
                @click="irLogin()"
              >
                Ya tengo cuenta
              </md-button>
              <md-button type="submit" class="md-primary" :disabled="sending"
                >Crear Usuario</md-button
              >
            </md-card-actions>
          </md-card>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, minLength } from 'vuelidate/lib/validators';
import { signup } from '@/util/constants';
import { postApi } from '@/util/api';
import { mapActions } from 'vuex';
import { errorMsg, successMsg } from '@/util/UtilMsg';

const isPhone = value => /^3(0|1|2|5)\d{8}$/.test(value); //phone valid
export default {
  name: 'Register',
  mixins: [validationMixin],
  data: () => ({
    redireccionamiento: '/login',
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
  methods: {
    ...mapActions(['setError']),
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        };
      }
    },
    irLogin() {
      this.$router.push('/login');
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
          .then(result => {
            console.log('result', result);
            console.log('result.data', result.data);
            if (result.data) {
              const { code, msg } = result.data;
              if (code === '200') {
                successMsg('Mercar Chevere', msg);
                this.$router.push(this.redireccionamiento);
              } else {
                errorMsg('Mercar Chevere', msg);
              }
              this.sending = false;
            } else {
              errorMsg(
                'Mercar Chevere',
                'No se ha podido crear el usuario, error de conexión al servidor'
              );
              this.sending = false;
            }
          })
          .catch(err => {
            this.setError(err);
            this.sending = false;
            errorMsg(
              'Mercar Chevere',
              `${err}: Error de conexión con el servidor`
            );
          });
      } else {
        this.sending = false;
        errorMsg(
          'Mercar Chevere',
          'La contraseña y la verificación no coinciden'
        );
      }
    },
    validateUser() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.saveUser();
      }
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
