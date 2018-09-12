import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Commodity from 'components/Commodity/Commodity'
import ShoppingCart from 'components/shoppingCart/shoppingcart'
import Address from 'components/address/address'
import addAddress from 'components/addAddress/addAddress'
import OrderConfirm from 'components/orderConfirm/orderConfirm'
import OrderSuccess from 'components/orderSuccess/orderSuccess'
import Register from 'components/register/register'

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Commodity',
      component: Commodity
    },
    {
      path: '/cart',
      name: 'ShoppingCart',
      component: ShoppingCart
    },
    {
      path: '/Address',
      name: 'Address',
      component: Address
    },
    {
      path: '/addAddress',
      name: 'addAddress',
      component: addAddress
    },
    {
      path: '/orderConfirm',
      name: 'orderConfirm',
      component: OrderConfirm
    },
    {
      path: '/orderSuccess',
      name: 'OrderSuccess',
      component: OrderSuccess
    },
    {
      path: '/register',
      name: 'Register',
      component:Register
    }
  ]
})
