import React from 'react'
import classNames from 'classnames'
import { mockPanelList } from 'src/views/dashboard/components/_utils'
import './TabBlock.less'
import PanelList, { PanelListItem } from 'src/components/panel-list'

const BlockItems = [
  {
    img: require('../../assets/img/tabblock-2.png'),
    title: '政府信息',
    subtitle: '公开指南',
    key: 0
  },
  {
    img: require('../../assets/img/tabblock-2.png'),
    title: '政府信息',
    subtitle: '公开制度',
    key: 1
  },
  {
    img: require('../../assets/img/tabblock-3.png'),
    title: '政府信息',
    subtitle: '公开内容',
    key: 2
  },
  {
    img: require('../../assets/img/tabblock-4.png'),
    title: '政府信息',
    subtitle: '公开年报',
    key: 3
  }
]
interface TabBlockProps {
  prefixCls?: string
}

interface TabBlockState {
  activeKey: number
  list: PanelListItem[]
}
class TabBlock extends React.Component<TabBlockProps, TabBlockState> {
  constructor(props: TabBlockProps | Readonly<TabBlockProps>) {
    super(props)
  }

  state: TabBlockState = {
    activeKey: 0,
    list: [...mockPanelList('公开指南', 15)]
  }

  static defaultProps = {
    prefixCls: 'open-government-affairs-page__tabblock'
  }

  handleSwitch = (key: number) => {
    this.setState({
      activeKey: key,
      list: [...mockPanelList(BlockItems[key].subtitle, 15)]
    })
  }

  renderTabs = () => {
    const { prefixCls } = this.props
    const wrapCls = `${prefixCls}__tabs`
    return (
      <div className={wrapCls}>
        {BlockItems.map((item, index) => {
          const wrapItemCls = classNames([
            `${wrapCls}__item`,
            this.state.activeKey === item.key ? `${wrapCls}__item-active` : ''
          ])
          return (
            <section
              className={wrapItemCls}
              key={index}
              onClick={() => this.handleSwitch(item.key)}>
              <img src={item.img} />
              <div>
                <h6>{item.title}</h6>
                <h6>{item.subtitle}</h6>
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
