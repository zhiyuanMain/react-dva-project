import React from 'react'
import classNames from 'classnames'
import './TabBlock.less'
import PanelList, { PanelListItem } from 'src/components/panel-list'
import { ResGovInfo } from 'src/services/gateway/govInfo'
import gateway, { LinkItem } from 'src/services/gateway'
import { formatTime } from 'src/utils/helper'

const genImg = (index: number, isSelected = false) => {
  const imgName = !isSelected ? `icon_tab_${index}` : `icon_tab_${index}_select`
  return require(`../../assets/img/${imgName}.png`)
}
interface TabBlockProps {
  prefixCls?: string
}

type BlockItem = {
  index: number
  name: string
}
interface TabBlockState {
  activeKey: number
  blockItem: BlockItem[]
  list: PanelListItem[]
  allResData: ResGovInfo
}
class TabBlock extends React.Component<TabBlockProps, TabBlockState> {
  constructor(props: TabBlockProps | Readonly<TabBlockProps>) {
    super(props)
  }

  state: TabBlockState = {
    activeKey: 0,
    blockItem: [],
    list: [],
    allResData: {
      level: 2,
      list: []
    }
  }

  static defaultProps = {
    prefixCls: 'open-government-affairs-page__tabblock'
  }

  componentDidMount() {
    gateway.govInfo.req().then((res) => {
      this.setState(
        {
          allResData: res
        },
        () => {
          this.setState({
            blockItem: res.list.map((item, index) => ({
              index: index,
              name: item.name
            })),
            list: this.genList([...res.list[0].list])
          })
        }
      )
    })
  }

  genList = (data: LinkItem[]) => {
    return data.map((item) => ({
      url: item.to,
      id: item.id,
      title: item.title,
      time: formatTime(item.publishTime)
    }))
  }

  handleSwitch = (key: number) => {
    const { allResData } = this.state
    this.setState({
      activeKey: key,
      list: this.genList([...allResData.list[key].list])
    })
  }

  renderTabs = () => {
    const { prefixCls } = this.props
    const wrapCls = `${prefixCls}__tabs`
    return (
      <div className={wrapCls}>
        {this.state.blockItem.map((item, index) => {
          const wrapItemCls = classNames([
            `${wrapCls}__item`,
            this.state.activeKey === item.index ? `${wrapCls}__item-active` : ''
          ])
          return (
            <section
              className={wrapItemCls}
              key={index}
              onClick={() => this.handleSwitch(item.index)}>
              <img src={genImg(item.index + 1, this.state.activeKey === item.index)} />
              <div>
                <h6>{item.name}</h6>
              </div>
            </section>
          )
        })}
      </div>
    )
  }

  renderList = () => {
    const { prefixCls } = this.props
    const wrapCls = `${prefixCls}__list`
    return (
      <div className={wrapCls}>
        <PanelList shouldRenderTime={true} list={this.state.list} />
      </div>
    )
  }

  render() {
    const { prefixCls } = this.props

    return (
      <div className={prefixCls}>
        {this.renderTabs()}
        {this.renderList()}
      </div>
    )
  }
}

export default TabBlock
