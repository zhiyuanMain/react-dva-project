import { Empty, Pagination } from 'antd'
import React from 'react'
import { PanelList } from 'src/components'
import { PanelListItem } from 'src/components/panel-list'
import TabBox, { TabItem } from 'src/components/tab-box'
import { ChannelContentType } from 'src/constant/channel'
import gateway from 'src/services/gateway'
import { ResGovInfo } from 'src/services/gateway/govInfo'
import { formatTime } from 'src/utils/helper'
import './index.less'

interface ListProps {
  prefixCls?: string
  type: ChannelContentType
}

interface ListState {
  currentPage: number
  total: number
  level: 1 | 2
  data4level1: PanelListItem[]
  data4level2: TabItem[]
}
class List extends React.Component<ListProps, ListState> {
  constructor(props: ListProps | Readonly<ListProps>) {
    super(props)
  }

  static defaultProps = {
    prefixCls: 'channel-page-list'
  }

  state: ListState = {
    data4level1: [],
    data4level2: [],
    level: 1,
    currentPage: 1,
    total: 0
  }

  componentDidMount() {
    // 获取数据
    this.genData(1)
  }

  genData = (pageNumber: number) => {
    gateway.channel.req(this.props.type, pageNumber).then((res) => {
      this.setState(
        {
          total: res.totalRow,
          level: res.level
        },
        () => {
          if (res.level === 1) {
            this.setState({
              data4level1: res.list.map((item) => ({
                url: item.to,
                id: item.id,
                title: item.title,
                time: formatTime(item.publishTime)
              }))
            })
          }

          if (res.level === 2) {
            this.setState({
              data4level2: (res as unknown as ResGovInfo).list.map((item) => ({
                tabTitle: item.name,
                list: item.list.map((iitem) => ({
                  url: iitem.to,
                  id: iitem.id,
                  title: iitem.title,
                  time: formatTime(iitem.publishTime)
                })),
                type: item.to?.replace('/list/', '')
              }))
            })
          }
        }
      )
    })
  }

  handlePaginationChange = (page: number) => {
    this.setState(
      {
        currentPage: page
      },
      () => {
        this.genData(page)
      }
    )
  }

  renderContent = () => {
    const { prefixCls } = this.props
    const { level, data4level1, data4level2 } = this.state
    const wrapCls = `${prefixCls}__content`
    return (
      <div className={wrapCls}>
        {level === 1 && <PanelList shouldRenderTime={true} list={data4level1} />}
        {level === 2 && <TabBox tabs={data4level2} />}
      </div>
    )
  }

  renderPagination = () => {
    const { prefixCls } = this.props
    const { level, currentPage, total } = this.state
    const wrapCls = `${prefixCls}__pagination`
    if (level === 2) return null
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
    const { level, data4level1, data4level2 } = this.state
    const shouldRenderEmpty =
      (level === 1 && !data4level1.length) || (level === 2 && !data4level2.length)
    return (
      <div className={prefixCls}>
        {shouldRenderEmpty ? (
          <Empty />
        ) : (
          <React.Fragment>
            {this.renderContent()}
            {this.renderPagination()}
          </React.Fragment>
        )}
      </div>
    )
  }
}

export default List
