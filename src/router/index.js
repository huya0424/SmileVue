import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/components/pages/ShoppingMall'
import Login from '@/components/pages/Login'
import Register from '@/components/pages/Register'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/',name: 'ShoppingMall',component: ShoppingMall },
    { path: '/login',name: 'Login',component: Login },
    { path: '/register',name: 'Register',component: Register }
  ]
})
