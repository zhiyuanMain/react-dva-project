import { Link } from 'dva/router'
import React from 'react'
import { Block } from 'src/components'
import TabBox, { TabItem } from 'src/components/tab-box'
import CHANNEL_CONSTANTS, { CHANNEL_CONSTANTS_CFG } from 'src/constant/channel'
import gateway from 'src/services/gateway'
import './OnlineRow.less'

const imgList = [
  {
    png: 'message',
    key: CHANNEL_CONSTANTS.lyb,
    type: CHANNEL_CONSTANTS_CFG[CHANNEL_CONSTANTS.lyb].type
  },
  {
    png: 'guide',
    key: CHANNEL_CONSTANTS.bszn,
    type: CHANNEL_CONSTANTS_CFG[CHANNEL_CONSTANTS.bszn].type
  },
  {
    png: 'excel',
    key: CHANNEL_CONSTANTS.bgxz,
    type: CHANNEL_CONSTANTS_CFG[CHANNEL_CONSTANTS.bgxz].type
  },
  {
    png: 'investigation',
    key: CHANNEL_CONSTANTS.wsdc,
    type: CHANNEL_CONSTANTS_CFG[CHANNEL_CONSTANTS.wsdc].type
  },
  {
    png: 'video',
    key: CHANNEL_CONSTANTS.spxw,
    type: CHANNEL_CONSTANTS_CFG[CHANNEL_CONSTANTS.spxw].type
  }
]
const CFG_KEYS = [
  CHANNEL_CONSTANTS.ltqy,
  CHANNEL_CONSTANTS.kjjy,
  CHANNEL_CONSTANTS.zcfg,
  CHANNEL_CONSTANTS.zhzf,
  CHANNEL_CONSTANTS.zlaq,
  CHANNEL_CONSTANTS.ycyp,
  CHANNEL_CONSTANTS.gsyy,
  CHANNEL_CONSTANTS.njgl,
  CHANNEL_CONSTANTS.zzny
]

const CFG = CFG_KEYS.map((item) => ({
  key: item,
  name: CHANNEL_CONSTANTS_CFG[item].name
}))
interface OnlineRowProps {
  prefixCls?: string
}

interface OnlineRowState {
  leftPanelList: TabItem[]
  rightPanelList: TabItem[]
}
class OnlineRow extends React.Component<OnlineRowProps, OnlineRowState> {
  constructor(props: OnlineRowProps | Readonly<OnlineRowProps>) {
    super(props)
  }

  static defaultProps = {
    prefixCls: 'dashboard-page-onlinerow'
  }

  state: OnlineRowState = {
    leftPanelList: [],
    rightPanelList: []
  }

  componentDidMount() {
    Promise.all(CFG.map((item) => gateway.channel.req(item.key))).then((result) => {
      const leftRes = result.slice(0, 5)
      const rightRes = result.slice(5, result.length)
      this.setState({
        leftPanelList: leftRes.map((item, index) => ({
          tabTitle: CFG[index].name,
          type: CFG[index].key,
          list: item.list.splice(0, 10).map((iitem) => ({
            url: iitem.to,
            id: iitem.id,
            title: iitem.name
          }))
        })),
        rightPanelList: rightRes.map((item, index) => ({
          tabTitle: CFG[index].name,
          type: CFG[index].key,
          list: item.list.splice(0, 10).map((iitem) => ({
            url: iitem.to,
            id: iitem.id,
            title: iitem.name
          }))
        }))
      })
    })
  }

  renderIntro = () => {
    const { prefixCls } = this.props
    const wrapCls = `${prefixCls}__img`
    return (
      <ul className={wrapCls}>
        {imgList.map((item, index) => (
          <li key={index}>
            <Link to={`/list/${item.key}`}>
              <img src={require(`src/assets/img/online-${item.png}.png`)} />
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  renderInfo = () => {
    const { prefixCls } = this.props
    const { leftPanelList, rightPanelList } = this.state
    const wrapCls = `${prefixCls}__info`
    return (
      <div className={wrapCls}>
        <div className={`${wrapCls}__block`}>
          <TabBox tabs={leftPanelList} />
        </div>
        <div className={`${wrapCls}__block`}>
          <TabBox tabs={rightPanelList} />
        </div>
      </div>
    )
  }
  render() {
    const { prefixCls } = this.props
    return (
      <div className={prefixCls}>
        <Block.Center>
          <Block.Title icon="group" name="网上服务" />
        </Block.Center>
        <Block.Center>{this.renderIntro()}</Block.Center>
        <Block.Center>{this.renderInfo()}</Block.Center>
      </div>
    )
  }
}

export default OnlineRow
