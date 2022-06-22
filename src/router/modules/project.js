
/* 
 * 总览 路由
 */
import Layout from '@/layout'
import { USERS_PRODUCT_NAVIGATION } from '@/constant'

const moduleRoot = USERS_PRODUCT_NAVIGATION.overview.en // 总览

const routeNameProject = 'project'

const routes = [
  {
    path: '/project',
    name: moduleRoot,
    hidden: false,
    alwaysShow: false,
    module: USERS_PRODUCT_NAVIGATION.overview.en,
    component: Layout,
    meta: { title: '项目空间', icon: 'icon-column1', roles: 'admin', sort: 0 },
    redirect: '/project/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/project/index'),
        name: `${routeNameProject}Index`,
        meta: { title: '项目空间', icon: 'icon-column1', roles: 'admin', moduleEn: USERS_PRODUCT_NAVIGATION.overview.en },
      },
    ]
  },
]
export default routes
