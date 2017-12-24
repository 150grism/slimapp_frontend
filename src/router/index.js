import Vue from 'vue'
import Router from 'vue-router'
import vueresource from 'vue-resource'
import UserSavedBreeds from '@/components/UserSavedBreeds'

Vue.use(Router)
Vue.use(vueresource)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'UserSavedBreeds',
      component: UserSavedBreeds
    }
  ]
})
