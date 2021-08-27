import React, { Suspense } from 'react'
import { Router, Route, Switch, Redirect, RouteComponentProps, RouteProps } from 'dva/router'
import allRoutes, { RouteItem } from './config'
import { BasicLayout, RequireLayout } from '../layouts'
const NoMatch: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
  return (
    <div>
      404 Not found: <span style={{ color: '#de1010' }}>{props.location.pathname}</span>. Please
      check current uri.
    </div>
  )
}

const CreateRoutes: React.FC<RouteComponentProps> = ({ history }: RouteComponentProps) => {
  const generateRoute = ({ layout, routes }: RouteProps & RouteItem, index: number) => {
    const LayoutComponent =
      layout === 'basic' ? BasicLayout : layout === 'require' ? RequireLayout : React.Fragment
    return routes.map((item) => {
      const { path, component: Component, isDynamic } = item
      return (
        <Route
          key={path}
          path={path}
          exact={!isDynamic}
          component={(props: RouteProps) => (
            <Suspense fallback={<div />}>
              <LayoutComponent key={index}>
                <Component {...props} />
              </LayoutComponent>
            </Suspense>
          )}
        />
      )
    })
  }

  return (
    <Router history={history}>
      <React.Fragment>
        <Switch>
          <Redirect exact from="/" to="/dashboard" />
          {allRoutes.map((item, index) => generateRoute(item, index))}
          <Route component={NoMatch} />
        </Switch>
      </React.Fragment>
    </Router>
  )
}

export default CreateRoutes
