import Vue from "vue";
import VueRouter from "vue-router";
import CategoriesContainer from "../views/categories/Categories.vue";
import ProductsContainer from "../views/products/Products.vue";
import NotFound from "../components/notfound";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "CategoriesContainer",
    component: CategoriesContainer
  },
  {
    path: "/categories/:id",
    name: "ProductContainer",
    component: ProductsContainer
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
