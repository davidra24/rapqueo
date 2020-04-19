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
                >Datos Personales</b-button
              >
            </b-card-header>
            <b-collapse
              id="accordion-1"
              visible
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <!----------------------------------->
                <md-chip class="md-accent">{{
                  formatTelephone(user.telefono)
                }}</md-chip>
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
                            >El nombre es requerido</span
                          >
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
                            >El apellido es requerido</span
                          >
                        </md-field>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-12 col-md-6">
                        <md-button
                          class="md-raised md-accent"
                          @click="cancelarPersonales()"
                          :disabled="sending"
                          >Cancelar</md-button
                        >
                      </div>
                      <div class="col-12 col-md-6">
                        <md-button
                          class="md-raised md-primary"
                          :disabled="sending"
                          type="submit"
                          >Aceptar</md-button
                        >
                      </div>
                    </div>
                  </form>
                </div>
                <div v-else>
                  <div class="md-layout md-gutter">
                    <div class="md-layout-item md-small-size-100">
                      <strong>Nombres:</strong>
                      &nbsp;&nbsp;{{ user.nombre }}
                    </div>
                    <div class="md-layout-item md-small-size-100">
                      <strong>Apellidos:</strong>
                      &nbsp;&nbsp;{{ user.apellido }}
                    </div>
                  </div>
                  <md-button
                    @click="editarPersonales()"
                    class="md-raised md-primary"
                    :disabled="sending"
                    >Editar</md-button
                  >
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
                >Datos de seguridad</b-button
              >
            </b-card-header>
            <b-collapse
              id="accordion-2"
              accordion="my-accordion"
              role="tabpanel"
            >
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
                          >La contraseña es requerida</span
                        >
                        <span
                          class="md-error"
                          v-else-if="!$v.form.lastPassword.minlength"
                          >La contraseña debe tener un mínimo de 8
                          caracteres</span
                        >
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
                            >La contraseña es requerida</span
                          >
                          <span
                            class="md-error"
                            v-else-if="!$v.form.password.minlength"
                            >La contraseña debe tener un mínimo de 8
                            caracteres</span
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
                          <span
                            class="md-error"
                            v-if="!$v.form.password2.required"
                            >Confirmación de contraseña es requerida</span
                          >
                          <span
                            class="md-error"
                            v-else-if="!$v.form.password2.minlength"
                            >La contraseña debe tener un mínimo de 8
                            caracteres</span
                          >
                        </md-field>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-12 col-md-6">
                        <md-button
                          class="md-raised md-accent"
                          :disabled="sending"
                          @click="cancelarSeguridad()"
                          >Cancelar</md-button
                        >
                      </div>
                      <div class="col-12 col-md-6">
                        <md-button
                          class="md-raised md-primary"
                          :disabled="sending"
                          type="submit"
                          >Aceptar</md-button
                        >
                      </div>
                    </div>
                  </form>
                </div>
                <div v-else>
                  <div class="col-12">
                    <strong>Contraseña:</strong
                    >&nbsp;&nbsp;&nbsp;&nbsp;•••••••••••••••
                  </div>
                  <md-button
                    @click="editarSeguridad()"
                    class="md-raised md-primary"
                    :disabled="sending"
                    >Editar</md-button
                  >
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
                >Datos de Envío</b-button
              >
            </b-card-header>
            <b-collapse
              id="accordion-3"
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <div v-for="dir in user.direccion" :key="dir.direccion">
                  <b-alert show variant="secondary">
                    <div class="row">
                      <p class="col-11 d-flex justify-content-center">
                        Barrio: {{ dir.barrio }}
                      </p>
                      <div
                        class="col-1 d-flex justify-content-end"
                        v-if="editardireccion"
                      >
                        <md-button
                          class="md-icon-button md-accent"
                          @click="quitarDireccion(dir)"
                          :disabled="sending"
                        >
                          <md-icon>delete_outline</md-icon>
                        </md-button>
                      </div>
                      <p class="col-12">Direccion: {{ dir.direccion }}</p>
                      <p class="col-12">
                        Datos adicionales: {{ dir.datos_adicionales }}
                      </p>
                    </div>
                  </b-alert>
                </div>
                <div v-if="editardireccion">
                  <b-alert show variant="secondary">
                    <form novalidate @submit.prevent="validateForm(2)">
                      <div class="d-flex justify-content-center row">
                        <md-autocomplete
                          name="Via"
                          id="Via"
                          class="col-5 col-lg-2"
                          style="margin-right:3%;"
                          v-model="form.Via"
                          :md-options="via"
                          :disabled="sending"
                          :class="getValidationClass('Via')"
                        >
                          <label>Via</label>
                          <span class="md-helper-text">Ej: Calle, Carrera</span>
                          <span class="md-error" v-if="!$v.form.Via.required"
                            >El nombre de la via es requerida</span
                          >
                          <span
                            class="md-error"
                            v-else-if="!$v.form.Via.ViaValid"
                            >El formato del nombre de la via es incorrecto</span
                          >
                        </md-autocomplete>
                        <md-field
                          class="col-3 col-lg-1"
                          style="margin-right:1%;"
                          name="numeroVia"
                          id="numeroVia"
                          v-model="form.numeroVia"
                          :disabled="sending"
                          :class="getValidationClass('numeroVia')"
                        >
                          <label>Numero</label>
                          <md-input
                            v-model="form.numeroVia"
                            md-counter="false"
                            maxlength="2"
                          ></md-input>
                          <span
                            class="md-error"
                            v-if="!$v.form.numeroVia.required"
                            >Requerido</span
                          >
                          <span
                            class="md-error"
                            v-else-if="!$v.form.numeroVia.ViaValid"
                            >Formato incorrecto</span
                          >
                        </md-field>
                        <md-field
                          class="col-3 col-lg-2"
                          style="margin-right:3%;"
                          name="letra"
                          id="letra"
                          v-model="form.letra"
                          :disabled="sending"
                          :class="getValidationClass('letra')"
                        >
                          <label>Especial</label>
                          <span class="md-helper-text">Ej: A; SUR; B SUR</span>
                          <md-input
                            v-model="form.letra"
                            md-counter="false"
                            maxlength="7"
                          ></md-input>
                          <span class="md-error" v-if="!$v.form.letra.ViaValid"
                            >Formato incorrecto</span
                          >
                        </md-field>
                        <div
                          class="d-flex align-items-center"
                          style="margin-right:0.4%;"
                        >
                          #
                        </div>
                        <md-field
                          class="col-4 col-md-2 col-lg-1"
                          style="margin-right:1%;"
                          name="numero1"
                          id="numero1"
                          v-model="form.numero1"
                          :disabled="sending"
                          :class="getValidationClass('numero1')"
                        >
                          <label>Numero</label>
                          <md-input
                            v-model="form.numero1"
                            md-counter="false"
                            maxlength="2"
                          ></md-input>
                          <span
                            class="md-error"
                            v-if="!$v.form.numero1.required"
                            >Requerido</span
                          >
                          <span
                            class="md-error"
                            v-else-if="!$v.form.numero1.ViaValid"
                            >Formato incorrecto</span
                          >
                        </md-field>
                        <md-field
                          class="col-4 col-md-2 col-lg-1"
                          name="letra1"
                          id="letra1"
                          v-model="form.letra1"
                          :disabled="sending"
                          :class="getValidationClass('letra1')"
                        >
                          <label>Letra</label>
                          <md-input
                            v-model="form.letra1"
                            md-counter="false"
                            maxlength="1"
                          ></md-input>
                          <span class="md-error" v-if="!$v.form.letra1.ViaValid"
                            >Formato incorrecto</span
                          >
                        </md-field>
                        <div
                          class="d-flex align-items-center"
                          style="margin-right:1%;"
                        >
                          -
                        </div>
                        <md-field
                          class="col-4 col-md-2 col-lg-1"
                          style="margin-right:1%;"
                          name="numero2"
                          id="numero2"
                          v-model="form.numero2"
                          :disabled="sending"
                          :class="getValidationClass('numero2')"
                        >
                          <label>Numero</label>
                          <md-input
                            v-model="form.numero2"
                            md-counter="false"
                            maxlength="3"
                          ></md-input>
                          <span
                            class="md-error"
                            v-if="!$v.form.numero2.required"
                            >Requerido</span
                          >
                          <span
                            class="md-error"
                            v-else-if="!$v.form.numero2.ViaValid"
                            >Formato incorrecto</span
                          >
                        </md-field>
                        <md-field
                          class="col-4 col-md-2"
                          name="letra2"
                          id="letra2"
                          v-model="form.letra2"
                          :disabled="sending"
                          :class="getValidationClass('letra2')"
                        >
                          <label>Especial</label>
                          <span class="md-helper-text">Ej: SUR</span>
                          <md-input
                            v-model="form.letra2"
                            md-counter="false"
                            maxlength="5"
                          ></md-input>
                          <span class="md-error" v-if="!$v.form.letra2.ViaValid"
                            >Formato incorrecto</span
                          >
                        </md-field>
                      </div>
                      <div class="d-flex justify-content-center">
                        <md-field
                          class="col-6"
                          name="barrio"
                          id="barrio"
                          v-model="form.barrio"
                          :disabled="sending"
                          :class="getValidationClass('barrio')"
                        >
                          <label>Barrio</label>
                          <md-input v-model="form.barrio"></md-input>
                          <span class="md-error" v-if="!$v.form.barrio.required"
                            >El nombre del barrio es requerido</span
                          >
                        </md-field>
                      </div>
                      <div class="d-flex justify-content-center">
                        <md-field class="col-6">
                          <label>Informacion adicional</label>
                          <md-input v-model="form.info"></md-input>
                          <span class="md-helper-text"
                            >Ej: Conjunto x torre 3 apto 402</span
                          >
                        </md-field>
                      </div>
                      <div class="row">
                        <div class="col-12">
                          <md-button
                            class="md-raised md-primary"
                            :disabled="sending"
                            type="submit"
                            >Guardar direccion</md-button
                          >
                        </div>
                      </div>
                    </form>
                  </b-alert>
                </div>
                <md-button
                  v-if="!editardireccion"
                  @click="editarDireccion()"
                  class="md-raised md-primary"
                  :disabled="sending"
                  >Editar</md-button
                >
                <md-button
                  v-if="editardireccion"
                  @click="cancelarDireccion()"
                  class="md-raised md-primary"
                  :disabled="sending"
                  >Terminar</md-button
                >
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
  import {
    requiredIf,
    minLength,
    integer,
    between,
    alpha,
  } from "vuelidate/lib/validators";
  import { mapState, mapActions } from "vuex";
  import { crypt } from "../../util/utilCrypt";
  import { putApi, postApi } from "../../util/api";
  import { usuarios, verifyPassword } from "../../util/constants";
  import { successMsg, errorMsg } from "../../util/utilMsg";
  const validVias = (value) =>
    /(Calle|Carrera|Diagonal|Transversal|Avenida)$/.test(value);
  export default {
    name: "Perfil",
    mixins: [validationMixin],
    computed: {
      ...mapState(["user"]),
    },
    data() {
      return {
        via: ["Calle", "Carrera", "Diagonal", "Transversal", "Avenida"],
        form: {
          Via: "",
          numeroVia: "",
          numero1: "",
          numero2: "",
          letra: "",
          letra1: "",
          letra2: "",
          barrio: "",
          info: "",
          firstName: "",
          lastName: "",
          lastPassword: "",
          password: "",
          password2: "",
        },
        editarpersonales: false,
        editarseguridad: false,
        editardireccion: false,
        sending: false,
      };
    },
    validations: {
      form: {
        firstName: {
          required: requiredIf(function() {
            return this.editarpersonales;
          }),
        },
        lastName: {
          required: requiredIf(function() {
            return this.editarpersonales;
          }),
        },
        lastPassword: {
          required: requiredIf(function() {
            return this.editarseguridad;
          }),
          minLength: minLength(8),
        },
        password: {
          required: requiredIf(function() {
            return this.editarseguridad;
          }),
          minLength: minLength(8),
        },
        password2: {
          required: requiredIf(function() {
            return this.editarseguridad;
          }),
          minLength: minLength(8),
        },
        Via: {
          required: requiredIf(function() {
            return this.editardireccion;
          }),
          validVias,
        },
        numeroVia: {
          required: requiredIf(function() {
            return this.editardireccion;
          }),
          integer,
          between: between(1, 99),
        },
        numero1: {
          required: requiredIf(function() {
            return this.editardireccion;
          }),
          integer,
          between: between(1, 99),
        },
        numero2: {
          required: requiredIf(function() {
            return this.editardireccion;
          }),
          integer,
          between: between(1, 999),
        },
        letra: {
          alpha,
        },
        letra1: {
          alpha,
        },
        letra2: {
          alpha,
        },
        barrio: {
          required: requiredIf(function() {
            return this.editardireccion;
          }),
        },
      },
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
          apellido: this.form.lastName,
        };
        this.actualizarDatos(data);
      },
      cancelarPersonales() {
        this.editarpersonales = false;
      },
      editarSeguridad() {
        this.editarseguridad = true;
      },
      guardarSeguridad() {
        const data = {
          contrasena: this.form.password,
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
      editarDireccion() {
        this.editardireccion = true;
        this.$v.$reset();
      },
      async quitarDireccion(dir) {
        const direcciones = this.user.direccion;
        var finalDir = [];
        await direcciones.map((direccion) => {
          if (
            direccion.direccion !== dir.direccion &&
            direccion.barrio !== dir.barrio &&
            direccion.datos_adicionales !== dir.datos_adicionales
          ) {
            finalDir.push(direccion);
          }
        });
        const newUser = {
          ...this.user,
          direccion: finalDir,
        };
        this.setUser(newUser);
        this.actualizarDatos({ direccion: finalDir });
      },
      cancelarDireccion() {
        this.editardireccion = false;
        this.clearForm();
      },
      guardarDireccion() {
        this.editardireccion = false;
        const direccion = this.datosDireccion();
        this.save(direccion);
      },
      datosDireccion() {
        return {
          barrio: this.form.barrio,
          direccion:
            this.form.Via +
            " " +
            this.form.numeroVia +
            this.form.letra +
            " #" +
            this.form.numero1 +
            this.form.letra1 +
            "-" +
            this.form.numero2 +
            this.form.letra2,
          datos_adicionales: this.form.info,
        };
      },
      async save(body) {
        var direccion = this.user.direccion;
        direccion.push(body);
        this.actualizarDatos({ direccion });
      },
      getValidationClass(fieldName) {
        const field = this.$v.form[fieldName];
        if (field) {
          return {
            "md-invalid": field.$invalid && field.$dirty,
          };
        }
      },
      clearForm() {
        this.$v.$reset();
        this.form.Via = "";
        this.form.numeroVia = "";
        this.form.numero1 = "";
        this.form.numero2 = "";
        this.letra = "";
        this.letra1 = "";
        this.letra2 = "";
        this.barrio = "";
        this.info = "";
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
        console.log(!this.$v.$invalid);
        if (!this.$v.$invalid) {
          switch (id) {
            case 0:
              this.guardarPersonales();
              break;
            case 1:
              this.guardarSeguridad();
              break;
            case 2:
              this.guardarDireccion();
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
          contrasena: password,
        };
        postApi(verifyPassword, body).then(async (result) => {
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
          .then((result) => {
            if (result.data) {
              const { code, msg, data } = result.data;
              console.log(result.data);
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
          .catch((err) => {
            this.setError(err);
            this.sending = false;
            console.log("error", err);
            errorMsg("Mercar Chevere", `${err}: Error de servidor`);
          });
      },
    },
    async mounted() {
      await this.validataUser();
    },
  };
</script>

<style scoped>
  .white-header {
    background-color: #448aff;
    color: white;
  }
</style>
