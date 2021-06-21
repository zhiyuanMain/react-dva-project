import React from 'react'
import BannerRow from './components/BannerRow'
import Header from './components/Header'
import LogoRow from './components/LogoRow'
import NavRow from './components/NavRow'
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
    return (
      <div className={this.props.prefixCls}>
        <Header />
        <LogoRow />
        <NavRow />
        <BannerRow />
      </div>
    )
  }
}

export default Dashboard
