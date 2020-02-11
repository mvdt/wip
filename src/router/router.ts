import Vue from 'vue'
import Router from 'vue-router'
import Products from '@/views/Products.vue'
import ProductDetail from '@/views/ProductDetail.vue'
import ShoppingCart from '@/views/ShoppingCart.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/products/all'
    },
    {
      path: '/products/all',
      name: 'products',
      component: Products
    },
    {
      path: '/products/:id',
      name: 'product-detail',
      // component: () => import(/* webpackChunkName: "about" */ './views/ProductDetail.vue')
      component: ProductDetail,
      props: true
    },
    {
      path: '/order/summary',
      name: 'order-summary',
      component: ShoppingCart
    }
  ]
})
