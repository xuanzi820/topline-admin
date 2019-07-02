import Vue from 'vue'
import Router from 'vue-router'
import nprogress from 'nprogress'
Vue.use(Router)

const router = new Router({
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
      // name: 'layout', // 由于它有默认子路由，所以它的名字没有意义，否则 Vue 会给你发黄牌警告
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
        { // 发布文章
          name: 'publish',
          path: '/publish', // 它是layout组件的子路由
          component: () => import('@/views/publish')
        },
        { // 编辑文章
          name: 'publish-edit',
          path: '/publish/:id', // 它是layout组件的子路由
          component: () => import('@/views/publish')
        },
        { // 评论列表
          name: 'article-comment',
          path: '/comment', // 它是layout组件的子路由
          component: () => import('@/views/comment')
        },
        { // 账户信息
          name: 'account-setting',
          path: '/account', // 它是layout组件的子路由
          component: () => import('@/views/account')
        },
        {
          name: 'article-list',
          path: '/article', // 它是layout组件的子路由
          component: () => import('@/views/article')
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
/**
 * 所有路由导航都要经过这里
 * to 去哪儿
 * from 来自哪里
 * next 允许通过的方法
 */
router.beforeEach((to, from, next) => {
  nprogress.start()
  const userInfo = window.localStorage.getItem('user_info')
  // 如果是非 /login 页面，判断登录状态
  if (to.path !== '/login') {
    // 如果未登录
    if (!userInfo) {
      // 直接跳转至登录页
      next({ name: 'login' })
    } else {
      // 登录了，直接访问该页面
      next()
    }
  } else {
    // 登录了，返回原页面
    if (userInfo) {
      next(false)
    } else {
      // 未登录，继续访问login页面
      next()
    }
  }
})
/**
 * 路由导航完成的时候会进入这里
 */
router.afterEach((to, from) => {
  nprogress.done()
})
export default router
