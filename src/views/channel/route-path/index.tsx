import React from 'react'
import { ChannelContentType, ChannelType } from 'src/constant/channel'
import Content from './Content'
import './index.less'

interface RoutePathProps {
  prefixCls?: string
  type?: ChannelType
}
class RoutePath extends React.Component<RoutePathProps, {}> {
  constructor(props: RoutePathProps | Readonly<RoutePathProps>) {
    super(props)
  }

  static defaultProps = {
    prefixCls: 'channel-page-route-path'
  }

  renderContent = () => {
    // 除了`市局概况、职能介绍`外，其他都是左右结构
    const { type } = this.props
    return type === 'cityBureauProfile' || type === 'functionIntroduction' ? (
      <span>{type}</span>
    ) : (
      <Content key={type} type={type as ChannelContentType} />
    )
  }

  render() {
    return this.renderContent()
  }
}

export default RoutePath
