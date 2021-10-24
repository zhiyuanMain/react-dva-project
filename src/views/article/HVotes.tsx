import { Button, Form, message, Radio, Space, Modal, Progress } from 'antd'
import React from 'react'
import gateway from 'src/services/gateway'
import { Vote } from 'src/services/gateway/article'
import { formatTime } from 'src/utils/helper'
import './HVotes.less'

interface HVotesProps {
  prefixCls?: string
  list: Vote[]
  onAfterSuccess: () => void
}

interface HVotesState {
  priviewVisible: boolean
}
class HVotes extends React.Component<HVotesProps, HVotesState> {
  static Breadcrumb: (props: BreadcrumbProps) => JSX.Element
  constructor(props: HVotesProps | Readonly<HVotesProps>) {
    super(props)
  }

  static defaultProps = {
    prefixCls: 'article-page-harticle-votes'
  }

  state: HVotesState = {
    priviewVisible: false
  }

  onFinish = (values: any) => {
    const requestJson = {}
    for (const key in values) {
      if (Object.prototype.hasOwnProperty.call(values, key)) {
        requestJson[key.replace('fitem_', '')] = values[key]
      }
    }
    gateway.sendVote.req(this.props.list[0].id, { ...requestJson }).then((res) => {
      if (res.success) {
        message.success('投票成功')
        this.props.onAfterSuccess()
      } else {
        message.error(res.message)
      }
    })
  }
  //  查看详情
  handleView = () => {
    this.setState({
      priviewVisible: true
    })
  }

  handleClose = () => {
    this.setState({
      priviewVisible: false
    })
  }

  renderForm = () => {
    const { prefixCls, list } = this.props
    const wrapCls = `${prefixCls}__form`
    return (
      <div className={wrapCls}>
        <Form name="basic" layout="vertical" onFinish={this.onFinish} autoComplete="off">
          {list.map((item, index) => {
            return (
              <Form.Item
                key={item.id}
                name={`fitem_${item.id}`}
                label={`${index + 1}. ${item.title}`}
                rules={[{ required: true, message: '请选择一个选项' }]}>
                <Radio.Group>
                  <Space direction="vertical">
                    {item.items.map((iitem) => (
                      <Radio key={iitem.id} value={iitem.id}>
                        {iitem.name}
                      </Radio>
                    ))}
                  </Space>
                </Radio.Group>
              </Form.Item>
            )
          })}
          <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
            <Button type="primary" style={{ marginRight: 20 }} onClick={this.handleView}>
              详情
            </Button>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }

  renderPreview = () => {
    const { prefixCls, list } = this.props
    const wrapCls = `${prefixCls}__modalcontent`
    return (
      <Modal
        visible={this.state.priviewVisible}
        width={600}
        footer={[
          <Button key="ok" type="primary" onClick={this.handleClose}>
            关闭
          </Button>
        ]}
        title={list[0].title}
        onCancel={this.handleClose}>
        <div className={wrapCls}>
          {list.map((item, index) => (
            <dl key={item.id}>
              <dt>{`${index + 1}. ${item.title}`}</dt>
              {item.items.map((iitem) => (
                <dd key={iitem.id}>
                  <span title={iitem.name}>{iitem.name}</span>
                  <div>
                    <Progress percent={iitem.per} size="small" />
                  </div>
                  <span title={`${iitem.num}票`}>{iitem.num}票</span>
                </dd>
              ))}
            </dl>
          ))}
        </div>
      </Modal>
    )
  }

  render() {
    const { prefixCls } = this.props
    return (
      <div className={prefixCls}>
        {this.renderForm()}
        {this.renderPreview()}
      </div>
    )
  }
}

interface BreadcrumbProps {
  status: string
  beginTime: number
  endTime: number
}
const Breadcrumb = (props: BreadcrumbProps) => (
  <React.Fragment>
    <span>状态：{props.status}</span>
    <span>
      投票日期：{formatTime(props.beginTime)} ~ {formatTime(props.endTime)}
    </span>
  </React.Fragment>
)

HVotes.Breadcrumb = Breadcrumb

export default HVotes
