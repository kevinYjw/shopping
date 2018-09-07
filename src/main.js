// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import infiniteScroll from 'vue-infinite-scroll'
import VueLazyLoad from 'vue-lazyload'

Vue.use(infiniteScroll)
Vue.use(VueLazyLoad,{
	loading: 'static/loading-svg/loading-bars.svg',
	try:3
})

Vue.config.productionTip = false

// 基础样式
import "common/css/reset.css"
import "common/css/bootstrap.min.css"
import "common/iconfont/iconfont.css"

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  directives: {infiniteScroll}
})
