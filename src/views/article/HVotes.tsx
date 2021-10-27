import { Button, Form, message, Radio, Space, Modal, Progress, Checkbox, Input } from 'antd'
import React from 'react'
import { Vote } from 'src/services/gateway/article'
import { formatTime } from 'src/utils/helper'
import './HVotes.less'

const VOTE_STATUS = {
  ended: {
    name: '已结束',
    color: '#e64948'
  },
  onging: {
    name: '进行中',
    color: '#20538f'
  },
  nostart: {
    name: '未开始',
    color: '#79818B'
  }
}

interface HVotesProps {
  prefixCls?: string
  id: string
  title: string
  list: Vote[]
  status: string
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
    let requestParams = ''
    for (const key in values) {
      if (Object.prototype.hasOwnProperty.call(values, key)) {
        const answerId = key.split('_')[1]
        if (values[key] instanceof Array) {
          values[key].forEach((checkboxAnswer: string) => {
            // requestParams.append(answerId, checkboxAnswer)
            requestParams += `&${answerId}=${checkboxAnswer}`
          })
        } else {
          requestParams += `&${answerId}=${values[key]}`
        }
      }
    }

    // var xhr = new XMLHttpRequest();
    // xhr.open("post",`${process.env.API_ASSETS}/vote/${this.props.id}`);
    // xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    // xhr.send(requestParams.replace('&', ''));
    // console.log(requestParams.replace('&', ''))

    ;(window as any).jQuery.ajax({
      url: `${process.env.API_ASSETS}/vote/${this.props.id}`,
      data: requestParams.replace('&', ''), // 从表单中获取数据
      type: 'POST', // 设置请求类型为"POST"，默认为"GET"
      dataType: 'json',
      success: (data: any) => {
        if (data.code === 200) {
          message.success('投票成功')
          this.props.onAfterSuccess()
        } else {
          message.success('投票失败，请重试')
        }
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
    const { prefixCls, list, status } = this.props
    const wrapCls = `${prefixCls}__form`
    return (
      <div className={wrapCls}>
        <Form id="basic" name="basic" layout="vertical" onFinish={this.onFinish} autoComplete="off">
          {list.map((item, index) => {
            return this.renderFormRow(item, index)
          })}
          <Form.Item>
            <div style={{ textAlign: 'center' }}>
              <Button type="primary" onClick={this.handleView}>
                详情
              </Button>
              {status === 'onging' ? (
                <Button type="primary" style={{ marginLeft: 20 }} htmlType="submit">
                  提交
                </Button>
              ) : null}
            </div>
          </Form.Item>
        </Form>
      </div>
    )
  }

  renderFormRow = (item: Vote, index: number) => {
    let resultNode = null
    if (item.type === 1) {
      resultNode = (
        <Form.Item
          key={item.id}
          name={`radio_${item.id}`}
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
    }

    if (item.type === 2) {
      resultNode = (
        <Form.Item
          key={item.id}
          name={`checkbox_${item.id}`}
          label={`${index + 1}. ${item.title}`}
          rules={[{ required: true, message: '请选择一个选项' }]}>
          <Checkbox.Group style={{ width: '100%' }}>
            <Space direction="vertical">
              {item.items.map((iitem) => (
                <Checkbox key={iitem.id} value={iitem.id}>
                  {iitem.name}
                </Checkbox>
              ))}
            </Space>
          </Checkbox.Group>
        </Form.Item>
      )
    }

    if (item.type === 3) {
      resultNode = (
        <div>
          {item.items.map((iitem) => (
            <Form.Item
              key={item.id}
              name={`input_${item.id}`}
              label={`${index + 1}. ${item.title}`}
              rules={[{ required: true, message: '请输入内容' }]}>
              <Input.TextArea key={iitem.id} rows={4} />
            </Form.Item>
          ))}
        </div>
      )
    }
    return resultNode
  }

  renderPreview = () => {
    const { prefixCls, list, title } = this.props
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
        title={`投票结果：${title}`}
        onCancel={this.handleClose}>
        <div className={wrapCls}>
          {list.map((item, index) => (
            <dl key={item.id}>
              <dt>{`${index + 1}. ${item.title}`}</dt>
              {item.type === 3
                ? '暂无数据'
                : item.items.map((iitem) => (
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
    <span style={{ color: VOTE_STATUS[props.status].color }}>
      状态：{VOTE_STATUS[props.status].name || ''}
    </span>
    <span>
      投票日期：{formatTime(props.beginTime)} ~ {formatTime(props.endTime)}
    </span>
  </React.Fragment>
)

HVotes.Breadcrumb = Breadcrumb

export default HVotes
