/* eslint-disable semi */
import Vue from 'vue'

import Cookies from 'js-cookie'

import 'tailwindcss/tailwind.css' // 引用成功，暂停使用

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖

import '@/styles/iconfont.css'
import '@/styles/index.scss'

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

import BaseDialog from '@/components/Dialog/BaseDialog'
import Pagination from '@/components/Pagination'

Vue.component('base-dialog', BaseDialog)
Vue.component('my-pagination', Pagination)
Vue.use(Element, {
  size: Cookies.get('size') || 'mini',
  locale: zhLocale,
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

import { cloneDeep, isEqual, isEmpty } from 'lodash/lang'
import { debounce } from 'lodash/function'
import { uniqueId } from 'lodash/util'
import { random } from 'lodash/number'
import { last } from 'lodash/array'

Object.defineProperties(Vue.prototype, {
  lodash_cloneDeep: { value: cloneDeep },
  lodash_isEqual: { value: isEqual },
  lodash_isEmpty: { value: isEmpty },
  lodash_debounce: { value: debounce },
  lodash_uniqueId: { value: uniqueId },
  lodash_random: { value: random },
  lodash_array_last: { value: last },
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
