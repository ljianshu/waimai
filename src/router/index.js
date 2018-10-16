import Vue from 'vue'
import Router from 'vue-router'
// pages
import home from '@/pages/home/home'
import order from '@/pages/order/order'
import profile from '@/pages/profile/profile'
import search from '@/pages/search/search'
import login from '@/pages/login/login'
// import FooterGuide from '@/components/FooterGuide/FooterGuide'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/home'
  }, {
    path: '/home',
    name: 'home',
    component: home,
    meta: {
      showFooter: true
    }
  },
  {
    path: '/order',
    name: 'order',
    component: order,
    meta: {
      showFooter: true
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: profile,
    meta: {
      showFooter: true
    }
  },
  {
    path: '/search',
    name: 'search',
    component: search,
    meta: {
      showFooter: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: login
  }
  ]
})
