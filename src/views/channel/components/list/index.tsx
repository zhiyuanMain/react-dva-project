import { Pagination } from 'antd'
import React from 'react'
import { PanelList } from 'src/components'
import { PanelListItem } from 'src/components/panel-list'
import { ChannelContentType } from 'src/constant/channel'
import { mockPanelList } from 'src/views/dashboard/components/_utils'
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
    this.genData()
  }

  genData = () => {
    this.setState({
      total: 98,
      list: [...mockPanelList(`${this.props.type}-page-${this.state.currentPage}`, 15)]
    })
  }

  handlePaginationChange = (page: number) => {
    this.setState(
      {
        currentPage: page
      },
      () => {
        this.genData()
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
        {this.renderContent()}
        {this.renderPagination()}
      </div>
    )
  }
}

export default List
