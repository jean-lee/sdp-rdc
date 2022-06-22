
import { loginAdmin, logout, getLoginUserInfo } from '@/services/auth'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import BaseStorage from '@/storage'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  userinfo: null,
  projectActive: null,
  topNavigationActive: null,
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_USERINFO: (state, info) => {
    state.userinfo = info
  },
  UPDATE_PROJECT_ACTIVE: (state, info) => {
    state.projectActive = info
  },
  UPDATE_TOP_NAVIGATION_ACTIVE: (state, info) => {
    state.topNavigationActive = info
  },
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      loginAdmin({ username: username.trim(), password: password }).then(response => {
        const { data } = response

        if (!response.status) {
          resolve(response)
          return response
        }
        commit('SET_TOKEN', data.tokenValue)
        setToken(data.tokenName, data.tokenValue)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getLoginUserInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          reject('验证失败，请重试。')
        }

        // const { roles, name, avatar, introduction } = data
        const { name, avatar, introduction } = data
        const roles = ['admin']
        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('用户角色获取错误，角色数据应为数组格式。')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // set_userinfo({ commit }) {
  //   const info = baseCookie.get('IAM_USER') || ''
  //   const parseInfo = JSON.parse(info)

  //   commit('SET_USERINFO', parseInfo)
  // },
  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  },
  /**
   * 获取当前选中的项目
   */
  get_project_active({ commit }, defaultPro) {
    let proAc = state.projectActive
    if (!proAc) {
      proAc = BaseStorage.get_json('project_active')
      if (!proAc) {
        proAc = defaultPro
        BaseStorage.set_json('project_active', proAc)
      }
      commit('UPDATE_PROJECT_ACTIVE', proAc)
    }
    return proAc
  },
  /**
   * 更新当前选中的项目
   */
  update_project_active({ commit }, activeinfo) {
    commit('UPDATE_PROJECT_ACTIVE', activeinfo)
  },
  /**
   * 更新当前选中的项目
   */
  update_top_navagation_active({ commit }, activeinfo) {
    commit('UPDATE_TOP_NAVIGATION_ACTIVE', activeinfo)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
