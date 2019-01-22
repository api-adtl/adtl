import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: () => import('@/components/index')

    },
    {
      path: '/kong',
      name: 'kong',
      component: () => import('@/components/kong')

    },
    {
      path: '/open',
      name: 'open',
      component: () => import('@/components/open'),
      children: [
        {
          path: 'add_api',

          component: () => import('@/components/content/add_api')
        }, {
          path: 'add_group',
          component: () => import('@/components/content/add_group')
        }
      ]
    },
    {
      path: '/create/:index',
      name: 'create',
      component: () => import('@/components/create'),
      props: true
    },
    {
      path: '/add_api/',
      name: 'add_api',
      component: () => import('@/components/content/add_api'),
      props: true
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
