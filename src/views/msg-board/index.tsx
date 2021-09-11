import { Breadcrumb, Button, Form, Input, message, Radio, Select } from 'antd'
import { Link } from 'dva/router'
import React from 'react'
import { Block } from 'src/components'
import gateway from 'src/services/gateway'
import CodeNode from './CodeNode'
import './index.less'

interface MsgboardProps {
  prefixCls?: string
}
interface MsgboardState {
  shouldRenderForm: boolean
}
class Msgboard extends React.Component<MsgboardProps, MsgboardState> {
  constructor(props: MsgboardProps | Readonly<MsgboardProps>) {
    super(props)
  }

  static defaultProps = {
    prefixCls: 'msgboard-page'
  }

  state: MsgboardState = {
    shouldRenderForm: true
  }

  onFinish = (values: any) => {
    gateway.sendMsg
      .req({
        columnId: 'lyb',
        typeid: 0,
        title: values.content,
        a1: values.name,
        a2: values.sex === 'male' ? '男' : '女',
        a3: values.qq,
        a4: values.mail,
        a5: values.phone,
        body: values.content,
        yzm: values.code
      })
      .then((res) => {
        if (res.success) {
          message.success('您的信件我们已收到，我们会尽快处理！')
          this.setState(
            {
              shouldRenderForm: false
            },
            () => {
              this.setState({
                shouldRenderForm: true
              })
            }
          )
        } else {
          message.error(res.message)
        }
      })
  }

  renderBreadcrumb = () => {
    const { prefixCls } = this.props
    const wrapCls = `${prefixCls}__breadcrumb`
    return (
      <div className={wrapCls}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/dashboard">首页</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/list/wmhf">网民回复</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>我要留言</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    )
  }

  renderTitle = () => {
    const { prefixCls } = this.props
    const wrapCls = `${prefixCls}__title`
    return <h1 className={wrapCls}>网民留言</h1>
  }

  renderForm = () => {
    const { prefixCls } = this.props
    const wrapCls = `${prefixCls}__form`
    return (
      <div className={wrapCls}>
        <Form
          name="basic"
          labelCol={{ span: 4, offset: 4 }}
          wrapperCol={{ span: 8 }}
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
          // onFinishFailed={this.onFinish}
          autoComplete="off">
          <Form.Item label="姓名" name="name" rules={[{ required: true, message: '请输入姓名' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="sex" label="性别">
            <Radio.Group defaultValue="male">
              <Radio value="male">男</Radio>
              <Radio value="female">女</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="联系QQ"
            name="qq"
            rules={[
              { required: true, message: '请输入QQ号' },
              { pattern: /[1-9][0-9]{4,14}/, message: '请输入正确的QQ号' }
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="电子邮箱"
            name="mail"
            rules={[
              { required: true, message: '请输入电子邮箱' },
              {
                pattern: /^[A-Za-z0-9._%-]+@([A-Za-z0-9-]+.)+[A-Za-z]{2,4}$/,
                message: '请输入正确的邮箱'
              }
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="手机"
            name="phone"
            rules={[
              { required: true, message: '请输入手机号码' },
              { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号' }
            ]}>
            <Input maxLength={11} />
          </Form.Item>
          <Form.Item name="category" label="所属分类">
            <Select defaultValue="default">
              <Select.Option value="default">默认分类</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入内容' }]}>
            <Input.TextArea rows={4} showCount />
          </Form.Item>
          <Form.Item
            label="验证码"
            name="code"
            extra={<CodeNode />}
            rules={[{ required: true, message: '请输入验证码' }]}>
            <Input style={{ width: 120 }} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }

  render() {
    const { prefixCls } = this.props
    const { shouldRenderForm } = this.state
    return (
      <div className={prefixCls}>
        <Block.Center
          style={{
            background: '#fff'
          }}>
          <div className={`${prefixCls}__content`}>
            {this.renderBreadcrumb()}
            {this.renderTitle()}
            {shouldRenderForm ? this.renderForm() : null}
          </div>
        </Block.Center>
      </div>
    )
  }
}

export default Msgboard
