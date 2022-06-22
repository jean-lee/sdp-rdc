/**
 * 项目空间 相关接口
 */

import request from '@/utils/request'
/**
 * 获取 用户浏览的 项目记录
 */
export const get_brows_history_list = async() => {
  const result = await request({
    url: '/project/historyProjectVisit/list',
    method: 'GET'
  })

  return result
}
/**
 * 获取 项目列表
 */
export const get_project_list = async(params) => {
  const data = {
    pageNumber: params.pageNumber,
    pageSize: params.pageSize,
    searchVal: params.searchVal,
    projectMode: params.projectMode,
    projectType: params.projectType,
  }
  const result = await request({
    url: '/project/project/list',
    data,
  })
  return result
}

/**
 * 新增 项目
 */
export const add_project = async(params) => {
  const data = { ...params }
  const result = await request({
    url: '/project/project/add',
    data
  })

  return result
}
/**
 * 修改 项目
 */
export const update_project = async(params) => {
  const data = {
    description: '这是一段描述',
    projectAdmin: 'lyf',
    projectIdentifier: 'sdp-test-001',
    projectMode: 1,
    projectName: '测试新增接口',
    projectStatus: 0,
    projectType: 0
  }
  const result = await request({
    url: '/project/project/update',
    data
  })

  return result
}
/**
 * 删除 项目
 */
export const del_project = async(projectId) => {
  const result = await request({
    url: '/project/project/deleteProject?projectId=' + projectId,
    method: 'DELETE'
  })

  return result
}

/**
 * 查看 项目 详情
 */
export const get_project_detail = async() => {
  const result = await request({
    url: '/project/project/info'
  })

  return result
}
/**
 * 通过项目id获取用户列表
 */
export const get_users_by_projectid = async() => {
  const result = await request({
    url: '/project/member/queryMemberListByProjectId',
    method: 'GET',
  })

  return result
}
/**
 * 通过项目id获取用户列表
 */
// export const get_project_users = async() => {
//   const result = await request({
//     url: '/studio/member/member-list',
//     method: 'GET',
//   })

//   return result
// }
/**
 * 通过项目id获取用户列表
 */
export const get_project_users = async() => {
  const result = await request({
    url: '/project/member/page-list',
    // method: 'GET',
  })

  return result
}
