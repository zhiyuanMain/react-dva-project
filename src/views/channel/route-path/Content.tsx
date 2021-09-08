import React from 'react'
import { TabItem } from 'src/components/tab-box'
import { ChannelContentType } from 'src/constant/channel'
import gateway, { LinkItem } from 'src/services/gateway'
import { formatTime } from 'src/utils/helper'
import List from '../components/list'
import Ranking from '../components/ranking'
import './Content.less'

interface ContentProps {
  prefixCls?: string
  type: ChannelContentType
}

interface ContentState {
  totalList: TabItem[]
  monthList: TabItem[]
}

class Content extends React.Component<ContentProps, ContentState> {
  constructor(props: ContentProps | Readonly<ContentProps>) {
    super(props)
  }

  static defaultProps = {
    prefixCls: 'channel-page-rp-content'
  }

  state: ContentState = {
    totalList: [],
    monthList: []
  }

  componentDidMount() {
    // 获取总排行、月排行
    gateway.channel.req(this.props.type).then((res) => {
      this.setState({
        totalList: this.generateRankList('总排行', res.zphLists),
        monthList: this.generateRankList('月排行', res.yphLists)
      })
    })
  }

  generateRankList = (tabTitle: string, list: LinkItem[]) => {
    return [
      {
        tabTitle,
        list: list.map((item) => ({
          url: item.to,
          id: item.id,
          title: item.title,
          time: formatTime(item.publishTime)
        }))
      }
    ]
  }

  renderLeft = () => {
    const { prefixCls } = this.props
    const { totalList, monthList } = this.state
    const wrapCls = `${prefixCls}__left`
    return (
      <div className={wrapCls}>
        <Ranking totalList={totalList} monthList={monthList} />
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
