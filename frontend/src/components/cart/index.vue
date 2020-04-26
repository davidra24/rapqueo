<template>
  <div class="d-flex justify-content-center">
    <div class="col-12 col-md-10 col-lg-8">
      <div v-if="logged">
        <md-steppers :md-active-step.sync="active" md-vertical md-linear>
          <md-step id="first" md-label="Confirmar productos" :md-done.sync="first">
            <h3>PRODUCTOS DEL PEDIDO</h3>
            <div class="container">
              <div class="row">
                <md-list class="col-12 col-lg-6" v-for="item in cart" :key="item._id">
                  <md-list-item style="margin-left: -8%; margin-right: -12%;">
                    <BuyContent v-bind:item="item" />
                  </md-list-item>
                </md-list>
                <div class="col-12">
                  <h4>
                    <strong>Precio Total:</strong>
                    ${{ totalPriece }}
                  </h4>
                </div>
              </div>
            </div>
            <div class="d-flex">
              <md-button class="mr-auto p-2 md-raised md-accent" @click="cancelar()">CANCELAR</md-button>
              <md-button
                class="ml-auto p-2 md-raised md-primary"
                @click="setDone('first', 'second')"
              >SIGUIENTE</md-button>
            </div>
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
                <div v-for="(dir, index) in user.direccion" :key="index">
                  <b-alert show :variant="Direccion===dir?selected:alert">
                    <div class="row" @click="Direccion=dir" style="cursor:pointer;">
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
                  <b-alert show :variant="Direccion==='otro'?selected:alert">
                    <div
                      class="d-flex justify-content-start"
                      @click="Direccion='otro'"
                      style="cursor:pointer;"
                    >
                      <md-radio
                        class="md-primary"
                        v-model="Direccion"
                        value="otro"
                      >Agregar direccion</md-radio>
                    </div>
                    <div v-if="Direccion==='otro'">
                      <form novalidate @submit.prevent="validateDirection">
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
                            class="col-3 col-lg-1"
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
                            <md-input v-model="form.letra" md-counter="false" maxlength="7"></md-input>
                            <span class="md-error" v-if="!$v.form.letra.ViaValid">Formato incorrecto</span>
                          </md-field>
                          <div class="d-flex align-items-center" style="margin-right:0.4%;">#</div>
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
                            <md-input v-model="form.numero1" md-counter="false" maxlength="2"></md-input>
                            <span class="md-error" v-if="!$v.form.numero1.required">Requerido</span>
                            <span
                              class="md-error"
                              v-else-if="!$v.form.numero1.ViaValid"
                            >Formato incorrecto</span>
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
                            <md-input v-model="form.letra1" md-counter="false" maxlength="1"></md-input>
                            <span
                              class="md-error"
                              v-if="!$v.form.letra1.ViaValid"
                            >Formato incorrecto</span>
                          </md-field>
                          <div class="d-flex align-items-center" style="margin-right:1%;">-</div>
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
                            <md-input v-model="form.numero2" md-counter="false" maxlength="3"></md-input>
                            <span class="md-error" v-if="!$v.form.numero2.required">Requerido</span>
                            <span
                              class="md-error"
                              v-else-if="!$v.form.numero2.ViaValid"
                            >Formato incorrecto</span>
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
                  class="mr-auto p-2 md-raised md-accent"
                  @click="setDone('second', 'first')"
                >ANTERIOR</md-button>
                <md-button
                  class="ml-auto p-2 md-raised md-primary"
                  @click="setDone('second', 'third')"
                >SIGUIENTE</md-button>
              </div>
            </div>
          </md-step>

          <md-step id="third" md-label="Método de pago" :md-editable="true" :md-done.sync="third">
            <div class="row" style="margin-bottom: 2%;">
              <div class="col-12">
                <h3>Seleccione su medio de pago</h3>
              </div>
              <div class="col-12">
                <div class="row">
                  <div class="col-12 col-md-6" style="margin-bottom:3%;" @click="pago='Efectivo'">
                    <md-card
                      style="height:100%;"
                      :class="pago==='Efectivo'?'md-primary':''"
                      md-with-hover
                    >
                      <md-ripple>
                        <md-card-header>
                          <div class="md-title">PAGO EN EFECTIVO</div>
                        </md-card-header>
                        <md-card-content>
                          <font-awesome-icon icon="money-bill-wave" size="3x" />
                        </md-card-content>
                      </md-ripple>
                    </md-card>
                  </div>
                  <div class="col-12 col-md-6" style="margin-bottom:3%;" @click="pago='Tarjeta'">
                    <md-card
                      style="height:100%;"
                      :class="pago==='Tarjeta'?'md-primary':''"
                      md-with-hover
                    >
                      <md-ripple>
                        <md-card-header>
                          <div class="md-title">TARJETA EN SITIO</div>
                        </md-card-header>
                        <md-card-content>
                          <font-awesome-icon icon="credit-card" size="3x" />
                        </md-card-content>
                      </md-ripple>
                    </md-card>
                  </div>
                  <div class="col-12" v-if="verifyPago" style="color:red; margin-top: 2%;">
                    <p>Debe seleccionar una metodo de pago</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex">
              <md-button
                class="mr-auto p-2 md-raised md-accent"
                @click="setDone('third', 'second')"
              >ANTERIOR</md-button>
              <md-button
                class="ml-auto p-2 md-raised md-primary"
                @click="setDone('third')"
              >FINALIZAR</md-button>
            </div>
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
import { postApi, putApi } from "../../util/api";
import { errorMsg, successMsg } from "../../util/utilMsg";
import { pedidos, usuarios } from "../../util/constants";

