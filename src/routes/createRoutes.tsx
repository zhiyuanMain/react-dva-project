import React, { Suspense } from 'react'
import { Router, Route, Switch, Redirect, RouteComponentProps, RouteProps } from 'dva/router'
import allRoutes, { RouteItem } from './config'
import { BasicLayout } from '../layouts'
const NoMatch: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
  return (
    <div>
      404 Not found: <span style={{ color: '#de1010' }}>{props.location.pathname}</span>. Please
      check current uri.
    </div>
  )
}

const CreateRoutes: React.FC<RouteComponentProps> = ({ history }: RouteComponentProps) => {
  const generateRoute: React.FC<RouteItem> = ({ layout, routes }: RouteProps & RouteItem) => {
    const LayoutComponent = layout === 'basic' ? BasicLayout : React.Fragment
    return (
      <LayoutComponent>
        {routes.map((item) => {
          const { path, component: Component } = item
          return (
            <Route
              key={path}
              path={path}
              exact
              component={(props: RouteProps) => (
                <Suspense fallback={<div />}>
                  <Component {...props} />
                </Suspense>
              )}
            />
          )
        })}
      </LayoutComponent>
    )
  }

  return (
    <Router history={history}>
      <React.Fragment>
        <Switch>
          <Redirect exact from="/" to="/dashboard" />
          {allRoutes.map((item) => generateRoute(item))}
          <Route component={NoMatch} />
        </Switch>
      </React.Fragment>
    </Router>
  )
}

export default CreateRoutes
