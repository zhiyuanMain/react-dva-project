import React from 'react'
import BannerRow from './components/BannerRow'
import FooterRow from './components/FooterRow'
import GroupRow from './components/GroupRow'
import HeaderRow from './components/HeaderRow'
import LinkRow from './components/LinkRow'
import LogoRow from './components/LogoRow'
import NavRow from './components/NavRow'
import OnlineRow from './components/OnlineRow'
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
        <HeaderRow />
        <LogoRow />
        <NavRow />
        <BannerRow />
        <GroupRow />
        <OnlineRow />
        <LinkRow />
        <FooterRow />
      </div>
    )
  }
}

export default Dashboard
