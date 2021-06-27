import React from 'react'

interface RouteArrItem {
  title?: string
  path: string
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
      }
    ]
  }
]

export default allRoutes
