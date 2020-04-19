<template>
  <md-card style="min-width: 50%; max-width: 100%;">
    <div v-if="!product">
      <md-card-header style="height: 14rem; padding-top: 4rem; margin-top: 1%;">
        <md-card-header-text>
          <font-awesome-icon icon="plus-circle" size="5x" style="color: #448AFF;" />
          <h6 style="padding-top: 1rem">
            <strong>AGREGAR PRODUCTO</strong>
          </h6>
        </md-card-header-text>
      </md-card-header>
    </div>
    <div v-else>
      <md-card-header>
        <md-card-header-text>
          <h6>
            <strong>{{ product.nombre }}</strong>
          </h6>
          <div
            class="md-subhead"
          >{{ product.caracteristicas.peso }} {{ product.caracteristicas.unidad }}</div>
          <br />
          <div>${{ product.caracteristicas.precio }}</div>
        </md-card-header-text>
        <md-card-media md-big>
          <img class="img-fluid resize-img" v-bind:src="product.foto" v-bind:alt="product.nombre" />
        </md-card-media>
      </md-card-header>
      <md-button
        v-if="!esAgregar"
        class="ml-auto p-2 md-icon-button md-accent"
        @click="eliminar(product._id)"
      >
        <md-icon>delete_outline</md-icon>
      </md-button>
    </div>
  </md-card>
</template>

<script>
import { questionMsg } from "../../../util/utilMsg";
export default {
  name: "ProductsCategorieEdit",
  props: ["product", "esAgregar"],
  methods: {
    async eliminar(id) {
      await questionMsg(
        "¿Eliminar elemento?",
        "¿Está seguro que desea eliminar este producto de la categoría?"
      ).then(result => {
        if (result.value) {
          this.$emit("deleteProduct", id);
        }
      });
    }
  }
};
</script>

<style scoped>
.resize-img {
  width: 95%;
  height: 95%;
}
</style>