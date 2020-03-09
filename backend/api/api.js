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
api.get("/categories/:id", queryCategoria.getOneCategorie);
api.post("/categories", queryCategoria.postCategorie);
api.put("/categorie/:id", queryCategoria.pullCategorie);
api.delete("/categorie/:id", queryCategoria.deleteCategorie);

/**
 * Usuarios
 */
api.get("/users", queryUsuario.getAllUsers);
api.get("/users/:id", queryUsuario.getOneUser);
api.post("/users", queryUsuario.postUser);
api.put("/users/:id", queryUsuario.pullUser);
api.delete("/users/:id", queryUsuario.deleteUser);

/**
 * Productos
 */
api.get("/products", queryProducto.getAllProducts);
api.get("/products/:id", queryProducto.getOneProduct);
api.post("/products", queryProducto.postProduct);
api.put("/products/:id", queryProducto.pullProduct);
api.delete("/products/:id", queryProducto.deleteProduct);

/**
 * Promociones
 */
api.get("/promos", queryPromocion.getAllPromos);
api.get("/promos/:id", queryPromocion.getOnePromo);
api.post("/promos", queryPromocion.postPromo);
api.put("/promos/:id", queryPromocion.pullPromo);
api.delete("/promos/:id", queryPromocion.deletePromo);

/**
 * Pedidos
 */
api.get("/orders", queryPedido.getAllOrders);
api.get("/orders/:id", queryPedido.getOneOrder);
api.post("/orders", queryPedido.postOrder);
api.put("/orders/:id", queryPedido.pullOrder);
api.delete("/orders/:id", queryPedido.deleteOrder);

/**
 * Roles
 */
api.get("/roles", queryRol.getAllRoles);
api.get("/roles/:id", queryRol.getOneRole);
api.post("/roles", queryRol.postRole);
api.put("/roles/:id", queryRol.pullRole);
api.delete("/roles/:id", queryRol.deleteRole);

module.exports = api;
