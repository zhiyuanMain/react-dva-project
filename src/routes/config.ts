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
      },
      {
        title: 'MsgBoard',
        path: '/msg-board',
        component: React.lazy(
          () => import(/* webpackChunkName: "page-form-msg-board" */ '../views/msg-board')
        )
      },
      {
        title: 'Search',
        path: '/search',
        component: React.lazy(
          () => import(/* webpackChunkName: "page-form-msg-board" */ '../views/search')
        )
      },
      {
        title: 'Application',
        isDynamic: true,
        path: '/application',
        component: React.lazy(
          () => import(/* webpackChunkName: "page-application" */ '../views/application')
        )
      }
    ]
  },
  {
    layout: 'require',
    routes: [
      {
        title: 'openGovernmentAffairs',
        path: '/zwgk',
        component: React.lazy(
          () =>
            import(
              /* webpackChunkName: "page-openGovernmentAffairs" */ '../views/open-government-affairs'
            )
        )
      }
    ]
  },
  {
    layout: 'blank',
    routes: [
      {
        title: 'share',
        path: '/share',
        component: React.lazy(() => import(/* webpackChunkName: "page-share" */ '../views/share'))
      }
    ]
  }
]

export default allRoutes
