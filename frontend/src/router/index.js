import Vue from 'vue';
import VueRouter from 'vue-router';
import CategoriesContainer from '../views/categories/Categories.vue';
import ProductsContainer from '../views/products/Products.vue';
import AllProductsContainer from '../views/products/AllProducts.vue';
import Product from '../views/products/Product.vue';
import NotFound from '../components/notfound';
import Cart from '../views/cart';
import PromosContainer from '../views/promos/AllPromos.vue';
import Promo from '../views/promos/Promo.vue';
import Login from '../views/login';

const linkActiveClass = 'my-link-active-class';

Vue.use(VueRouter);
Vue.material.router.linkActiveClass = linkActiveClass;

const routes = [
  {
    path: '/',
    name: 'CategoriesContainer',
    component: CategoriesContainer
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/categorias',
    name: 'CategoriesContainer',
    component: CategoriesContainer
  },
  {
    path: '/categorias/:id',
    name: 'ProductContainer',
    component: ProductsContainer
  },
  {
    path: '/productos/:id',
    name: 'Product',
    component: Product
  },
  {
    path: '/productos',
    name: 'ProductContainer',
    component: AllProductsContainer
  },
  {
    path: '/carrito',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/promociones',
    name: 'Promoscontainer',
    component: PromosContainer
  },
  {
    path: '/promociones/:id',
    name: 'Promo',
    component: Promo
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/**',
    redirect: '/404'
  }
];

const mode = 'history';

const router = new VueRouter({
  routes,
  linkActiveClass,
  mode
});

export default router;
