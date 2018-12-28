import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Blinds from './views/Blinds.vue'
import Remote from './views/Remote.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/blinds',
      name: 'Blinds',
      component: Blinds,
    },
    {
      path: '/remote',
      name: 'Remote',
      component: Remote,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ],
})
