import Vue from 'vue'
import Router from 'vue-router'
import cache from '../logic/cache'
import store from '../store'

Vue.use(Router)
const router = new Router({
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
          name:'add_api',
          component: () => import('@/components/content/add_api'),
          props: (route) => ({
            dir: route.query.dir
          })
        },
        {
          path: 'add_group',
          name:'add_group',
          component: () => import('@/components/content/add_group'),
          props: (route) => ({
            dir: route.query.dir
          })
        },
        {
          path: '/',

          component: () => import('@/components/content/index')
        },

        {
          path: 'api',
          name: 'api',
          component: () => import('@/components/content/api'),
          props: (route) => ({number: route.query.number})
        },
        {
          path: 'edit_api',
          name: 'edit_api',
          component: () => import('@/components/content/api/edit'),
          props: (route) => ({
            dir: route.query.dir,
            e_name: route.query.e_name
          })
        },
        {
          path: 'edit_group',
          name: 'edit_group',
          component: () => import('@/components/content/edit_group'),
          props: (route) => ({
            dir: route.query.dir,
            e_name: route.query.e_name
          })
        },
        {
          path: 'group_info',
          name: 'group_info',
          component: () => import('@/components/content/group_info'),
          props: (route) => ({
            dir: route.query.dir,
            e_name: route.query.e_name
          })
        },
      ]
    },
    {
      path: '/create/:index',
      name: 'create',
      component: () => import('@/components/create'),
      props:true
    },
    {
      path: '/add_api/',
      name: 'add_api',
      component: () => import('@/components/content/add_api'),
    },

    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.afterEach((to) => {
  // ...
  if (to.fullPath != '/' && to.fullPath != '/open' && to.name != 'create') {
    console.log('to', to)
    cache.set([store.state.now_open, 'now'], to.fullPath)
  }

})
export default router
