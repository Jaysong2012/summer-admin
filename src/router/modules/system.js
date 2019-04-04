import Layout from '@/layout'

const systemRouter = {
  path: '/system',
  component: Layout,
  redirect: '/system/profile',
  name: 'System Manage',
  meta: {
    title: 'SystemManage',
    icon: 'component'
  },
  children: [
    {
      path: 'profile',
      component: () => import('@/views/system/profile'),
      name: 'Profile',
      meta: { title: 'Profile' }
    },
    {
      path: 'sysuser',
      component: () => import('@/views/system/sysuser/List'),
      name: 'Sysuser',
      meta: { title: 'Sysuser' }
    },
    {
      path: 'role',
      component: () => import('@/views/system/role/List'),
      name: 'Role',
      meta: { title: 'Role' }
    },
    {
      path: 'history',
      component: () => import('@/views/system/history/List'),
      name: 'History',
      meta: { title: 'History' }
    }
  ]
}

export default systemRouter