const validVias = value =>
  /(Calle|Carrera|Diagonal|Transversal|Avenida)$/.test(value);
export default {
  name: "CartComponent",
  data: () => ({
    verify: false,
    verifyPago: false,
    logged: false,
    items: [],
    radio: false,
    Direccion: "",
    active: "first",
    first: false,
    second: false,
    third: false,
    alert: "secondary",
    selected: "primary",
    pago: "",
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
      info: ""
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
    ...mapGetters(["getCountCart", "totalPriece"])
  },
  methods: {
    ...mapActions(["setCart", "setProducts"]),
    validateUser() {
      if (!this.cart || this.getCountCart == 0) {
        this.$router.push("/");
      }
    },
    getItem() {
      this.items = getCart();
    },
    cancelar() {
      this.$router.push("/");
    },
    setDone(id, index) {
      if (id === "second" && index === "third") {
        if (this.Direccion === "otro") {
          this.verify = false;
          if (this.validateDirection()) {
            this[id] = true;
            this.active = index;
          }
        } else {
          if (!this.Direccion) {
            this.verify = true;
          } else {
            this.verify = false;
            this[id] = true;
            this.active = index;
          }
        }
      } else if (id === "third" && index !== "second") {
        this.verifyPago = !this.pago;
        if (!this.verifyPago) {
          const direccion =
            this.Direccion !== "otro"
              ? this.Direccion
              : this.getOtherDirection();
          const data = {
            id_usuario: this.user.id,
            telefono: this.user.telefono,
            nombre_usuario: `${this.user.nombre} ${this.user.apellido}`,
            hora_fecha: new Date().toLocaleString(),
            metodo_pago: this.pago,
            productos: this.getProductos(),
            direccion,
            total: this.totalPriece
          };
          console.log("data...", data);

          this.save(data);
        }
      } else {
        this[id] = true;
        this.active = index;
      }
    },
    getProductos() {
      var productos = [];
      this.cart.map(producto => {
        productos.push({
          id: producto.id,
          nombre: producto.nombre,
          caracteristicas: `${producto.peso}${producto.unidad}`,
          cantidad: producto.cantidad,
          precio: producto.precio
        });
      });
      return productos;
    },
    validateLoggin() {
      if (this.$cookies.get("session") && this.$cookies.get("token")) {
        this.logged = true;
      } else {
        this.$router.push("/login");
      }
    },
    async save(body) {
      if (this.Direccion === "otro") {
        var direccion = this.user.direccion;
        direccion.push(body.direccion);
        await putApi(usuarios, body.id_usuario, { direccion });
      }
      await postApi(pedidos, body)
        .then(response => {
          if (response.data) {
            console.log("response.data", response.data);
            const { code, msg } = response.data;
            if (parseInt(code) === 200) {
              successMsg("Mercar Chevere", msg);
              localStorage.setItem("cart", "[]");
              this.setCart([]);
              this.setProducts(null);
              this.$router.push("/");
            } else {
              errorMsg("Mercar Chevere", msg);
            }
          } else {
            errorMsg("Mercar Chevere", "Error de servidor");
          }
        })
        .catch(error => {
          console.log("err", error);
          errorMsg("Mercar Chevere", "Error de servidor" + error.message);
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
    getOtherDirection() {
      return {
        barrio: this.form.barrio,
        direccion:
          this.form.Via +
          " " +
          this.form.numeroVia +
          this.form.letra.toUpperCase() +
          " #" +
          this.form.numero1 +
          this.form.letra1.toUpperCase() +
          "-" +
          this.form.numero2 +
          this.form.letra2.toUpperCase(),
        datos_adicionales: this.form.info
      };
    },
    validateDirection() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        return true;
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
    }
  },
  mounted() {
    console.log("date", new Date().toLocaleString());
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
