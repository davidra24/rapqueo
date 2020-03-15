const express = require("express");
const api = express.Router();
const queryCategoria = require("../db/queriesCategoria");
const queryUsuario = require("../db/queriesUsuario");
const queryProducto = require("../db/queriesProducto");
const queryPromocion = require("../db/queriesPromocion");
const queryPedido = require("../db/queriesPedido");
const queryRol = require("../db/queriesRol");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGOLAB_ONYX_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(db => {
    console.log("CONNECTED DATABASE");
  })
  .catch(err => console.log("Error: ", err));

/**
 * Categorías
 */
api.get("/categories", queryCategoria.getAllCategories);
api.get("/categorie/:id", queryCategoria.getOneCategorie);
api.post("/categories", queryCategoria.postCategorie);
api.put("/categorie/:id", queryCategoria.pullCategorie);
api.delete("/categorie/:id", queryCategoria.deleteCategorie);

/**
 * Usuarios
 */
api.get("/users", queryUsuario.getAllUsers);
api.get("/user/:id", queryUsuario.getOneUser);
api.post("/users", queryUsuario.postUser);
api.put("/user/:id", queryUsuario.pullUser);
api.delete("/user/:id", queryUsuario.deleteUser);

/**
 * Productos
 */
api.get("/products", queryProducto.getAllProducts);
api.get("/product/:id", queryProducto.getOneProduct);
api.post("/products", queryProducto.postProduct);
api.put("/product/:id", queryProducto.pullProduct);
api.delete("/product/:id", queryProducto.deleteProduct);

/**
 * Promociones
 */
api.get("/promos", queryPromocion.getAllPromos);
api.get("/promo/:id", queryPromocion.getOnePromo);
api.post("/promos", queryPromocion.postPromo);
api.put("/promo/:id", queryPromocion.pullPromo);
api.delete("/promo/:id", queryPromocion.deletePromo);

/**
 * Pedidos
 */
api.get("/orders", queryPedido.getAllOrders);
api.get("/order/:id", queryPedido.getOneOrder);
api.post("/orders", queryPedido.postOrder);
api.put("/order/:id", queryPedido.pullOrder);
api.delete("/order/:id", queryPedido.deleteOrder);

/**
 * Roles
 */
api.get("/roles", queryRol.getAllRoles);
api.get("/role/:id", queryRol.getOneRole);
api.post("/roles", queryRol.postRole);
api.put("/role/:id", queryRol.pullRole);
api.delete("/role/:id", queryRol.deleteRole);

module.exports = api;
