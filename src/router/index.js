import Vue from 'vue'
import Router from 'vue-router'
// pages
import home from '@/pages/home/home'
import order from '@/pages/order/order'
import prifile from '@/pages/prifile/prifile'
import search from '@/pages/search/search'
// components
// import FooterGuide from '@/components/FooterGuide/FooterGuide'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/home',
    name: 'home',
    component: home
  },
  {
    path: '/order',
    name: 'order',
    component: order
  },
  {
    path: '/prifile',
    name: 'prifile',
    component: prifile
  },
  {
    path: '/search',
    name: 'search',
    component: search
  }
  ]
})
