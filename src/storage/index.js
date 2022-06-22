// localStorage sessionStorage 基类
import { LOCALSTROAGE_PREFIX, IS_DEV, DISABLED_EXPIRE } from '@/config'

const SEPARATOR = '我是分隔符啦啦啦'
// 不验证是否过期的过期时间设置
const NO_VALIDATE_EXPIRE = 0
// expire 为该数时，表示不设置过期时间，即不缓存 (相当于设置了 disabled，只不过提供该值便于 MAIN_CONFIG 里配置)
const _DISABLED_EXPIRE = DISABLED_EXPIRE

export default class BaseStorage {
  // 禁用缓存
  static disabled = false
  // 禁用 log
  static no_log = false
  // 是否加 localstorage prefix 前缀
  static no_prefix = false
  // 是否是 sessionStorage (默认为 localStorage)
  static is_session = false
  // 过期时间: 单位毫秒 (0 为不过期)
  static expire = NO_VALIDATE_EXPIRE // 一分钟为 1000 * 60，一小时为 1000 * 60 * 60
  // 是否有 meta 信息
  has_meta = true

  static log(key, action, msg = '') {
    if (!IS_DEV() || this.no_log) { return }
    console.log('本地存储-' + action + '-' + key, msg)
  }

  static get_storage() {
    if (!window.sessionStorage || !window.localStorage) {
      throw new Error('该浏览器不支持本地存储')
    }
    return this.is_session ? window.sessionStorage : window.localStorage
  }

  /** 获取 key */
  static get_key(key) {
    if (this.no_prefix) { return key }
    return LOCALSTROAGE_PREFIX + key
  }

  /** 创建 meta 信息 */
  static create_meta() {
    const default_meta = {
      update_time: (new Date()).getTime(),
      expire: this.expire,
    }

    return JSON.stringify(default_meta)
  }

  /** 是否过期 false=未过期 */
  static is_expired(meta) {
  // 没有过期信息
    if (!meta.expire || !meta.update_time || meta.expire === NO_VALIDATE_EXPIRE) { return false }
    // 数据永远是过期的
    if (meta.expire === _DISABLED_EXPIRE) { return true }
    // 验证是否过期
    const now = (new Date()).getTime()
    const time = now - meta.update_time
    return time >= meta.expire
  }

  /** 获取 meta 信息，并且返回真正的 value */
  static parse_meta_and_return_real_value(key) {
    const raw_value = this.get_storage().getItem(this.get_key(key)) || ''
    const value_arr = raw_value.split(SEPARATOR)
    // 没有 meta 信息
    if (value_arr.length === 1) { return raw_value }

    const meta_string = value_arr[0]
    const real_value = value_arr[1]

    if (!real_value) { return null }
    try {
      const meta_obj = JSON.parse(meta_string)
      // meta 信息验证
      // 1. 是否过期
      if (this.is_expired(meta_obj)) {
        this.remove(key)
        return null
      }

      return real_value
    } catch (err) {
      console.warn(err)
      return null
    }
  }

  static set_item(key, val) {
    if (this.disabled) { return }
    if (this.has_meta) {
      const meta = this.create_meta()
      const value = meta + SEPARATOR + String(val)
      this.get_storage().setItem(this.get_key(key), value)
    } else {
      this.get_storage().setItem(this.get_key(key), String(val))
    }

    this.log(key, 'SET')
  }
  // 返回空字符串 (表示没获取到)
  static get_item(key) {
    if (this.disabled) { return null }
    let value = ''
    if (this.has_meta) {
      value = this.parse_meta_and_return_real_value(key)
    } else {
      value = this.get_storage().getItem(this.get_key(key)) || ''
    }

    this.log(key, 'GET')
    return value || ''
  }
  // ------------------------------ public ------------------------------
  /** 设置 string */
  static set_string(key, val) {
    this.set_item(key, val)
  }

  /** 获取 string */
  static get_string(key) {
    return this.get_item(key)
  }

  /** 设置 number */
  static set_number(key, val) {
    this.set_item(key, String(val))
  }

  /** 获取 number */
  static get_number(key) {
    const value = this.get_item(key)
    return value === null ? null : Number(value)
  }

  /** 设置 json */
  static set_json(key, val, middleware) {
    try {
      const data = JSON.stringify(val)
      const deal_data = middleware ? middleware(data) : data

      this.set_item(key, deal_data)
      return true
    } catch (err) {
      console.warn(err)
      return false
    }
  }

  /** 获取 json */
  static get_json(key, middleware) {
    const data = this.get_item(key)
    if (!data) { return null }
    const deal_data = middleware ? middleware(data) : data

    try {
      return deal_data !== '' ? JSON.parse(deal_data) : null
    } catch (err) {
      console.warn(err)
      return null
    }
  }

  /** 删除 */
  static remove(...keys) {
    if (!keys || !keys.length) { return false }

    (keys).forEach((key) => this.get_storage().removeItem(this.get_key(key)))
    return true
  }
}

