import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Commodity from 'components/Commodity/Commodity'
import ShoppingCart from 'components/shoppingCart/shoppingcart'

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
    }
  ]
})
