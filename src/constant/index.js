
export const SUCCESS_CODE = 200
export const GET_DATA_ERROR = '数据获取失败'

/**
 * 所有产品
 */
export const PRODUCT_ALL = {
  moduleGovern: {
    label: '数据治理',
    value: 'govern',
    icon: 'el-icon-bicycle',
    children: [
      {
        label: '数据建模中心',
        value: 'modelingCenter',
        icon: 'el-icon-chicken',
      },
      {
        label: '指标中心',
        value: 'normCenter',
        icon: 'el-icon-chicken',
      },
      {
        label: '数据资产中心',
        value: 'dataAssertCenter',
        icon: 'el-icon-chicken',
      },
      {
        label: '数据地图',
        value: 'dataMap',
        icon: 'el-icon-chicken',
      },
      {
        label: '数据管理',
        value: 'dataManagement',
        icon: 'el-icon-chicken',
      },
      {
        label: '数据质量中心',
        value: 'dataQuality',
        icon: 'el-icon-chicken',
      },
    ],
  },
  moduleService: {
    label: '数据服务',
    value: 'dataService',
    icon: 'el-icon-bicycle',
    children: [
      {
        label: '标签工厂',
        value: 'labelFactory',
        icon: 'el-icon-chicken',
      },
      {
        label: '数据服务',
        value: 'dataServiceCenter',
        icon: 'el-icon-chicken',
      },
      {
        label: '服务市场',
        value: 'serviceMarket',
        icon: 'el-icon-chicken',
      },
      {
        label: '数据分析中心',
        value: 'dataAnalysisCenter',
        icon: 'el-icon-chicken',
      },
    ],
  },
  moduleIntegration: {
    label: '数据集成',
    value: 'dataIntegration',
    icon: 'el-icon-bicycle',
    children: [
      {
        label: '数据集成中心',
        value: 'dataIntegrationCenter',
        icon: 'el-icon-chicken',
      },
    ],
  },
  moduleDevelop: {
    label: '运维中心',
    value: 'operationCenter',
    icon: 'el-icon-bicycle',
    children: [
      {
        label: '离线开发',
        value: 'offlineDevelopment',
        icon: 'el-icon-chicken',
      },
      {
        label: '实时开发',
        value: 'realtimeDevelopment',
        icon: 'el-icon-chicken',
      },
      {
        label: '数据测试中心',
        value: 'dataTestCenter',
        icon: 'el-icon-chicken',
      },
      {
        label: '需求中心',
        value: 'requirementsCenter',
        icon: 'el-icon-chicken',
      },
    ],
  },
  moduleOperation: {
    label: '任务运维',
    value: 'operationsTask',
    icon: 'el-icon-bicycle',
    children: [
      {
        label: '任务运维中心',
        value: 'operationsTaskCenter',
        icon: 'el-icon-chicken',
      },
    ],
  },
  moduleAssert: {
    label: '数据资产',
    value: 'dataAssert',
    icon: 'el-icon-bicycle',
    children: [
      {
        label: '数据编目',
        value: 'dataCatalogue',
        icon: 'el-icon-chicken',
      },
    ],
  },
}

/**
 * 产品展示页 附属功能
 */
export const PRODUCT_AUXILIARY = {
    moduleProduct: {
    label: '更多产品',
    value: 'moreProduct',
    icon: 'el-icon-bicycle',
    children: [
      {
        label: '算法开发平台',
        value: 'algorithmDevelopPlatform',
        icon: 'el-icon-chicken',
      },
      {
        label: '推荐平台',
        value: 'recommendPlatform',
        icon: 'el-icon-chicken',
      },
    ],
  },
  moduleService: {
    label: '更多服务',
    value: 'servicePlus',
    icon: 'el-icon-bicycle',
    children: [
      {
        label: '文档中心',
        value: 'documentCenter',
        icon: 'el-icon-chicken',
      },
    ],
  },
}

/**
 * 用户可用产品顶部导航
 */
export const USERS_PRODUCT_NAVIGATION = {
  overview: { value: 1, label: '总览', en: 'overview', hidden: false },
  dataDevelop: { value: 2, label: '数据开发', en: 'dataDevelop', hidden: true },
  operationCenter: { value: 3, label: '运维中心', en: 'operationCenter', hidden: true },
}
/**
 * 单页 条数
 */
export const PAGE_SIZES = [10, 20, 30, 40, 50, 80, 100]

/**
 * 项目模式
 */
export const PROJECT_MODE = [
  { value: 1, label: '简单模式' },
  { value: 2, label: '标准隔离模式' },
]
/**
 * 项目类型
 */
export const PROJECT_TYPES = [
  { value: 1, label: '数据治理' },
  { value: 2, label: '数据入湖' },
  { value: 3, label: '主题融合' },
  { value: 4, label: '数据服务' },
  { value: 5, label: '开放共享' },
  { value: 6, label: '数据落地' },
]

