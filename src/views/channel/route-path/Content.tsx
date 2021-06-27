import React from 'react'
import { ChannelContentType } from 'src/constant/channel'
import List from '../components/list'
import Ranking from '../components/ranking'
import './Content.less'

interface ContentProps {
  prefixCls?: string
  type: ChannelContentType
}
class Content extends React.Component<ContentProps, {}> {
  constructor(props: ContentProps | Readonly<ContentProps>) {
    super(props)
  }

  static defaultProps = {
    prefixCls: 'channel-page-rp-content'
  }

  componentDidMount() {
    // 获取总排行、月排行、列表
  }

  renderLeft = () => {
    const { prefixCls, type } = this.props
    const wrapCls = `${prefixCls}__left`
    return (
      <div className={wrapCls}>
        <Ranking type={type} />
      </div>
    )
  }

  renderRight = () => {
    const { prefixCls, type } = this.props
    const wrapCls = `${prefixCls}__right`
    return (
      <div className={wrapCls}>
        <List type={type} />
      </div>
    )
  }

  render() {
    return (
      <div className={this.props.prefixCls}>
        {this.renderLeft()}
        {this.renderRight()}
      </div>
    )
  }
}

export default Content
