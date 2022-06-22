/**
 * 登录用户 模块 相关接口
 */

import request from '@/utils/request'
import md5 from 'js-md5';

/**
 * 假  管理员 登录 
 */
export async function loginAdmin(params) {
  // return {
  //   code: 200,
  //   data: {token: 'f17d1e20-daaa-4cbf-9bb9-090160dbe6d5'}
  // }
  const data = { name: params.username, password: md5(params.password), verifyCode: params.verifyCode }
  const result = await request({ url: '/iam/sdp-iam-server-api/sso/login/admin', data })
  return result
}
/**
 * 假 租户 主账户 登录
 */
export async function loginMaster(params) {
  const data = { name: params.username, password: md5(params.password), verifyCode: params.verifyCode }
  const result = await request({
    url: '/sdp-iam-server-api/sso/login/master',
    data,
  })
  return result
}
/**
 * 租户 子账户 登录
 */
export async function loginSub(params) {
  const result = await request({
    url: '/sdp-iam-server-api/sso/login/sub',
    data: {
      name: params.username, password: md5(params.password), verifyCode: params.verifyCode
    }
  })
  return result
}
/**
 * 假 获取 登录用户 详情
 */
export async function getLoginUserInfo() {
  const info = {
    name: 'fakeUser',
    id: 1,
    roles: ['admin'],
    avatar: '',
    introduction: '介绍233'
  }
  return {
    code: 200,
    data: info
  }
  const result = await request({
    url: '/sdp-iam-server-api/sso/user/info',
    method: 'get'
  })
  return result
}
/**
 * 获取 登录用户 权限策略
 */
export async function getLoginUserTactics() {
  const result = await request({ url: '/sdp-iam-server-api/policy/user', method: 'get' })
  return result
}
/**
 * 当前登录用户 退出登录
 */
export async function logout() {
  return {
    code: 200,
    data: 'success'
  }
  const result = await request({ url: '/sdp-iam-server-api/sso/logout' })
  return result
}
/**
 * 获取 登录用户 权限策略
 */
export async function resetPwd() {
  const result = await request({ url: '/sdp-iam-server-api/user/detail/resetPwd' })
  return result
}
/**
 * 获取 验证码
 */
export async function getVerifyCode() {
  const result = await request({ url: '/sdp-iam-server-api/getVerifyCode' })
  return result
}
/**
 * 忘记 密码
 */
export async function oneForgetPwd(params) {
  const data = {
    name: params.name,
    verifyCode: params.verifyCode,
  }
  const result = await request({ url: '/sdp-iam-server-api/sso/forget_pwd', data })
  return result
}
/**
 * 忘记 密码
 */
export async function get_user_list() {
  return {
    code: 200,
    data: {
      list: [
        { value: 1, label: 'user1' },
        { value: 2, label: 'user2' },
        { value: 3, label: 'user3' },
        { value: 4, label: 'user4' },
        { value: 5, label: 'user5' },
      ]
    }
  }
}
