<template>
  <div class="col-12">
    <!--  <md-steppers :md-active-step.sync="active" md-alternative>
      <md-step id="first" md-label="CONFIRMAR EL PEDIDO" :md-done.sync="first">
        <div v-for="item in items" :key="item.id">
          <b-card
            bg-variant="light"
            text-variant="dark"
            v-bind:title="item.nombre"
          >
            <b-card-text
              >With supporting text below as a natural lead-in to additional
              content.</b-card-text
            >
            <b-button href="#" variant="primary">Go somewhere</b-button>
          </b-card>
        </div>
        <md-button
          class="md-raised md-primary"
          @click="setDone('first', 'second')"
          >Continuar</md-button
        >
      </md-step>
      <md-step id="second" md-label="AGREGAR DIRECCION" :md-done.sync="second">
        <div>
          <div class="d-flex justify-content-center">
            <md-radio
              v-model="radio"
              value="Casa"
              class="d-flex justify-content-start md-primary col-1"
              >Casa</md-radio
            >
            <md-field class="d-flex justify-content-end col-4">
              <label>Direccion</label>
              <md-input
                class="d-flex justify-content-end"
                v-model="type"
              ></md-input>
              <span class="md-helper-text">Help! :v</span>
            </md-field>
          </div>
          <div class="d-flex justify-content-center">
            <md-radio
              v-model="radio"
              value="Apartamento"
              class="md-primary col-1"
              >Apto</md-radio
            >

            <md-field class="d-flex justify-content-end col-4">
              <label>Barrio</label>
              <md-input v-model="type"></md-input>
              <span class="md-helper-text">Help! :v</span>
            </md-field>
          </div>
          <div class="d-flex justify-content-center">
            <md-radio v-model="radio" value="Otro" class="md-primary col-1"
              >Otro</md-radio
            >

            <md-field class="d-flex justify-content-end col-4">
              <label>Informacion adicional</label>
              <md-input v-model="type"></md-input>
              <span class="md-helper-text">Ej: Apto 603</span>
            </md-field>
          </div>
        </div>
        <md-button
          class="md-raised md-primary"
          @click="setDone('second', 'third')"
          >Continue</md-button
        >
      </md-step>

      <md-step
        id="third"
        md-label="SELECCIONAR MEDIO DE PAGO"
        :md-done.sync="third"
      >
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
          doloribus eveniet quaerat modi cumque quos sed, temporibus nemo eius
          amet aliquid, illo minus blanditiis tempore, dolores voluptas dolore
          placeat nulla.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
          doloribus eveniet quaerat modi cumque quos sed, temporibus nemo eius
          amet aliquid, illo minus blanditiis tempore, dolores voluptas dolore
          placeat nulla.
        </p>
        <md-button
          class="md-raised md-primary"
          @click="setDone('third', 'fourth')"
          >Done</md-button
        >
      </md-step>
      <md-step id="fourth" md-label="FINALIZAR COMPRA" :md-done.sync="fourth">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
          doloribus eveniet quaerat modi cumque quos sed, temporibus nemo eius
          amet aliquid, illo minus blanditiis tempore, dolores voluptas dolore
          placeat nulla.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
          doloribus eveniet quaerat modi cumque quos sed, temporibus nemo eius
          amet aliquid, illo minus blanditiis tempore, dolores voluptas dolore
          placeat nulla.
        </p>
        <md-button class="md-raised md-primary" @click="setDone('fourth')"
          >Done</md-button
        >
      </md-step>
    </md-steppers>-->
    Hola
  </div>
</template>

<script>
import { getCart } from '../../util';
export default {
  name: 'CartComponent',
  data() {
    return {
      items: [],
      radio: false
    };
  },
  computed: {},
  methods: {
    getItem() {
      this.items = getCart();
    }
  },
  mounted() {
    this.getItem();
  }
};
</script>
<style scoped></style>
