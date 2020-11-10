import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/addAgreement',
    name: 'AddAgreement',
    component: () => import('../views/Agreement/add')
  },
  {
    path: '/agreementList',
    name: 'AddAgreementList',
    component: () => import('../views/Agreement/list')
  },
  {
    path: '/agreementDetail',
    name: 'AddAgreementDetail',
    component: () => import('../views/Agreement/detail')
  },
]

const router = new VueRouter({
  routes
})

export default router
