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
import PedidosAdmin from "../views/admin/pedidos";
import ProductosAdmin from "../views/admin/productos/Productos";
import CategoriasAdmin from "../views/admin/categorias/Categorias";
import PromocionesAdmin from "../views/admin/promociones/Promociones";
import EditarCategoria from "../views/admin/categorias/EditarCategoria";
import AgregarCategoria from "../views/admin/categorias/AgregarCategoria";
import AgregarProductos from "../views/admin/productos/AgregarProductos";
import EditarProductos from "../views/admin/productos/EditarProductos";
import EditarPromociones from "../views/admin/promociones/EditarPromociones";
//import AgregarCategoria from "../views/admin/categorias/AgregarCategoria";
import Perfil from "../views/perfil";
import PedidosUsuario from "../views/pedidos/Orders";
import Order from "../views/pedidos/Order";
import Olvide from "../views/olvidar";

const linkActiveClass = "my-link-active-class";

Vue.use(VueRouter);
Vue.material.router.linkActiveClass = linkActiveClass;

const routes = [
  {
    path: "/",
    name: "AllProductContainer",
    component: AllProductsContainer,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/registro",
    name: "Register",
    component: Register,
  },
  {
    path: "/categorias",
    name: "CategoriesContainer",
    component: CategoriesContainer,
  },
  {
    path: "/categorias/:id",
    name: "ProductContainer",
    component: ProductsContainer,
  },
  {
    path: "/productos/:id",
    name: "Product",
    component: Product,
  },
  {
    path: "/promociones",
    name: "Promoscontainer",
    component: PromosContainer,
  },
  {
    path: "/promociones/:id",
    name: "Promo",
    component: Promo,
  },
  {
    path: "/carrito",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/pedido/:id",
    name: "Order",
    component: Order,
  },
  {
    path: "/pedidos/:id",
    name: "PedidosUsuario",
    component: PedidosUsuario,
  },

  {
    path: "/pedidos",
    name: "PedidosAdmin",
    component: PedidosAdmin,
  },
  {
    path: "/perfil/:id",
    name: "Perfil",
    component: Perfil,
  },
  {
    path: "/admin/categorias",
    name: "CategoriasAdmin",
    component: CategoriasAdmin,
  },
  {
    path: "/admin/promociones",
    name: "PromocionesAdmin",
    component: PromocionesAdmin,
  },
  {
    path: "/admin/productos",
    name: "ProductosAdmin",
    component: ProductosAdmin,
  },
  {
    path: "/admin/editar/categorias/:id",
    name: "EditarCategoria",
    component: EditarCategoria,
  },
  {
    path: "/admin/agregar/categoria",
    name: "AgregarCategoria",
    component: AgregarCategoria,
  },
  {
    path: "/admin/editar/productos/:id",
    name: "EditarProductos",
    component: EditarProductos,
  },
  {
    path: "/admin/agregar/producto",
    name: "AgregarProductos",
    component: AgregarProductos,
  },
  {
    path: "/admin/editar/promociones/:id",
    name: "EditarPromociones",
    component: EditarPromociones,
  },
  {
    path: "/olvide",
    name: "Olvide",
    component: Olvide,
  },
  {
    path: "/404",
    name: "NotFound",
    component: NotFound,
  },
  {
    path: "/**",
    redirect: "/404",
  },
];

const mode = "history";

const router = new VueRouter({
  routes,
  linkActiveClass,
  mode,
});

export default router;
