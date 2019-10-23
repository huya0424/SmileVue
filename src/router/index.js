import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/components/pages/ShoppingMall'
import Login from '@/components/pages/Login'
import Register from '@/components/pages/Register'
import Goods from '@/components/pages/Goods'
import CategoryList from '@/components/pages/CategoryList'
import Cart from '@/components/pages/Cart'
import Main from '@/components/pages/Main'

Vue.use(Router)

export default new Router({
  routes: [
    { 
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        { path: '/',name: 'ShoppingMall',component: ShoppingMall },
        { path: '/categorylist',name: 'CategoryList',component: CategoryList },
        { path: '/cart',name: 'Cart',component: Cart }
      ]
    },
    
    { path: '/login',name: 'Login',component: Login },
    { path: '/register',name: 'Register',component: Register },
    { path: '/goods',name: 'Goods',component: Goods },
    
  ]
})
