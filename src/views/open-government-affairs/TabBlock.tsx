import React from 'react'
import classNames from 'classnames'
import './TabBlock.less'
import PanelList, { PanelListItem } from 'src/components/panel-list'
import { GovInfoItem } from 'src/services/gateway/govInfo'
import gateway from 'src/services/gateway'
import { formatTime } from 'src/utils/helper'
import { Empty, Pagination } from 'antd'

const genImg = (index: number, isSelected = false) => {
  const imgName = !isSelected ? `icon_tab_${index}` : `icon_tab_${index}_select`
  return require(`../../assets/img/${imgName}.png`)
}

const TAB_BLOCK_LIST = [
  { key: 'zfxxgkzn', title: '政府信息公开指南', isCollapse: false },
  { key: 'zfxxgkzd', title: '政府信息公开制度', isCollapse: false },
  { key: 'fdzdgknr', title: '法定主动公开内容', isCollapse: true },
  { key: 'zfxxgknb', title: '政府信息公开年报', isCollapse: false }
]
interface TabBlockProps {
  prefixCls?: string
}

interface TabBlockState {
  activeKey: string
  activeKeyIsCollapse: boolean
  list: PanelListItem[]
  collapseList: GovInfoItem[]
  collapseKey: string
  currentPage: number
  total: number
  isLoading: boolean
}
class TabBlock extends React.Component<TabBlockProps, TabBlockState> {
  constructor(props: TabBlockProps | Readonly<TabBlockProps>) {
    super(props)
  }

  state: TabBlockState = {
    activeKey: TAB_BLOCK_LIST[0].key,
    activeKeyIsCollapse: TAB_BLOCK_LIST[0].isCollapse,
    isLoading: true,
    list: [],
    collapseList: [],
    collapseKey: '',
    currentPage: 1,
    total: 0
  }

  static defaultProps = {
    prefixCls: 'open-government-affairs-page__tabblock'
  }

  componentDidMount() {
    this.genData(TAB_BLOCK_LIST[0].key, 1)
  }
  genData = (key: string, pageNumber: number) => {
    this.setState(
      {
        isLoading: true
      },
      () => {
        if (this.state.activeKeyIsCollapse) {
          gateway.govInfo.req(key).then((res) => {
            this.setState({
              collapseList: [...res.list],
              isLoading: false,
              list: res.list[0].list.map((item) => ({
                url: item.to,
                id: item.id,
                title: item.title,
                time: formatTime(item.publishTime)
              })),
              collapseKey: res.list[0].to || ''
            })
          })
        } else {
          gateway.channel.req(key, pageNumber).then((res) => {
            this.setState({
              isLoading: false,
              list: res.list.map((item) => ({
                url: item.to,
                id: item.id,
                title: item.title,
                time: formatTime(item.publishTime)
              })),
              total: res.totalRow
            })
          })
        }
      }
    )
  }

  handleSwitch = (key: string) => {
    const { isLoading, activeKey } = this.state
    if (isLoading || activeKey === key) return
    const activeKeyIsCollapse = TAB_BLOCK_LIST.find((item) => item.key === key)?.isCollapse || false
    this.setState(
      {
        activeKey: key,
        total: 0,
        currentPage: 1,
        activeKeyIsCollapse
      },
      () => {
        this.genData(key, 1)
      }
    )
  }

  handlePaginationChange = (page: number) => {
    this.setState(
      {
        currentPage: page
      },
      () => {
        this.genData(this.state.activeKey, page)
      }
    )
  }

  handleClickCollapseItem = (collapseItemKey: string) => {
    const currentData = this.state.collapseList.find((ii) => ii.to === collapseItemKey)
    this.setState({
      isLoading: false,
      collapseKey: collapseItemKey,
      list:
        currentData?.list.map((item) => ({
          url: item.to,
          id: item.id,
          title: item.title,
          time: formatTime(item.publishTime)
        })) || []
    })
  }

  renderTabs = () => {
    const { prefixCls } = this.props
    const { activeKey, collapseList, collapseKey } = this.state
    const wrapCls = `${prefixCls}__tabs`

    return (
      <div className={wrapCls}>
        {TAB_BLOCK_LIST.map((item, index) => {
          const isActive = activeKey === item.key
          const wrapItemCls = classNames([`${wrapCls}__item`, isActive ? 'active' : ''])
          const h6Cls = classNames([item.isCollapse ? 'icon' : '', isActive ? 'active' : ''])
          return (
            <section className={wrapItemCls} key={index}>
              <div
                className={`${wrapCls}__item__title`}
                onClick={() => this.handleSwitch(item.key)}>
                <img src={genImg(index + 1, this.state.activeKey === item.key)} />
                <div>
                  <h6 className={h6Cls}>{item.title}</h6>
                </div>
              </div>
              {isActive && item.isCollapse ? (
                <ul className={`${wrapCls}__item__collapselist`}>
                  {collapseList.map((iitem) => {
                    return (
                      <li
                        className={iitem.to === collapseKey ? 'active' : ''}
                        key={iitem.to}
                        onClick={() => this.handleClickCollapseItem(iitem.to || '')}>
                        ·{iitem.name}
                      </li>
                    )
                  })}
                </ul>
              ) : null}
            </section>
          )
        })}
      </div>
    )
  }

  renderContent = () => {
    const { prefixCls } = this.props
    const wrapCls = `${prefixCls}__content`
    const { activeKeyIsCollapse } = this.state
    return (
      <div className={wrapCls}>
        {this.renderList()}
        {activeKeyIsCollapse ? null : this.renderPagination()}
      </div>
    )
  }

  renderList = () => {
    const { prefixCls } = this.props
    const wrapCls = `${prefixCls}__list`
    const { activeKeyIsCollapse, collapseKey } = this.state
    const type = activeKeyIsCollapse ? collapseKey.replace('/list/', '') : ''

    return (
      <div className={wrapCls}>
        {this.state.list.length ? (
          <PanelList shouldRenderTime={true} list={this.state.list} type={type} moreText="更多" />
        ) : (
          <Empty />
        )}
      </div>
    )
  }

  renderPagination = () => {
    const { prefixCls } = this.props
    const { currentPage, total } = this.state
    const wrapCls = `${prefixCls}__pagination`
    return (
      <div className={wrapCls}>
        <Pagination
          showSizeChanger={false}
          pageSize={25}
          current={currentPage}
          total={total}
          showTotal={(total) => `共${total}条`}
          onChange={this.handlePaginationChange}
        />
      </div>
    )
  }

  render() {
    const { prefixCls } = this.props

    return (
      <div className={prefixCls}>
        {this.renderTabs()}
        {this.renderContent()}
      </div>
    )
  }
}

export default TabBlock
