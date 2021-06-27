import React from 'react'
import { connect } from 'dva'
import { RouteComponentProps } from 'dva/router'
import RoutePath from './route-path'
import './index.less'
import { ChannelType } from 'src/constant/channel'
import { Block } from 'src/components'

type ChannelProps = RouteComponentProps<{ type?: ChannelType }> & {
  prefixCls?: string
}

class Channel extends React.Component<ChannelProps & RouteComponentProps, {}> {
  constructor(props: ChannelProps | Readonly<ChannelProps>) {
    super(props)
  }

  static defaultProps = {
    prefixCls: 'channel-page'
  }

  render() {
    const { prefixCls, match } = this.props
    return (
      <div className={prefixCls}>
        <Block.Center>
          <RoutePath type={match.params.type} />
        </Block.Center>
      </div>
    )
  }
}

export default connect()(Channel)
