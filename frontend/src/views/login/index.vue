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
                <span class="md-error" v-if="!$v.form.phone.required"
                  >El número celular es requerido</span
                >
                <span class="md-error" v-else-if="!$v.form.phone.phoneValid"
                  >El formato del número celular es incorrecto</span
                >
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
                  <span class="md-error" v-if="!$v.form.password.required"
                    >La contraseña es requerida</span
                  >
                  <span class="md-error" v-else-if="!$v.form.password.minlength"
                    >La contraseña debe tener un mínimo de 8 caracteres</span
                  >
                </md-field>
              </div>
            </md-card-content>

            <md-progress-bar md-mode="indeterminate" v-if="sending" />

            <md-card-actions class="d-flex justify-content-around">
              <md-button
                :disabled="sending"
                class="md-accent"
                @click="irSignUp()"
                >No tengo cuenta</md-button
              >
              <md-button type="submit" class="md-primary" :disabled="sending"
                >Iniciar Sesión</md-button
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
import { login } from '@/util/constants';
import { postApi } from '@/util/api';
import { mapActions } from 'vuex';
import { errorMsg, successMsg } from '@/util/UtilMsg';
import { urlBase64ToUint8Array, subscription } from '@/util';
import { public_key, notificationRegister } from '@/util/constants';

const isPhone = value => /^3(0|1|2|5)\d{8}$/.test(value); //phone valid
export default {
  name: 'Login',
  mixins: [validationMixin],
  data: () => ({
    redireccionamiento: '/',
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
    irSignUp() {
      this.$router.push('/registro');
    },
    clearForm() {
      this.$v.$reset();
      this.form.phone = null;
      this.form.password = null;
    },
    async subscribeNotification(id) {
      const subscribe = await subscription(urlBase64ToUint8Array(public_key));
      await console.log('subs', subscribe);
      await postApi(notificationRegister, { id, subscribe }).then(result => {
        console.log('Status: ', result);
      });
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
            const { code, msg, token, id } = await result.data;
            await this.$cookies.set('token', token);
            await this.$cookies.set('user', id);
            if (parseInt(code) === 200) {
              await this.subscribeNotification(id);
              await successMsg('Mercar Chevere', msg);
              await this.$router.push(this.redireccionamiento);
            } else {
              errorMsg('Mercar Chevere', msg);
            }
            this.sending = await false;
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
