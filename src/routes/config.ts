import React from 'react'

export interface RouteArrItem {
  title?: string
  path: string
  component: any
}
const allRoutes = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    component: React.lazy(
      () => import(/* webpackChunkName: "page-dashboard" */ '../views/dashboard')
    )
  },
  {
    title: 'User',
    path: '/user',
    component: React.lazy(() => import(/* webpackChunkName: "page-goods" */ '../views/user'))
  },
  {
    title: 'Demo',
    path: '/demo',
    component: React.lazy(() => import(/* webpackChunkName: "page-demo" */ '../views/demo'))
  }
]

export default allRoutes
