const express = require('express');
const api = express.Router();
const queryCategoria = require('../db/queriesCategoria');
const queryUsuario = require('../db/queriesUsuario');
const queryProducto = require('../db/queriesProducto');
const queryPromocion = require('../db/queriesPromocion');
const queryPedido = require('../db/queriesPedido');
const queryRol = require('../db/queriesRol');
const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGOLAB_ONYX_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(db => {
    console.log('CONNECTED DATABASE');
  })
  .catch(err => console.log('Error: ', err));

// ---------------------------- Categorías --------------------------------//
/**
 * @swagger
 *  /api/categories:
 *    get:
 *      tags: ['Categorias']
 *      description: Trae todas las categorias
 *      summary: Get All Categories
 *      responses:
 *        '200':
 *          {description: Successful}
 *        '500':
 *          {description: Internal Server Error}
 */
api.get('/categories', queryCategoria.getAllCategories);
/**
 * @swagger
 *  /api/categories/{id}:
 *    get:
 *      tags: ['Categorias']
 *      description: Trae una categorias
 *      summary: Get one Categorie by ID
 *      parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: Id de Categoría
 *      responses:
 *        '200':
 *          {description: Successful}
 *        '500':
 *          {description: Internal Server Error}
 */
api.get('/categories/:id', queryCategoria.getOneCategorie);
/**
 * @swagger
 *  /api/categories/:
 *    post:
 *      tags: ['Categorias']
 *      description: Agrega una Categoría
 *      summary: Add a new Categorie
 *      requestBody:
 *        description: Agrega una Categoría
 *        required: true
 *      parameters:
 *        - name: categoria
 *          description: Categories Object
 *          in:  body
 *          required: true
 *          type: object
 *      responses:
 *        '200':
 *          {description: Successful}
 *        '500':
 *          {description: Internal Server Error}
 */
api.post('/categories', queryCategoria.postCategorie);
/**
 * @swagger
 *  /api/categories/{id}:
 *    put:
 *      tags: ['Categorias']
 *      description: Agrega una Categoría
 *      summary: Edit existent Categorie
 *      requestBody:
 *        description: Agrega una Categoría
 *        required: true
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          required: true
 *          description: Id de Categoría
 *        - name: categoria
 *          description: Categories Object
 *          in:  body
 *          required: true
 *          type: object
 *      responses:
 *        '200':
 *          {description: Successful}
 *        '500':
 *          {description: Internal Server Error}
 */
api.put('/categories/:id', queryCategoria.pullCategorie);
/**
 * @swagger
 *  /api/categories/{id}:
 *    delete:
 *      tags: ['Categorias']
 *      description: Elimina una Categoría
 *      summary: Delete one categorie by ID
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          required: true
 *          description: Id de Categoría
 *      responses:
 *        '200':
 *          {description: Successful}
 *        '500':
 *          {description: Internal Server Error}
 */
api.delete('/categories/:id', queryCategoria.deleteCategorie);

// ---------------------------- Usuarios --------------------------------//
/**
 * @swagger
 *  /api/users:
 *    get:
 *      tags: ['Usuarios']
 *      description: Trae todos los usuarios
 *      summary: Get All Users
 *      responses:
 *        '200':
 *          {description: Successful}
 *        '500':
 *          {description: Internal Server Error}
 */
api.get('/users', queryUsuario.getAllUsers);
api.get('/users/:id', queryUsuario.getOneUser);
api.post('/users', queryUsuario.postUser);
api.put('/users/:id', queryUsuario.pullUser);
api.delete('/users/:id', queryUsuario.deleteUser);

/**
 * Productos
 */
api.get('/products', queryProducto.getAllProducts);
api.get('/products/:id', queryProducto.getOneProduct);
api.post('/products', queryProducto.postProduct);
api.put('/products/:id', queryProducto.pullProduct);
api.delete('/products/:id', queryProducto.deleteProduct);

/**
 * Promociones
 */
api.get('/promos', queryPromocion.getAllPromos);
api.get('/promos/:id', queryPromocion.getOnePromo);
api.post('/promos', queryPromocion.postPromo);
api.put('/promos/:id', queryPromocion.pullPromo);
api.delete('/promos/:id', queryPromocion.deletePromo);

/**
 * Pedidos
 */
api.get('/orders', queryPedido.getAllOrders);
api.get('/orders/:id', queryPedido.getOneOrder);
api.post('/orders', queryPedido.postOrder);
api.put('/orders/:id', queryPedido.pullOrder);
api.delete('/orders/:id', queryPedido.deleteOrder);

/**
 * Roles
 */
api.get('/roles', queryRol.getAllRoles);
api.get('/roles/:id', queryRol.getOneRole);
api.post('/roles', queryRol.postRole);
api.put('/roles/:id', queryRol.pullRole);
api.delete('/roles/:id', queryRol.deleteRole);

module.exports = api;
