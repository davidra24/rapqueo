import Vue from "vue";
import VueRouter from "vue-router";
import CategoriesContainer from "../views/categories/Categories.vue";
import ProductsContainer from "../views/products/Products.vue";
import AllProductsContainer from "../views/products/AllProducts.vue";
import Product from "../views/products/Product.vue";
import NotFound from "../components/notfound";
import Cart from "../views/cart";
import PromosContainer from "../views/promos/AllPromos.vue";
import Promo from "../views/promos/Promo.vue";
import Login from "../views/login";
import Register from "../views/register";
import PedidosUsuario from "../views/pedidos";
import PedidosAdmin from "../views/admin/Pedidos";
import ProductosAdmin from "../views/admin/Productos";
import CategoriasAdmin from "../views/admin/Categorias";
import PromocionesAdmin from "../views/admin/Promociones";
import Perfil from "../views/perfil";
import Order from "../views/pedidos/Order.vue";

const linkActiveClass = "my-link-active-class";

Vue.use(VueRouter);
Vue.material.router.linkActiveClass = linkActiveClass;

const routes = [
  {
    path: "/",
    name: "ProductContainer",
    component: AllProductsContainer
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/registro",
    name: "Register",
    component: Register
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
    path: "/promociones",
    name: "Promoscontainer",
    component: PromosContainer
  },
  {
    path: "/promociones/:id",
    name: "Promo",
    component: Promo
  },
  {
    path: "/carrito",
    name: "Cart",
    component: Cart
  },
  {
    path: "/pedido/:id",
    name: "Order",
    component: Order
  },
  {
    path: "/pedidos/:id",
    name: "PedidosUsuario",
    component: PedidosUsuario
  },

  {
    path: "/pedidos",
    name: "PedidosAdmin",
    component: PedidosAdmin
  },
  {
    path: "/perfil/:id",
    name: "Perfil",
    component: Perfil
  },
  {
    path: "/admin/categorias",
    name: "CategoriasAdmin",
    component: CategoriasAdmin
  },
  {
    path: "/admin/promociones",
    name: "PromocionesAdmin",
    component: PromocionesAdmin
  },
  {
    path: "/admin/productos",
    name: "ProductosAdmin",
    component: ProductosAdmin
  },
  {
    path: "/404",
    name: "NotFound",
    component: NotFound
  },
  {
    path: "/**",
    redirect: "/404"
  }
];

const mode = "history";

const router = new VueRouter({
  routes,
  linkActiveClass,
  mode
});

export default router;
