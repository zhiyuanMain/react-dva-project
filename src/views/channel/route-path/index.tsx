import React from 'react'
import { ChannelContentType, channelRefArticleList, ChannelType } from 'src/constant/channel'
import Content from './Content'
import './index.less'
import gateway from 'src/services/gateway'
import { connect } from 'dva'
import HArticle from 'src/views/article/HArticle'
import { Block } from 'src/components'

type RoutePathProps = {
  prefixCls?: string
  type?: ChannelType
}

interface RoutePathState {
  id: string
}
class RoutePath extends React.Component<RoutePathProps, RoutePathState> {
  constructor(props: RoutePathProps | Readonly<RoutePathProps>) {
    super(props)
  }

  static defaultProps = {
    prefixCls: 'channel-page-route-path'
  }

  state: RoutePathState = {
    id: ''
  }

  componentDidMount() {
    this.getPrivateData()
  }

  componentDidUpdate(prevProps: RoutePathProps) {
    if (prevProps.type !== this.props.type) {
      this.getPrivateData()
    }
  }

  getPrivateData = () => {
    if (this.isArticle()) {
      gateway.privateChannel.req(this.props.type).then((res) => {
        this.setState({ id: res.id })
      })
    }
  }

  isArticle = () => {
    const articleKeys = [...channelRefArticleList]
    if (!this.props.type) return false
    return articleKeys.includes(this.props.type as any)
  }

  renderContent = () => {
    // 除了`市局概况、职能介绍`等外，其他都是左右结构
    const { type } = this.props
    const { id } = this.state
    return this.isArticle() ? (
      id ? (
        <Block.Center>
          <HArticle
            id={id}
            shouldRenderBreadcrumb={false}
            shouldRenderFooter={false}
            shouldRenderInfo={false}
          />
        </Block.Center>
      ) : null
    ) : (
      <Content key={type} type={type as ChannelContentType} />
    )
  }

  render() {
    return this.renderContent()
  }
}

export default connect()(RoutePath)
