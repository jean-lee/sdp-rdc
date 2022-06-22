import { MessageBox, Loading } from 'element-ui'

/**
 * 删除弹窗
 * @param message
 * @param title
 * @param type
 */
const confirm_default_option = {
  confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning',
  customClass: 'messagebox_comfirm_custom', cancelButtonClass: 'btn_cancel', confirmButtonClass: 'btn_sure'
}
export async function messagebox_confirm(message, title = '提示', options = {}) {
  return await MessageBox.confirm(message, title, Object.assign({}, confirm_default_option, options))
    .then(() => { // 确定
      return true
    })
    .catch(() => { // 取消
      return false
    })
}

/**
 * 含有确定、取消、关闭的弹窗
 * @param message
 * @param title
 * @param type
 */
const confirm_cancel_option = {
  confirmButtonText: '确定', cancelButtonText: '取消', distinguishCancelAndClose: true, type: 'warning',
  customClass: 'messagebox_comfirm_custom', cancelButtonClass: 'btn_cancel', confirmButtonClass: 'btn_sure'
}
export async function messagebox_cancel(message, title = '提示', options = {}) {
  return await MessageBox.confirm(message, title, Object.assign({}, confirm_cancel_option, options))
    .then(() => { // 确定
      return { flag: true }
    })
    .catch(action => { // 取消
      return { flag: false, action: action }
    })
}

/**
 * 消息 需确认 提示框
 * @param message
 * @param title
 * @param type
 */
const confirm_info_option = {
  confirmButtonText: '确定', type: 'info',
  customClass: 'messagebox_comfirm_info', confirmButtonClass: 'btn_sure'
}
export async function messagebox_info(message, title = '提示', options = {}) {
  return await MessageBox.alert(message, title, Object.assign({}, confirm_info_option, options))
}

/**
 * 跨组件 调用加载状态展示
 * 以服务的方式调用的全屏Loading 是单例的
 * 可在任意组件调用该实例
 */
let loadingInstance
export const global_loading_service = (flag, custom_options) => {
  if (flag) {
    const default_options = {
      // target: '', // Loading 需要覆盖的DOM节点,默认为document.body
      fullscreen: false,
      lock: true,
      text: '加载中...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)',
      customClass: 'global_loading_service'
    }

    loadingInstance = Loading.service(Object.assign(default_options, custom_options))
  } else {
    setTimeout(() => {
      loadingInstance ? loadingInstance.close() : '' // 以服务的方式调用的 Loading 需要异步关闭
      loadingInstance = undefined
    }, 300)
  }
}

/** 创建一个 form data */
export function create_form_data(data) {
  const form = new FormData()

  for (const key in data) {
    if (Object.assign.hasOwnProperty.call(data, 'key')) {
      const val = data[key]
      form.append(key, val)
    }
  }

  return form
}

/**
 * 获取DOM元素的显示位置
 * 【menuPaddingTb, menuWdith】：菜单根元素的上下填充， 菜单的宽度
 * 【menuItemHeight, menuItemCount, dividerCount】 菜单项的高度， 数量， 分割线数量
 */
export const get_element_positon = (evt, menuPaddingTb = 5, menuWdith = 100, menuItemHeight = 24, menuItemCount = 4, dividerCount = 4) => {
  const clickX = evt.clientX
  const clickY = evt.clientY
  const screenW = window.innerWidth
  const screenH = window.innerHeight
  // const rootW = menuWdith // 100
  const rootH = menuPaddingTb + menuItemHeight * menuItemCount + 8 * dividerCount // 24 * Object.keys(this.nodeInfo).length-14 + divider(4*4)

  // 确认菜单在上右下左的位置，靠近哪边， 边界处点击显示处理
  const right = screenW - clickX > menuWdith
  const left = !right
  const top = clickY < rootH + 50 || screenH - clickY > rootH
  const bottom = !top
  let pt = 0, pl = 0
  if (right) {
    pl = `${clickX + 5}px`
  }
  if (left) {
    pl = `${clickX - menuWdith - 5}px`
  }
  if (top) {
    pt = `${clickY + 5}px`
  }
  if (bottom) {
    pt = `${clickY - rootH - 5}px`
  }
  return { pt, pl}
}

/**
 * 获取DOM元素的显示位置
 */
export const get_flowchart_node_positon = (evt, menuItemCount = 10, dividerCount = 4) => {
  const clickX = evt.clientX
  const clickY = evt.clientY
  const screenW = window.innerWidth
  const screenH = window.innerHeight
  const rootW = 110
  const rootH = 24 * menuItemCount + 8 * dividerCount // 24 * Object.keys(this.nodeInfo).length-14 + divider(4*4)

  // 确认菜单在上右下左的位置，靠近哪边， 边界处点击显示处理
  const right = screenW - clickX > rootW
  const left = !right
  const top = clickY < rootH + 50 || screenH - clickY > rootH
  const bottom = !top
  let pt = 0, pl = 0
  if (right) {
    pl = `${clickX + 5}px`
  }
  if (left) {
    pl = `${clickX - rootW - 5}px`
  }
  if (top) {
    pt = `${clickY + 5}px`
  }
  if (bottom) {
    pt = `${clickY - rootH - 5}px`
  }
  return { pt, pl}
}