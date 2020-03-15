import Vue from "vue";
import VueRouter from "vue-router";
import CategoriesContainer from "../views/categories/Categories.vue";
import ProductsContainer from "../views/products/Products.vue";
import AllProductsContainer from "../views/products/AllProducts.vue";
import Product from "../views/products/Product.vue";
import NotFound from "../components/notfound";
import Carr from "../views/car/Car.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "CategoriesContainer",
    component: CategoriesContainer
  },
  {
    path: "/categorias",
    name: "CategoriesContainer",
    component: CategoriesContainer
  },
  {
    path: "/categorias/:id",
    name: "ProductContainer",
    component: ProductsContainer
  },
  {
    path: "/productos/:id",
    name: "Product",
    component: Product
  },
  {
    path: "/productos",
    name: "ProductContainer",
    component: AllProductsContainer
  },
  {
    path: "/carrito",
    name: "Carr",
    component: Carr
  },
  {
    path: "/**",
    name: "NotFound",
    component: NotFound
  }
];

const router = new VueRouter({
  routes
});

export default router;
