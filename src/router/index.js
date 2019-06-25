import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    // {
    // 路由的名字，和组件名没有关系，说白了就是path的别名
    // 好处就是，假如你的path是/x/x/x/x，我们跳转的时候就可以直接
    // $router.push('/x/x/x/)
    // $router.push({name: 'xxx'}),不仅仅如此，你就记住，给路由起个名字是一个好的做法
    // name: 'home',
    // path: '/',
    // @表示src目录，无论你当前文件在哪里，@都是src
    // component: () => import('@/views/home')
    // },
    {
      name: 'layout',
      path: '/',
      component: () => import('@/views/layout'),
      // 嵌套路由：http://router.vuejs.org/zh/guide/essentials/nested-routes.html
      // 所有children路由都显示到父路由的router-view中
      children: [
        {
          name: 'home',
          path: '', // 它是layout组件的默认子路由
          component: () => import('@/views/home')
        },
        {
          name: 'publish',
          path: '/publish', // 它是layout组件的子路由
          component: () => import('@/views/publish')
        }
      ]
    },
    {
      name: 'login',
      path: '/login', // 它是layout组件的子路由
      component: () => import('@/views/login')
    }
  ]
})
