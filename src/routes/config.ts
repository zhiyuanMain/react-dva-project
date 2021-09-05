import React from 'react'

interface RouteArrItem {
  title?: string
  path: string
  isDynamic?: boolean
  component: any
}

export interface RouteItem {
  layout: 'basic' | 'blank' | 'require'
  routes: RouteArrItem[]
}
const allRoutes: RouteItem[] = [
  {
    layout: 'basic',
    routes: [
      {
        title: 'Dashboard',
        path: '/dashboard',
        component: React.lazy(
          () => import(/* webpackChunkName: "page-dashboard" */ '../views/dashboard')
        )
      },
      {
        title: 'Channel',
        isDynamic: true,
        path: '/list/:type',
        component: React.lazy(
          () => import(/* webpackChunkName: "page-channel" */ '../views/channel')
        )
      },
      {
        title: 'Article',
        isDynamic: true,
        path: '/article/:id',
        component: React.lazy(
          () => import(/* webpackChunkName: "page-article" */ '../views/article')
        )
      }
    ]
  },
  {
    layout: 'require',
    routes: [
      {
        title: 'openGovernmentAffairs',
        path: '/openGovernmentAffairs',
        component: React.lazy(
          () =>
            import(
              /* webpackChunkName: "page-openGovernmentAffairs" */ '../views/open-government-affairs'
            )
        )
      }
    ]
  }
]

export default allRoutes
