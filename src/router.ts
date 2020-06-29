import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/app',
      component: () => import("./views/app/Wrapper.vue"),
      children: [
        {
          path: 'kriteria/list',
          component: () => import("./views/app/kriteria/list.vue"),
        },
        {
          path: 'balita/list',
          component: () => import("./views/app/balita/list.vue"),
        },
        {
          path: 'balita/add',
          component: () => import("./views/app/balita/add.vue"),
        },
        {
          path: 'balita/edit/:id',
          component: () => import("./views/app/balita/edit.vue"),
          props: true
        },
        {
          path: 'rank',
          component: () => import("./views/app/rangking/rresult.vue")
        },
        {
          path: 'laporan',
          component: () => import("./views/app/laporan.vue")
        },
        {
          path: 'settings',
          component: () => import("./views/app/settings.vue")
        }
      ]
    }
  ]
})
