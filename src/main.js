// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import routes from './routers'
import $ from 'webpack-zepto'
import VueRouter from 'vue-router'
import filters from './filters'
import Alert from './libs/alert'
import store from './vuex/user'
import FastClick from 'fastclick'
import './assets/scss/CV.scss'
Vue.use(VueRouter)
Vue.use(Alert)
$.ajaxSettings.crossDomain = true

const router = new VueRouter({
  mode: 'history',
  routes
})
// 实例化vue的filter
Object.keys(filters).forEach(k => {
  return Vue.filter(k, filters[k])
})

FastClick.attach(document.body)

// 处理刷新时 vuex被清空 但是用户已经登录的情况
if (window.sessionStorage.user) {
  store.dispatch('setUserInfo', JSON.parse(window.sessionStorage.user))
}

router.beforeEach((to, from, next) => {
  // 处理左边不影响右边
  // $('html, body, #page').removeClass('scroll-hide')
  $('body').css('overflow', 'auto')
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store && store.state && store.state.userInfo && store.state.userInfo.userId) {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})
/* eslint-disable no-new */
new Vue({
  router,
  store
}).$mount('#app')
