import React from 'react'
import { ChannelType } from 'src/constant/channel'
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

  render() {
    return <div>{this.props.type}</div>
  }
}

export default RoutePath
