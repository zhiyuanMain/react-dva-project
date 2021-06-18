import React, { Suspense } from 'react'
import { Router, Route, Switch, Redirect, RouteComponentProps, RouteProps } from 'dva/router'
import allRoutes, { RouteArrItem } from './config'
const NoMatch: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
  return (
    <div>
      404 Not found: <span style={{ color: '#de1010' }}>{props.location.pathname}</span>. Please
      check current uri.
    </div>
  )
}

const CreateRoutes: React.FC<RouteComponentProps> = ({ history }: RouteComponentProps) => {
  const generateRoute: React.FC<RouteArrItem> = ({
    path,
    component: Component
  }: RouteProps & RouteArrItem) => (
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

  return (
    <Router history={history}>
      <React.Fragment>
        <Switch>
          <Redirect exact from="/" to="/dashboard" />
          {allRoutes.map(({ path, component }: RouteArrItem) => generateRoute({ path, component }))}
          <Route component={NoMatch} />
        </Switch>
      </React.Fragment>
    </Router>
  )
}

export default CreateRoutes
