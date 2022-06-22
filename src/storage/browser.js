/**
 * browser version
 * 浏览器版本检测，版本过低提示更新或更换
 */
import BaseStorage from '@/storage'

const IE_KEY = window.ie_version_localstorage_key
const CHECKED_KEY = 'browser_checked'

const IE11 = 11
const CHECKED = '1'

export default class BrowserStorage extends BaseStorage {
  no_log = true
  has_meta = false

  /** 是否为不支持的 ie 版本 (ie11 以下) */
  static is_no_support_browser() {
    this.no_prefix = true
    const ie_version = Number(this.get_string(IE_KEY))
    if (ie_version === 0) { return false } // === 0 表示未检查浏览器版本
    return ie_version !== -1 && ie_version < IE11
  }

  /** 已经检查过浏览器版本了 */
  static set_checked() {
    this.no_prefix = false
    this.set_string(CHECKED_KEY, CHECKED)
  }
  static checked() {
    this.no_prefix = false
    return this.get_string(CHECKED_KEY) === CHECKED
  }
}

window.__BrowserStorage = BrowserStorage
