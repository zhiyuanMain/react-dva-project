import { Descriptions, Pagination } from 'antd'
import React from 'react'
import gateway from 'src/services/gateway'
import { formatTime } from 'src/utils/helper'
import './MsgBoard.less'

interface MsgBoardProps {
  prefixCls?: string
}
type Item = {
  name: string
  sex: string
  createTime: string
  content: string
  replyTime: string
  replyContent: string
}
interface MsgBoardState {
  list: Item[]
  total: number
  currentPage: number
}
class MsgBoard extends React.Component<MsgBoardProps, MsgBoardState> {
  constructor(props: MsgBoardProps | Readonly<MsgBoardProps>) {
    super(props)
  }

  static defaultProps = {
    prefixCls: 'msgboard-page'
  }

  state: MsgBoardState = {
    list: [],
    total: 0,
    currentPage: 1
  }

  componentDidMount() {
    this.getData(1)
  }

  getData = (pageNumber: number) => {
    gateway.msgboardList.req(pageNumber).then((res) => {
      this.setState({
        total: res.totalRow,
        list: res.list.map((item) => ({
          name: item.a1,
          sex: item.a2,
          createTime: formatTime(item.createTime),
          content: item.body,
          replyTime: formatTime(item.replyTime),
          replyContent: item.reply
        }))
      })
    })
  }

  handlePaginationChange = (page: number) => {
    this.setState(
      {
        currentPage: page,
        list: []
      },
      () => {
        this.getData(page)
      }
    )
  }

  renderList = () => {
    const { prefixCls } = this.props
    const { list, total } = this.state
    const wrapCls = `${prefixCls}__list`
    return (
      <div className={wrapCls}>
        {list.map((item, index) => (
          <section key={`${total}_${index}_${new Date().getTime()}`}>
            <Descriptions
              bordered
              column={1}
              labelStyle={{ width: 140 }}
              size="small"
              contentStyle={{ background: '#fafafa' }}>
              <Descriptions.Item label="姓名：">{item.name}</Descriptions.Item>
              <Descriptions.Item label="性别：">{item.sex}</Descriptions.Item>
              <Descriptions.Item label="留言时间：">{item.createTime}</Descriptions.Item>
              <Descriptions.Item label="留言内容：">
                <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
              </Descriptions.Item>
              <Descriptions.Item label="回复时间：">{item.replyTime}</Descriptions.Item>
              <Descriptions.Item label="管理员回复：">
                <div dangerouslySetInnerHTML={{ __html: item.replyContent }}></div>
              </Descriptions.Item>
            </Descriptions>
          </section>
        ))}
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
        {this.renderList()}
        {this.renderPagination()}
      </div>
    )
  }
}

export default MsgBoard
