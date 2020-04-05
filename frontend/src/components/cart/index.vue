<template>
  <div class="d-flex justify-content-center">
    <div class="col-8">
      <div v-if="logged"></div>
      <md-steppers :md-active-step.sync="active" md-vertical md-linear>
        <md-step id="first" md-label="Confirmar productos" :md-done.sync="first">
          <p>PRODUCTOS DEL PEDIDO</p>
          <div class="container">
            <div class="row">
              <md-list class="col-12 col-lg-6" v-for="item in cart" :key="item._id">
                <md-list-item style="margin-left:-8%;margin-right:-12%">
                  <BuyContent v-bind:item="item" />
                </md-list-item>
              </md-list>
            </div>
          </div>
          <md-button class="md-primary" @click="setDone('first', 'second')">CONTINUAR</md-button>
        </md-step>

        <md-step id="second" md-label="Second Step" :md-editable="true" :md-done.sync="second">
          <p>SELECCIONE LA DIRECCION</p>
          <div>
            <md-list>
              <md-list-item @click="setDone('first', 'second')">Button</md-list-item>
            </md-list>
          </div>
        </md-step>

        <md-step id="third" md-label="Third Step" :md-editable="false" :md-done.sync="third">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias doloribus eveniet quaerat modi cumque quos sed, temporibus nemo eius amet aliquid, illo minus blanditiis tempore, dolores voluptas dolore placeat nulla.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias doloribus eveniet quaerat modi cumque quos sed, temporibus nemo eius amet aliquid, illo minus blanditiis tempore, dolores voluptas dolore placeat nulla.</p>
          <md-button class="md-raised md-primary" @click="setDone('third')">Done</md-button>
        </md-step>
      </md-steppers>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import BuyContent from "./Buycontent";
import { getCart } from "../../util";
export default {
  name: "CartComponent",
  props: ["user"],
  data() {
    return {
      logged: true,
      items: [],
      radio: false,
      direccion: [this.user.direccion],
      active: "second",
      first: false,
      second: false,
      third: false
    };
  },
  components: {
    BuyContent
  },
  computed: {
    ...mapState(["cart"])
  },
  methods: {
    ...mapActions(["setCart"]),
    getItem() {
      this.items = getCart();
    },
    setDone(id, index) {
      this[id] = true;
      this.active = index;
    }
  },
  mounted() {
    this.getItem();
  }
};
</script>
<style scoped></style>
