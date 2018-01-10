import Vue from 'vue'
import Router from 'vue-router'
import vueresource from 'vue-resource'
import AllBreeds from '@/components/AllBreeds'
// import UserSavedBreeds from '@/components/UserSavedBreeds'

Vue.use(Router)
Vue.use(vueresource)

export default new Router({
  routes: [
    {
      path: '/all',
      name: 'AllBreeds',
      component: AllBreeds
    },
    {
      path: '/:breed',
      name: 'AllBreeds',
      component: AllBreeds
    }
  ]
})
