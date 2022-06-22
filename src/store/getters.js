const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,
  userinfo: state => state.user.userinfo, // 已登录用户的基础信息

  // 头部导航（有用户可访问的产品模块组成）
  topNavigationActive: state => state.user.topNavigationActive, // 用户登录后选中的项目
  // 项目中心
  projectActive: state => state.user.projectActive, // 用户登录后选中的项目
}
export default getters
