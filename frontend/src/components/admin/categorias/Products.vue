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
      <md-button class="ml-auto p-2 md-icon-button md-accent" @click="eliminar(product._id)">
        <md-icon>delete_outline</md-icon>
      </md-button>
    </div>
  </md-card>
</template>

<script>
import { questionMsg, successMsg } from "../../../util/utilMsg";
//import {} from "../../../util/api";
export default {
  name: "ProductsCategorieEdit",
  props: ["product"],
  methods: {
    async eliminar(id) {
      await questionMsg(
        "¿Eliminar elemento?",
        "¿Está seguro que desea eliminar este producto de la categoría?" + id
      ).then(result => {
        if (result.value) {
          successMsg(
            "Eliminado",
            "Se ha eliminado el producto de la categría con éxito." + id
          );
        }
      });
    },
    fetchDelete(id) {
      console.log(id);
    }
  }
};
</script>

<style scoped>
</style>