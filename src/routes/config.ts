import React from 'react'

interface RouteArrItem {
  title?: string
  path: string
  isDynamic?: boolean
  component: any
}

export interface RouteItem {
  layout: 'basic' | 'blank'
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
        path: '/channel/:type',
        component: React.lazy(
          () => import(/* webpackChunkName: "page-channel" */ '../views/channel')
        )
      }
    ]
  }
]

export default allRoutes
