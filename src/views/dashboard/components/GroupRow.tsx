import { Link } from 'dva/router'
import React from 'react'
import { Block, PanelList } from 'src/components'
import gateway, { LinkItem } from 'src/services/gateway'
import { ResGovInfo } from 'src/services/gateway/govInfo'
import './GroupRow.less'

import { PanelListItem } from 'src/components/panel-list'
import { formatTime } from 'src/utils/helper'

const ImgList = ['ldjs', 'znjs', 'sjgk', 'zsdw', 'ghjh', 'zrkh', 'cwyjs', 'bgxz', 'gkxgf', 'rsxx']
interface GroupRowProps {
  prefixCls?: string
}

interface GroupRowState {
  bannerData: ResGovInfo
  leftList: PanelListItem[]
  rightList: PanelListItem[]
}
class GroupRow extends React.Component<GroupRowProps, GroupRowState> {
  constructor(props: GroupRowProps | Readonly<GroupRowProps>) {
    super(props)
  }

  static defaultProps = {
    prefixCls: 'dashboard-page-grouprow'
  }

  state: GroupRowState = {
    bannerData: {
      level: 2,
      list: []
    },
    leftList: [],
    rightList: []
  }

  componentDidMount() {
    Promise.all([gateway.groupBanner.req(), gateway.channel.req('zxgk')]).then((result) => {
      const listLen =
        result[1].list.length % 2 === 0 ? result[1].list.length : result[1].list.length - 1
      this.setState({
        bannerData: {
          ...result[0]
        },
        leftList: this.genPanelList(result[1].list.slice(0, listLen / 2)),
        rightList: this.genPanelList(result[1].list.slice(listLen / 2, listLen))
      })
    })
  }

  genPanelList = (data: LinkItem[]) => {
    return data.map((item) => ({
      url: item.to,
      id: item.id,
      title: item.title,
      time: formatTime(item.publishTime)
    }))
  }

  renderIntro = () => {
    const { prefixCls } = this.props
    const wrapCls = `${prefixCls}__img`
    return (
      <div className={wrapCls}>
        {ImgList.map((item) => (
          <Link to={`/list/${item}`} key={item}>
            <img src={require(`../../../assets/img/intro-${item}.png`)} />
          </Link>
        ))}
      </div>
    )
  }

  renderInfo = () => {
    const { prefixCls } = this.props
    const { leftList, rightList } = this.state
    const wrapCls = `${prefixCls}__info`
    return (
      <div className={wrapCls}>
        <div className={`${wrapCls}__block`}>
          <PanelList shouldRenderTime={true} list={[...leftList]} />
        </div>
        <div className={`${wrapCls}__block`}>
          <PanelList shouldRenderTime={true} list={[...rightList]} />
        </div>
      </div>
    )
  }
  render() {
    const { prefixCls } = this.props
    return (
      <div className={prefixCls}>
        <Block.Center>
          <Block.Title icon="group" name="信息公开" />
        </Block.Center>
        <Block.Center>{this.renderIntro()}</Block.Center>
        <Block.Center>{this.renderInfo()}</Block.Center>
      </div>
    )
  }
}

export default GroupRow
