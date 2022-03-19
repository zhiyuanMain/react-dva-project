import React from 'react'
import BannerRow from './components/BannerRow'
import SwiperRow from './components/SwiperRow'
import GroupRow from './components/GroupRow'
import LinkRow from './components/LinkRow'
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
        <BannerRow />
        <SwiperRow />
        <GroupRow />
        <OnlineRow />
        <LinkRow />
      </div>
    )
  }
}

export default Dashboard
