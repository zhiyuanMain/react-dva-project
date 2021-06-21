import React from 'react'
import './index.less'

interface DashboardProps {
  prefixCls?: string
}
class Dashboard extends React.Component<DashboardProps, {}> {
  constructor(props: DashboardProps | Readonly<DashboardProps>) {
    super(props)
  }

  static defaultProps = {
    prefixCls: 'dashboard-page'
  }

  render() {
    return <div>dashboard</div>
  }
}

export default Dashboard
