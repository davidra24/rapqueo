import Vue from 'vue';
import VueRouter from 'vue-router';
import CategoriesContainer from '../views/categories/Categories.vue';
import ProductsContainer from '../views/products/Products.vue';
import AllProductsContainer from '../views/products/AllProducts.vue';
import Product from '../views/products/Product.vue';
import NotFound from '../components/notfound';
import Cart from '../views/cart';

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
    path: '/404',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/**',
    redirect: '/404'
  }
];

const router = new VueRouter({
  routes,
  linkActiveClass
});

export default router;
