import { Empty, Pagination } from 'antd'
import React from 'react'
import { PanelList } from 'src/components'
import { PanelListItem } from 'src/components/panel-list'
import { ChannelContentType } from 'src/constant/channel'
import gateway from 'src/services/gateway'
import { formatTime } from 'src/utils/helper'
import './index.less'

interface ListProps {
  prefixCls?: string
  type: ChannelContentType
}

interface ListState {
  currentPage: number
  total: number
  list: PanelListItem[]
}
class List extends React.Component<ListProps, ListState> {
  constructor(props: ListProps | Readonly<ListProps>) {
    super(props)
  }

  static defaultProps = {
    prefixCls: 'channel-page-list'
  }

  state = {
    list: [],
    currentPage: 1,
    total: 0
  }

  componentDidMount() {
    // 获取数据
    this.genData(1)
  }

  genData = (pageNumber: number) => {
    gateway.channel.req(this.props.type, pageNumber).then((res) => {
      this.setState({
        total: res.totalRow,
        list: res.list.map((item) => ({
          url: item.to,
          id: item.id,
          title: item.title,
          time: formatTime(item.publishTime)
        }))
      })
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
    const { list } = this.state
    const wrapCls = `${prefixCls}__content`
    return (
      <div className={wrapCls}>
        <PanelList shouldRenderTime={true} list={list} />
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
          onChange={this.handlePaginationChange}
        />
      </div>
    )
  }

  render() {
    const { prefixCls } = this.props
    return (
      <div className={prefixCls}>
        {!this.state.list.length ? (
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
