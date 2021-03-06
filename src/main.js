// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import VueLayers from 'vuelayers'
import 'vuelayers/lib/style.css' // needs css-loader
import ImageUploader from 'vue-image-upload-resize'
// import map from './components/map'
import VueCookies from 'vue-cookies'
import axios from 'axios'

Vue.prototype.$http = axios
var accessToken = localStorage.getItem('token')
if (accessToken) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = accessToken
}
Vue.use(VueCookies)

// set default config
VueCookies.config('7d')

// set global cookie
VueCookies.set('theme', 'default')
Vue.config.productionTip = false
Vue.use(VueLayers)
Vue.use(VueSidebarMenu)
Vue.use(BootstrapVue)
Vue.use(ImageUploader)
Vue.config.productionTip = false
// Vue.component(map, {})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
