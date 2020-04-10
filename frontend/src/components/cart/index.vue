<template>
  <div class="d-flex justify-content-center">
    <div class="col-12 col-md-10 col-lg-8">
      <div v-if="logged">
        <md-steppers :md-active-step.sync="active" md-vertical md-linear>
          <md-step id="first" md-label="Confirmar productos" :md-done.sync="first">
            <p>PRODUCTOS DEL PEDIDO</p>
            <div class="container">
              <div class="row">
                <md-list class="col-12 col-lg-6" v-for="item in cart" :key="item._id">
                  <md-list-item style="margin-left: -8%; margin-right: -12%;">
                    <BuyContent v-bind:item="item" />
                  </md-list-item>
                </md-list>
              </div>
            </div>
            <md-button class="md-primary" @click="setDone('first', 'second')">SIGUIENTE</md-button>
          </md-step>
          <md-step
            id="second"
            md-label="Seleccionar direccion"
            :md-editable="true"
            :md-done.sync="second"
          >
            <p>SELECCIONE LA DIRECCION</p>
            <div>
              <div>
                <div v-for="dir in user.direccion" :key="dir.direccion">
                  <b-alert show :variant="alert">
                    <div class="row">
                      <div class="col-1">
                        <md-radio class="md-primary" v-model="Direccion" v-bind:value="dir"></md-radio>
                      </div>
                      <div class="col-10">
                        <p>Barrio: {{dir.barrio}}</p>
                        <p>Direccion: {{dir.direccion}}</p>
                        <p>Datos adicionales: {{dir.datos_adicionales}}</p>
                      </div>
                    </div>
                  </b-alert>
                </div>
                <div>
                  <b-alert show :variant="alert">
                    <div class="d-flex justify-content-start">
                      <md-radio
                        class="md-primary"
                        v-model="Direccion"
                        value="otro"
                      >Agregar direccion</md-radio>
                    </div>
                    <div v-if="Direccion==='otro'">
                      <form novalidate @submit.prevent="validateDirection">
                        <div class="d-flex justify-content-center">
                          <md-autocomplete
                            name="Via"
                            id="Via"
                            class="col-3"
                            style="margin-right:3%;"
                            v-model="form.Via"
                            :md-options="via"
                            :disabled="sending"
                            :class="getValidationClass('Via')"
                          >
                            <label>Via</label>
                            <span class="md-helper-text">Ej: Calle, Carrera</span>
                            <span
                              class="md-error"
                              v-if="!$v.form.Via.required"
                            >El nombre de la via es requerida</span>
                            <span
                              class="md-error"
                              v-else-if="!$v.form.Via.ViaValid"
                            >El formato del nombre de la via es incorrecto</span>
                          </md-autocomplete>
                          <md-field
                            class="col-1"
                            style="margin-right:1%;"
                            name="numeroVia"
                            id="numeroVia"
                            v-model="form.numeroVia"
                            :disabled="sending"
                            :class="getValidationClass('numeroVia')"
                          >
                            <label>Numero</label>
                            <md-input v-model="form.numeroVia" md-counter="false" maxlength="2"></md-input>
                            <span class="md-error" v-if="!$v.form.numeroVia.required">Requerido</span>
                            <span
                              class="md-error"
                              v-else-if="!$v.form.numeroVia.ViaValid"
                            >Formato incorrecto</span>
                          </md-field>
                          <md-field
                            class="col-2"
                            style="margin-right:3%;"
                            name="letra"
                            id="letra"
                            v-model="form.letra"
                            :disabled="sending"
                            :class="getValidationClass('letra')"
                          >
                            <label>Especial</label>
                            <span class="md-helper-text">Ej: A, SUR, A SUR</span>
                            <md-input v-model="form.letra" md-counter="false" maxlength="7"></md-input>
                            <span class="md-error" v-if="!$v.form.letra.ViaValid">Formato incorrecto</span>
                          </md-field>
                          <div class="d-flex align-items-center" style="margin-right:1%;">#</div>
                          <md-field
                            class="col-1"
                            style="margin-right:1%;"
                            name="numero1"
                            id="numero1"
                            v-model="form.numero1"
                            :disabled="sending"
                            :class="getValidationClass('numero1')"
                          >
                            <label>Numero</label>
                            <md-input v-model="form.numero1" md-counter="false" maxlength="2"></md-input>
                            <span class="md-error" v-if="!$v.form.numero1.required">Requerido</span>
                            <span
                              class="md-error"
                              v-else-if="!$v.form.numero1.ViaValid"
                            >Formato incorrecto</span>
                          </md-field>
                          <md-field
                            class="col-1"
                            name="letra1"
                            id="letra1"
                            v-model="form.letra1"
                            :disabled="sending"
                            :class="getValidationClass('letra1')"
                          >
                            <label>Letra</label>
                            <md-input v-model="form.letra1" md-counter="false" maxlength="1"></md-input>
                            <span
                              class="md-error"
                              v-if="!$v.form.letra1.ViaValid"
                            >Formato incorrecto</span>
                          </md-field>
                          <div class="d-flex align-items-center" style="margin-right:1%;">-</div>
                          <md-field
                            class="col-1"
                            style="margin-right:1%;"
                            name="numero2"
                            id="numero2"
                            v-model="form.numero2"
                            :disabled="sending"
                            :class="getValidationClass('numero2')"
                          >
                            <label>Numero</label>
                            <md-input v-model="form.numero2" md-counter="false" maxlength="3"></md-input>
                            <span class="md-error" v-if="!$v.form.numero2.required">Requerido</span>
                            <span
                              class="md-error"
                              v-else-if="!$v.form.numero2.ViaValid"
                            >Formato incorrecto</span>
                          </md-field>
                          <md-field
                            class="col-1"
                            name="letra2"
                            id="letra2"
                            v-model="form.letra2"
                            :disabled="sending"
                            :class="getValidationClass('letra2')"
                          >
                            <label>Especial</label>
                            <span class="md-helper-text">Ej: SUR</span>
                            <md-input v-model="form.letra2" md-counter="false" maxlength="5"></md-input>
                            <span
                              class="md-error"
                              v-if="!$v.form.letra2.ViaValid"
                            >Formato incorrecto</span>
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
                            <span
                              class="md-error"
                              v-if="!$v.form.barrio.required"
                            >El nombre del barrio es requerido</span>
                          </md-field>
                        </div>
                        <div class="d-flex justify-content-center">
                          <md-field class="col-6">
                            <label>Informacion adicional</label>
                            <md-input v-model="form.info"></md-input>
                            <span class="md-helper-text">Ej: Conjunto x torre 3 apto 402</span>
                          </md-field>
                        </div>
                      </form>
                    </div>
                  </b-alert>
                  <div v-if="verify" style="color:red;">
                    <p>Debe seleccionar una direccion</p>
                  </div>
                </div>
              </div>
              <div class="d-flex">
                <md-button
                  class="mr-auto p-2 md-primary"
                  @click="setDone('second', 'first')"
                >ANTERIOR</md-button>
                <md-button
                  class="ml-auto p-2 md-primary"
                  @click="setDone('second', 'third')"
                >SIGUIENTE</md-button>
              </div>
            </div>
          </md-step>

          <md-step id="third" md-label="Third Step" :md-editable="true" :md-done.sync="third">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
              doloribus eveniet quaerat modi cumque quos sed, temporibus nemo eius
              amet aliquid, illo minus blanditiis tempore, dolores voluptas dolore
              placeat nulla.
            </p>
            <md-button class="md-raised md-primary" @click="setDone('third')">Done</md-button>
          </md-step>
        </md-steppers>
      </div>
    </div>
  </div>
