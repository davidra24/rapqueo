const express = require("express");
const api = express.Router();
const queryAdicional = require("../db/queriesAdicional");
const queryCategoria = require("../db/queriesCategoria");
const queryUsuario = require("../db/queriesUsuario");
const queryProducto = require("../db/queriesProducto");
const queryPromocion = require("../db/queriesPromocion");
const queryPedido = require("../db/queriesPedido");
const queryRol = require("../db/queriesRol");
const queryFoto = require("../db/queriesFoto");
const queryCodigos = require("../db/queriesCodigosRecuperacion");
const mongoose = require("mongoose");
const { Router } = require("express");

mongoose
  .connect(process.env.MONGOLAB_ONYX_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((db) => {
    console.log("CONNECTED DATABASE");
  })
  .catch((err) => console.log("Error: ", err));
/**
 * @swagger
 *  /api/send/:
 *    post:
 *      tags: ['WhatsApp']
 *      description: Envía un Whatsapp
 *      summary: Send a WhatsApp
 *      requestBody:
 *        description: Envía un WhatsApp
 *        required: true
 *      parameters:
 *        - name: msg
 *          description: msg Object
 *          in:  body
 *          required: true
 *          type: object
 *      responses:
 *        '200':
 *          {description: Successful}
 *        '500':
 *          {description: Internal Server Error}
 */

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
api.get("/categories", queryCategoria.getAllCategories);
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
api.get("/categories/:id", queryCategoria.getOneCategorie);
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
 *        - name: Categoria
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
api.post("/categories", queryCategoria.postCategorie);
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
api.put("/categories/:id", queryCategoria.pullCategorie);
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
api.delete("/categories/:id", queryCategoria.deleteCategorie);

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
api.get("/users", queryUsuario.getAllUsers);
/**
 * @swagger
 *  /api/users/{id}:
 *    get:
 *      tags: ['Usuarios']
 *      description: Trae un Usuario
 *      summary: Get one user by ID
 *      parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: Id de Usuario
 *      responses:
 *        '200':
 *          {description: Successful}
 *        '500':
 *          {description: Internal Server Error}
 */
api.get("/users/:id", queryUsuario.getOneUser);
/**
 * @swagger
 *  /api/users/:
 *    post:
 *      tags: ['Usuarios']
 *      description: Agrega un Usuario
 *      summary: Add a new User
 *      requestBody:
 *        description: Agrega un Usuario
 *        required: true
 *      parameters:
 *        - name: Usuario
 *          description: Users Object
 *          in:  body
 *          required: true
 *          type: object
 *      responses:
 *        '200':
 *          {description: Successful}
 *        '500':
 *          {description: Internal Server Error}
 */
api.post("/users", queryUsuario.postUser);
/**
 * @swagger
 *  /api/users/:
 *    post:
 *      tags: ['Usuarios']
 *      description: Agrega un Usuario
 *      summary: Add a new User
 *      requestBody:
 *        description: Agrega un Usuario
 *        required: true
 *      parameters:
 *        - name: Usuario
 *          description: Users Object
 *          in:  body
 *          required: true
 *          type: object
 *      responses:
 *        '200':
 *          {description: Successful}
 *        '500':
 *          {description: Internal Server Error}
 */
api.post("/userByPhone", queryUsuario.getUserByPhone);
/**
 * @swagger
 *  /api/users/{id}:
 *    put:
 *      tags: ['Usuarios']
 *      description: Agrega un Usuario
 *      summary: Edit existent User
 *      requestBody:
 *        description: Agrega un Usuario
 *        required: true
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          required: true
 *          description: Id de Usuario
 *        - name: usuario
 *          description: Users Object
 *          in:  body
 *          required: true
 *          type: object
 *      responses:
 *        '200':
 *          {description: Successful}
 *        '500':
 *          {description: Internal Server Error}
 */
api.put("/users/:id", queryUsuario.putUser);
/**
 * @swagger
 *  /api/users/{id}:
 *    delete:
 *      tags: ['Usuarios']
 *      description: Elimina un Usuario
 *      summary: Delete one user by ID
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          required: true
 *          description: Id de Usuario
 *      responses:
 *        '200':
 *          {description: Successful}
 *        '500':
 *          {description: Internal Server Error}
 */
api.delete("/users/:id", queryUsuario.deleteUser);
/**
 * @swagger
 *  /api/signup/:
 *    post:
 *      tags: ['Usuarios']
 *      description: Agrega un Usuario
 *      summary: Add a new User
 *      requestBody:
 *        description: Agrega un Usuario
 *        required: true
 *      parameters:
 *        - name: Usuario
 *          description: Users Object
 *          in:  body
 *          required: true
 *          type: object
 *      responses:
 *        '200':
 *          {description: Successful}
 *        '500':
 *          {description: Internal Server Error}
 */
api.post("/signup", queryUsuario.signup);
/**
 * @swagger
 *  /api/signup/:
 *    post:
 *      tags: ['Usuarios']
 *      description: Inicia sesión
 *      summary: Log In
 *      requestBody:
 *        description: Inicia Sesión
 *        required: true
 *      parameters:
 *        - name: Usuario
 *          description: Users Object
 *          in:  body
 *          required: true
 *          type: object
 *      responses:
 *        '200':
 *          {description: Successful}
 *        '500':
 *          {description: Internal Server Error}
 */
api.post("/login", queryUsuario.login);
/**
 * @swagger
 *  /api/code-recovery/:
 *    post:
 *      tags: ['Usuarios']
 *      description: Codigo recuperacion
 *      summary: Log In
 *      requestBody:
 *        description: Codigo recuperacion
 *        required: true
 *      parameters:
 *        - name: Usuario
 *          description: Users Object
 *          in:  body
 *          required: true
 *          type: object
 *      responses:
 *        '200':
 *          {description: Successful}
 *        '500':
 *          {description: Internal Server Error}
 */
api.post("/code-recovery", queryUsuario.codeRecovery);
/**
 * @swagger
 *  /api/recoveryPassword/:
 *    post:
 *      tags: ['Usuarios']
 *      description: Contraqseña recuperacion
 *      summary: Log In
 *      requestBody:
 *        description: Contraqseña recuperacion
 *        required: true
 *      parameters:
 *        - name: Usuario
 *          description: Users Object
 *          in:  body
 *          required: true
 *          type: object
 *      responses:
 *        '200':
 *          {description: Successful}
 *        '500':
 *          {description: Internal Server Error}
 */
api.post("/recoveryPassword", queryUsuario.recoveryPassword);
/**
 * @swagger
 *  /api/forgo/:
 *    post:
 *      tags: ['Usuarios']
 *      description: Olvidé mi contraseña
 *      summary: Forgot password
 *      requestBody:
 *        description: Olvidé mi contraseña
 *        required: true
 *      parameters:
 *        - name: Usuario
 *          description: Users Object
 *          in:  body
 *          required: true
 *          type: object
 *      responses:
 *        '200':
 *          {description: Successful}
 *        '500':
 *          {description: Internal Server Error}
 */
api.post("/forgot", queryUsuario.forgotPassword);
/**
 * @swagger
 *  /api/verifyPassword/:
 *    post:
 *      tags: ['Usuarios']
 *      description: Verifica una contraseña
 *      summary: Log In
 *      requestBody:
 *        description: VErifica contraseña
 *        required: true
 *      parameters:
 *        - name: Usuario
 *          description: Users Object
 *          in:  body
 *          required: true
 *          type: object
 *      responses:
 *        '200':
 *          {description: Successful}
 *        '500':
 *          {description: Internal Server Error}
 */
api.post("/verifyPassword", queryUsuario.verifyPassword);
// ---------------------------- Productos --------------------------------//
/**
 * @swagger
 *  /api/productsNoCategorie:
 *    get:
 *      tags: ['Productos']
 *      description: Trae todos los Productos sin categoria
 *      summary: Get All Products without categorie
 *      responses:
 *        '200':
 *          {description: Successful}
 *        '500':
 *          {description: Internal Server Error}
 */
api.get("/productsNoCategorie", queryProducto.getProductWithoutCategorie);
/**
 * @swagger
 *  /api/products:
 *    get:
 *      tags: ['Productos']
 *      description: Trae todos los Productos
 *      summary: Get All Products
 *      responses:
 *        '200':
 *          {description: Successful}
 *        '500':
 *          {description: Internal Server Error}
 */
api.get("/products", queryProducto.getAllProducts);
/**
 * @swagger
 *  /api/products:
 *    get:
 *      tags: ['Productos']
 *      description: Trae todos los Productos
 *      summary: Get All Products
 *      responses:
 *        '200':
 *          {description: Successful}
 *        '500':
 *          {description: Internal Server Error}
 */
api.get("/products-no-promo", queryProducto.getAllProductsWithoutPromo);
/**
 * @swagger
 *  /api/products/{id}:
 *    get:
 *      tags: ['Productos']
 *      description: Trae un Producto
 *      summary: Get one product by ID
 *      parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: Id de Producto
 *      responses:
 *        '200':
 *          {description: Successful}
 *        '500':
 *          {description: Internal Server Error}
 */
api.get("/products/:id", queryProducto.getOneProduct);
/**
 * @swagger
 *  /api/productsByCategorie/{id}:
 *    get:
 *      tags: ['Productos']
 *      description: Trae un Producto por categoria
 *      summary: Get one product by Categorie ID
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
api.get("/productsByCategorie/:id", queryProducto.getProductsByCategorie);
/**
 * @swagger
 *  /api/products:
 *    post:
 *      tags: ['Productos']
 *      description: Agrega un Producto
 *      summary: Add a new Product
 *      requestBody:
 *        description: Agrega un Producto
 *        required: true
 *      parameters:
 *        - name: producto
 *          description: Products Object
 *          in:  body
 *          required: true
 *          type: object
 *      responses:
 *        '200':
 *          {description: Successful}
 *        '500':
 *          {description: Internal Server Error}
 */
api.post("/products", queryProducto.postProduct);
/**
 * @swagger
 *  /api/products/{id}:
 *    put:
 *      tags: ['Productos']
 *      description: Agrega un Producto
 *      summary: Edit existent Product
 *      requestBody:
 *        description: Agrega un Producto
 *        required: true
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          required: true
 *          description: Id de Producto
 *        - name: Productos
 *          description: Products Object
 *          in:  body
 *          required: true
 *          type: object
 *      responses:
 *        '200':
 *          {description: Successful}
 *        '500':
 *          {description: Internal Server Error}
 */
api.put("/products/:id", queryProducto.pullProduct);
/**
 * @swagger
 *  /api/products/{id}:
 *    delete:
 *      tags: ['Productos']
 *      description: Elimina un Producto
 *      summary: Delete one product by ID
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          required: true
 *          description: Id de Producto
 *      responses:
 *        '200':
 *          {description: Successful}
 *        '500':
 *          {description: Internal Server Error}
 */
api.delete("/products/:id", queryProducto.deleteProduct);

// ---------------------------- Promociones --------------------------------//
/**
 * @swagger
 *  /api/promos:
 *    get:
 *      tags: ['Promociones']
 *      description: Trae todos los Promociones
 *      summary: Get All Promos
 *      responses:
 *        '200':
 *          {description: Successful}
 *        '500':
 *          {description: Internal Server Error}
 */
api.get("/promos", queryPromocion.getAllPromos);
/**
 * @swagger
 *  /api/promos:
 *    get:
 *      tags: ['Promociones']
 *      description: Trae todos los Promociones
 *      summary: Get All Promos
 *      responses:
 *        '200':
 *          {description: Successful}
 *        '500':
 *          {description: Internal Server Error}
 */
api.get("/filteredPromos", queryPromocion.getFilteredPromos);
/**
 * @swagger
 *  /api/promos/{id}:
 *    get:
 *      tags: ['Promociones']
 *      description: Trae una Promocion
 *      summary: Get one promo by ID
 *      parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: Id de Promocion
 *      responses:
 *        '200':
 *          {description: Successful}
 *        '500':
 *          {description: Internal Server Error}
 */
api.get("/promos/:id", queryPromocion.getOnePromo);
/**
 * @swagger
 *  /api/promos/:
 *    post:
 *      tags: ['Promociones']
 *      description: Agrega una Promocion
 *      summary: Add a new Promo
 *      requestBody:
 *        description: Agrega una Promocion
 *        required: true
 *      parameters:
 *        - name: Promocion
 *          description: Promos Object
 *          in:  body
 *          required: true
 *          type: object
 *      responses:
 *        '200':
 *          {description: Successful}
 *        '500':
 *          {description: Internal Server Error}
 */
api.post("/promos", queryPromocion.postPromo);
/**
 * @swagger
 *  /api/promos/{id}:
 *    put:
 *      tags: ['Promociones']
 *      description: Agrega una Promocion
 *      summary: Edit existent Promo
 *      requestBody:
 *        description: Agrega una Promocion
 *        required: true
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          required: true
 *          description: Id de Promocion
 *        - name: promocion
 *          description: Promos Object
 *          in:  body
 *          required: true
 *          type: object
 *      responses:
 *        '200':
 *          {description: Successful}
 *        '500':
 *          {description: Internal Server Error}
 */
api.put("/promos/:id", queryPromocion.pullPromo);
/**
 * @swagger
 *  /api/promos/{id}:
 *    delete:
 *      tags: ['Promociones']
 *      description: Elimina una Promocion
 *      summary: Delete one promo by ID
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          required: true
 *          description: Id de Promocion
 *      responses:
 *        '200':
 *          {description: Successful}
 *        '500':
 *          {description: Internal Server Error}
 */
api.delete("/promos/:id", queryPromocion.deletePromo);

// ---------------------------- Pedidos --------------------------------//
/**
 * @swagger
 *  /api/orders:
 *    get:
 *      tags: ['Pedidos']
 *      description: Trae todos los Pedidos
 *      summary: Get All Orders
 *      responses:
 *        '200':
 *          {description: Successful}
 *        '500':
 *          {description: Internal Server Error}
 */
api.get("/orders", queryPedido.getAllOrders);
/**
 * @swagger
 *  /api/orders/{id}:
 *    get:
 *      tags: ['Pedidos']
 *      description: Trae un Pedido
 *      summary: Get one order by ID
 *      parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: Id de Pedido
 *      responses:
 *        '200':
 *          {description: Successful}
 *        '500':
 *          {description: Internal Server Error}
 */
api.get("/orders/:id", queryPedido.getOneOrder);
/**
 * @swagger
 *  /api/ordersByUser/{id}:
 *    get:
 *      tags: ['Pedidos']
 *      description: Trae un Pedido por usuario
 *      summary: Get one order by User ID
 *      parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: Id de Usuario
 *      responses:
 *        '200':
 *          {description: Successful}
 *        '500':
 *          {description: Internal Server Error}
 */
api.get("/ordersByUser/:id", queryPedido.getOrdersByUser);
/**
 * @swagger
 *  /api/ordersByState/{id}:
 *    get:
 *      tags: ['Pedidos']
 *      description: Trae un Pedido por estado
 *      summary: Get one order by State
 *      parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: Estado del pedido
 *      responses:
 *        '200':
 *          {description: Successful}
 *        '500':
 *          {description: Internal Server Error}
 */
api.get("/ordersByState/:id", queryPedido.getOrdersByState);
/**
 * @swagger
 *  /api/orders/:
 *    post:
 *      tags: ['Pedidos']
 *      description: Agrega un Pedido
 *      summary: Add a new Order
 *      requestBody:
 *        description: Agrega un Pedido
 *        required: true
 *      parameters:
 *        - name: Pedido
 *          description: Orders Object
 *          in:  body
 *          required: true
 *          type: object
 *      responses:
 *        '200':
 *          {description: Successful}
 *        '500':
 *          {description: Internal Server Error}
 */
api.post("/orders", queryPedido.postOrder);
/**
 * @swagger
 *  /api/orders/:
 *    post:
 *      tags: ['Pedidos']
 *      description: Actualzia el estado de un pedido
 *      summary: Add a new Order
 *      requestBody:
 *        description: Actualzia el estado de un pedido
 *        required: true
 *      parameters:
 *        - name: Pedido
 *          description: Orders Object
 *          in:  body
 *          required: true
 *          type: object
 *      responses:
 *        '200':
 *          {description: Successful}
 *        '500':
 *          {description: Internal Server Error}
 */
api.post("/updateStateOrder", queryPedido.updateStateOrder);
/**
 * @swagger
 *  /api/orders/{id}:
 *    put:
 *      tags: ['Pedidos']
 *      description: Agrega un Pedido
 *      summary: Edit existent Order
 *      requestBody:
 *        description: Agrega un Pedido
 *        required: true
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          required: true
 *          description: Id de Pedido
 *        - name: pedido
 *          description: Orders Object
 *          in:  body
 *          required: true
 *          type: object
 *      responses:
 *        '200':
 *          {description: Successful}
 *        '500':
 *          {description: Internal Server Error}
 */
api.put("/orders/:id", queryPedido.pullOrder);
/**
 * @swagger
 *  /api/orders/{id}:
 *    delete:
 *      tags: ['Pedidos']
 *      description: Elimina un Pedido
 *      summary: Delete one order by ID
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          required: true
 *          description: Id de Pedido
 *      responses:
 *        '200':
 *          {description: Successful}
 *        '500':
 *          {description: Internal Server Error}
 */
api.delete("/orders/:id", queryPedido.deleteOrder);

// ---------------------------- Roles --------------------------------//
/**
 * @swagger
 *  /api/roles:
 *    get:
 *      tags: ['Roles']
 *      description: Trae todos los Roles
 *      summary: Get All Roles
 *      responses:
 *        '200':
 *          {description: Successful}
 *        '500':
 *          {description: Internal Server Error}
 */
api.get("/roles", queryRol.getAllRoles);
/**
 * @swagger
 *  /api/roles/{id}:
 *    get:
 *      tags: ['Roles']
 *      description: Trae un Rol
 *      summary: Get one role by ID
 *      parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: Id de Rol
 *      responses:
 *        '200':
 *          {description: Successful}
 *        '500':
 *          {description: Internal Server Error}
 */
api.get("/roles/:id", queryRol.getOneRole);
/**
 * @swagger
 *  /api/roles/:
 *    post:
 *      tags: ['Roles']
 *      description: Agrega un Rol
 *      summary: Add a new Role
 *      requestBody:
 *        description: Agrega un Rol
 *        required: true
 *      parameters:
 *        - name: Rol
 *          description: Roles Object
 *          in:  body
 *          required: true
 *          type: object
 *      responses:
 *        '200':
 *          {description: Successful}
 *        '500':
 *          {description: Internal Server Error}
 */
api.post("/roles", queryRol.postRole);
/**
 * @swagger
 *  /api/products/{id}:
 *    put:
 *      tags: ['Productos']
 *      description: Agrega un Producto
 *      summary: Edit existent Product
 *      requestBody:
 *        description: Agrega un Producto
 *        required: true
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          required: true
 *          description: Id de Producto
 *        - name: producto
 *          description: Products Object
 *          in:  body
 *          required: true
 *          type: object
 *      responses:
 *        '200':
 *          {description: Successful}
 *        '500':
 *          {description: Internal Server Error}
 */
api.put("/roles/:id", queryRol.pullRole);
/**
 * @swagger
 *  /api/roles/{id}:
 *    delete:
 *      tags: ['Roles']
 *      description: Elimina un Rol
 *      summary: Delete one role by ID
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          required: true
 *          description: Id de Rol
 *      responses:
 *        '200':
 *          {description: Successful}
 *        '500':
 *          {description: Internal Server Error}
 */
api.delete("/roles/:id", queryRol.deleteRole);

/**
 * @swagger
 *  /api/aditional/{id}:
 *    get:
 *      tags: ['Adicional']
 *      description: Trae el precio adicional
 *      summary: Get one product by ID
 *      parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: Id de adicional
 *      responses:
 *        '200':
 *          {description: Successful}
 *        '500':
 *          {description: Internal Server Error}
 */

api.get("/aditional/:id", queryAdicional.getAditional);

/**
 * @swagger
 *  /api/aditional:
 *    post:
 *      tags: ['Adicional']
 *      description: Agrega el precio Adicional
 *      summary: Add the Aditional Prices
 *      requestBody:
 *        description: Agrega el precio Adicional
 *        required: true
 *      parameters:
 *        - name: adicional
 *          description: Aditional Object
 *          in:  body
 *          required: true
 *          type: object
 *      responses:
 *        '200':
 *          {description: Successful}
 *        '500':
 *          {description: Internal Server Error}
 */
api.post("/aditional", queryAdicional.postAditional);
/**
 * @swagger
 *  /api/Aditional/{id}:
 *    put:
 *      tags: ['Adicional']
 *      description: Edita un Adicional
 *      summary: Edit existent Aditional
 *      requestBody:
 *        description: Agrega un Adicional
 *        required: true
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          required: true
 *          description: Id de Adicional
 *        - name: Adicional
 *          description: Aditional Object
 *          in:  body
 *          required: true
 *          type: object
 *      responses:
 *        '200':
 *          {description: Successful}
 *        '500':
 *          {description: Internal Server Error}
 */
api.put("/aditional/:id", queryAdicional.putAditional);
// ---------------------------- Fotos --------------------------------//
/**
 * @swagger
 *  /api/photos/{id}:
 *    get:
 *      tags: ['Fotos']
 *      description: Trae una foto
 *      summary: Get one photo by ID
 *      parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: Id de foto
 *      responses:
 *        '200':
 *          {description: Successful}
 *        '500':
 *          {description: Internal Server Error}
 */
api.get("/photos/:id", queryFoto.getPhoto);
/**
 * @swagger
 *  /api/photos:
 *    post:
 *      tags: ['Fotos']
 *      description: Agrega una foto
 *      summary: Add a new photo
 *      requestBody:
 *        description: Agrega una foto
 *        required: true
 *      parameters:
 *        - name: foto
 *          description: Photos Object
 *          in:  body
 *          required: true
 *          type: object
 *      responses:
 *        '200':
 *          {description: Successful}
 *        '500':
 *          {description: Internal Server Error}
 */
api.post("/photos", queryFoto.postPhoto);
/**
 * @swagger
 *  /api/photos/{id}:
 *    put:
 *      tags: ['Fotos']
 *      description: Agrega una Foto
 *      summary: Edit existent Photo
 *      requestBody:
 *        description: Agrega una Foto
 *        required: true
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          required: true
 *          description: Id de Foto
 *        - name: Fotos
 *          description: Photos Object
 *          in:  body
 *          required: true
 *          type: object
 *      responses:
 *        '200':
 *          {description: Successful}
 *        '500':
 *          {description: Internal Server Error}
 */
api.put("/photos/:id", queryFoto.putPhoto);
/**
 * @swagger
 *  /api/photos/{id}:
 *    delete:
 *      tags: ['Fotos']
 *      description: Elimina una Foto
 *      summary: Delete one photo by ID
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          required: true
 *          description: Id de Foto
 *      responses:
 *        '200':
 *          {description: Successful}
 *        '500':
 *          {description: Internal Server Error}
 */
api.delete("/photos/:id", queryFoto.deletePhoto);

// ---------------------------- Codigos de recuperación --------------------------------//
/**
 * @swagger
 *  /api/recuperationCodes:
 *    get:
 *      tags: ['Codigos de recuperación']
 *      description: Trae todos los codigos de recuperación
 *      summary: Get All recuperation codes
 *      responses:
 *        '200':
 *          {description: Successful}
 *        '500':
 *          {description: Internal Server Error}
 */
api.get("/recuperationCodes", queryCodigos.getAllRecuperationCodes);
/**
 * @swagger
 *  /api/recuperationCodes/{id}:
 *    get:
 *      tags: ['Codigos de recuperación']
 *      description: Trae un codigo de recuperacion
 *      summary: Get one Recuperation code by ID
 *      parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: Id de codigo de recuperación
 *      responses:
 *        '200':
 *          {description: Successful}
 *        '500':
 *          {description: Internal Server Error}
 */
api.get("/recuperationCodes/:id", queryCodigos.getOneRecuperationCode);
/**
 * @swagger
 *  /api/recuperationCodes/:
 *    post:
 *      tags: ['Codigos de recuperación']
 *      description: Agrega un codigo de recuperación
 *      summary: Add a new recuperation code
 *      requestBody:
 *        description: Agrega un codigo de recuperación
 *        required: true
 *      parameters:
 *        - name: Codigo de recuperación
 *          description: Recuperation codes Object
 *          in:  body
 *          required: true
 *          type: object
 *      responses:
 *        '200':
 *          {description: Successful}
 *        '500':
 *          {description: Internal Server Error}
 */
api.post("/recuperationCodes", queryCodigos.postRecuperationCode);
/**
 * @swagger
 *  /api/recuperationCodes/{id}:
 *    put:
 *      tags: ['Codigos de recuperación']
 *      description: Agrega un Codigo de recuperacion
 *      summary: Edit existent a recuperation code
 *      requestBody:
 *        description: Agrega un codigo de recuperación
 *        required: true
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          required: true
 *          description: Id de codigo de recuperación
 *        - name: Codigo de recuperación
 *          description: Recuperation codes Object
 *          in:  body
 *          required: true
 *          type: object
 *      responses:
 *        '200':
 *          {description: Successful}
 *        '500':
 *          {description: Internal Server Error}
 */
api.put("/recuperationCodes/:id", queryCodigos.pullRecuperationCode);
/**
 * @swagger
 *  /api/recuperationCodes/{id}:
 *    delete:
 *      tags: ['Codigos de recuperación']
 *      description: Elimina un codigo de recuperación
 *      summary: Delete one recuperation code by ID
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          required: true
 *          description: Id de codigo de recuperación
 *      responses:
 *        '200':
 *          {description: Successful}
 *        '500':
 *          {description: Internal Server Error}
 */
api.delete("/recuperationCodes/:id", queryCodigos.deleteRecuperationCode);

module.exports = api;
