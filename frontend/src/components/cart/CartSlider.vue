<template>
  <div>
    <div v-if="add">{{ fetch("5eba3f6f5f6f9c35b497fb6c") }}</div>
    <div v-else>
      <md-drawer class="md-right" :md-active.sync="openedCart">
        <md-toolbar class="md-transparent" md-elevation="0">
          <span class="md-title">
            <strong>Carrito</strong>
          </span>
        </md-toolbar>
        <md-list class="d-flex justify-content-center col-12">
          <md-list-item>
            <h4>
              <strong>CARRITO DE COMPRAS</strong>
            </h4>
          </md-list-item>
          <md-list-item v-show="getCountCart > 0">
            <CartContent />
          </md-list-item>
          <md-list-item style v-show="getCountCart > 0"
            >Subtotal: ${{ totalPriece }}</md-list-item
          >
          <md-list-item style="margin-top:-7%;" v-show="getCountCart > 0"
            >Domicilio: ${{ this.aditional.price }}</md-list-item
          >
          <md-list-item v-show="getCountCart > 0">
            <h6>
              <strong>Precio Total:</strong>
              ${{ totalPriece + this.aditional.price }}
            </h6>
          </md-list-item>
          <md-list-item v-show="getCountCart > 0">
            <md-button
              class="md-raised md-primary btn-block"
              @click="irACarrito()"
              >Comprar</md-button
            >
          </md-list-item>
          <md-list-item v-show="getCountCart === 0">
            <div class="d-flex bd-highlight mb-3">
              <h5 class="bd-highlight texter">
                En este momento no existen
                <br />productos en el carrito.
              </h5>
            </div>
          </md-list-item>
        </md-list>
      </md-drawer>
    </div>
  </div>
</template>

<script>
import CartContent from "./CartContent";
import { mapState, mapActions, mapGetters } from "vuex";
import { aditionals } from "@/util/constants";
import { getApi } from "@/util/api";

export default {
  name: "CartSlider",
  computed: {
    ...mapState(["openedCart", "aditional"]),
    ...mapGetters(["getCountCart", "totalPriece"]),
  },
  data() {
    return {
      add: true,
    };
  },
  components: {
    CartContent,
  },
  methods: {
    ...mapActions(["closeCart", "setAditional", "setError"]),
    irACarrito() {
      if (this.openedCart) {
        this.closeCart();
      }
      this.$router.push("/carrito");
    },
    fetch() {
      getApi(aditionals)
        .then((res) => {
          this.setAditional(res.data[0]);
          this.add = false;
        })
        .catch((err) => {
          this.setError(err);
          this.add = false;
        });
    },
  },
};
</script>

<style scoped>
.texter {
  width: 200px;
  word-wrap: break-word;
}
</style>