</template>

<script>
import { required, between, integer, alpha } from "vuelidate/lib/validators";
import { mapState, mapActions, mapGetters } from "vuex";
import BuyContent from "./Buycontent";
import { getCart } from "../../util";
const validVias = value =>
  /(Calle|Carrera|Diagonal|Transversal|Avenida)$/.test(value);
export default {
  name: "CartComponent",
  props: ["user"],
  data: () => ({
    verify: false,
    logged: false,
    items: [],
    radio: false,
    Direccion: "no",
    active: "first",
    first: false,
    second: false,
    third: false,
    alert: "secondary",
    via: ["Calle", "Carrera", "Diagonal", "Transversal", "Avenida"],
    form: {
      Via: null,
      numeroVia: null,
      numero1: null,
      numero2: null,
      letra: null,
      letra1: null,
      letra2: null,
      barrio: null,
      info: null
    },
    sending: false
  }),
  validations: {
    form: {
      Via: {
        required,
        validVias
      },
      numeroVia: {
        required,
        integer,
        between: between(1, 99)
      },
      numero1: {
        required,
        integer,
        between: between(1, 99)
      },
      numero2: {
        required,
        integer,
        between: between(1, 999)
      },
      letra: {
        alpha
      },
      letra1: {
        alpha
      },
      letra2: {
        alpha
      },
      barrio: {
        required
      }
    }
  },
  components: {
    BuyContent
  },
  computed: {
    ...mapState(["cart", "user"]),
    ...mapGetters(["getCountCart"])
  },
  methods: {
    ...mapActions(["setCart"]),
    validateUser() {
      if (!this.cart || this.getCountCart == 0) {
        this.$router.push("/");
      }
    },
    getItem() {
      this.items = getCart();
    },
    setDone(id, index) {
      if (id == "second" && index == "third") {
        if (this.Direccion == "otro") {
          this.verify = false;
          if (this.validateDirection()) {
            this[id] = true;
            this.active = index;
          }
        } else {
          if (this.Direccion == "no") {
            this.verify = true;
          } else {
            this.verify = false;
            this[id] = true;
            this.active = index;
          }
        }
      } else {
        this[id] = true;
        this.active = index;
      }
    },
    validateLoggin() {
      this.logged = this.$cookies.get("session") && this.$cookies.get("token");
    },
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];
      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    saveDirection() {
      this.sending = true;
      const data = {
        barrio: this.form.barrio,
        direccion: `${this.form.Via}+" "+${this.form.numero}+" "+${this.form.letra}+" # "+${this.form.numero1}+" "+${this.form.letra1}+" "+${this.form.numero2}+" "${this.form.letra2}`,
        datos_adicionales: this.form.info
      };
      console.log(data);
    },
    validateDirection() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        //this.saveDirection();
        return true;
      }
    },
    clearForm() {
      this.$v.$reset();
      this.form.Via = null;
      this.form.numeroVia = null;
      this.form.numero1 = null;
      this.form.numero2 = null;
    }
  },
  mounted() {
    this.getItem();
    this.validateUser();
    this.validateLoggin();
  }
};
</script>
<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
