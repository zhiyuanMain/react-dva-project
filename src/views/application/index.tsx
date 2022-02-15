import { Breadcrumb, Button, Col, Form, Input, Radio, Row, Select } from 'antd'
import { Link } from 'dva/router'
import React from 'react'
import { Block } from 'src/components'
import './index.less'

interface ApplicationProps {
  prefixCls?: string
}
interface ApplicationState {
  breadcrumb: BreadcrumbListItem[]
}
type BreadcrumbListItem = {
  title: string
  path?: string
  category: 'text' | 'link'
}
const BREADCRUMBLIST: BreadcrumbListItem[] = [
  { title: '首页', path: '/', category: 'link' },
  { title: '政务公开', path: '/zwgk', category: 'link' },
  { title: '依申请公开', category: 'text' }
]
class Application extends React.Component<ApplicationProps, ApplicationState> {
  constructor(props: ApplicationProps | Readonly<ApplicationProps>) {
    super(props)
  }

  static defaultProps = {
    prefixCls: 'application-page'
  }

  state: ApplicationState = {
    breadcrumb: [...BREADCRUMBLIST]
  }

  onFinish = (values: any) => {
    console.log(values)
  }

  renderRow = (suffixName: string, content: any) => {
    const { prefixCls } = this.props
    const wrapCls = `${prefixCls}__${suffixName}`
    return <div className={wrapCls}>{content}</div>
  }

  renderTitle = (content: string) => {
    return this.renderRow('title', content)
  }

  renderBreadcrumb = () => {
    const { breadcrumb } = this.state
    const content = (
      <Breadcrumb>
        {breadcrumb.map((item, index) => (
          <Breadcrumb.Item key={index}>
            {item.category === 'text' ? (
              `${item.title}`
            ) : (
              <Link to={item.path as string}>{item.title}</Link>
            )}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    )
    return this.renderRow('breadcrumb', content)
  }

  renderHelperInfo = () => {
    const content = (
      <dl>
        <dt>温馨提示： </dt>
        <dd>1.本栏目仅受理向榆林市人民</dd>
        <dd>
          2.建议您在填写依申请公开政府信息之前，先通过"网站搜索"进行查询。谢谢您的支持和配合！
        </dd>
      </dl>
    )
    return this.renderRow('helper', content)
  }

  renderForm = () => {
    const content = (
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={this.onFinish}
        autoComplete="off"
        labelCol={{ span: 7 }}>
        {this.renderAlcTitle()}
        <Form.Item name="alcType">
          {this.renderRow(
            'item',
            <Radio.Group defaultValue="citizen">
              <Radio value="citizen">公民</Radio>
              <Radio value="organization">法人或者其他组织</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        {this.renderRow(
          'item',
          <>
            <Row>
              <Col span={10}>
                <Form.Item
                  label="姓名"
                  name="alcName"
                  rules={[{ required: true, message: '请输入姓名' }]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={10} offset={2}>
                <Form.Item label="工作单位" name="alcWorkUnit">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <Form.Item label="证件名称" name="alcCertType">
                  <Select defaultValue="identityCards">
                    <Select.Option value="identityCards">身份证</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={10} offset={2}>
                <Form.Item
                  label="证件号码"
                  name="alcCertCode"
                  rules={[{ required: true, message: '请输入证件号码' }]}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <Form.Item
                  label="证件扫描件或照片"
                  name="alcAttachmentFront"
                  rules={[{ required: true, message: '' }]}>
                  <Input
                    disabled={true}
                    style={{ width: 280, marginRight: 7 }}
                    placeholder="请上传身份证正面文件"
                  />
                  <span className="my-upload">
                    <input type="file" className="cer-upload" />
                    <Button size="small">上传</Button>
                  </span>
                </Form.Item>
              </Col>
              <Col span={10} offset={2}>
                <Form.Item label=" " colon={false} name="alcAttachmentReide">
                  <Input
                    disabled={true}
                    style={{ width: 280, marginRight: 7 }}
                    placeholder="请上传身份证反面文件"
                  />
                  <span className="my-upload">
                    <Button size="small">上传</Button>
                    <input type="file" className="cer-upload" />
                  </span>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <Form.Item label="联系电话" name="alcTelPhone">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={10} offset={2}>
                <Form.Item label="联系传真" name="alcFax">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <Form.Item
                  label="手机号码"
                  name="alcPhone"
                  rules={[{ required: true, message: '请输入手机号码' }]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={10} offset={2}>
                <Form.Item label="电子邮箱" name="alcMail">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <Form.Item
                  label="通讯地址"
                  name="alcAddress"
                  rules={[{ required: true, message: '请输入手机号码' }]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={10} offset={2}>
                <Form.Item label="邮政编码" name="alcPostcode">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </>
        )}
        {this.renderInfoTitle()}
        {this.renderRow(
          'item',
          <>
            <Row>
              <Col span={24}>
                <Form.Item
                  labelCol={{ span: 3 }}
                  label="所需信息描述"
                  name="infoDesc"
                  rules={[{ required: true, message: '请输入描述信息' }]}>
                  <Input.TextArea rows={3} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  labelCol={{ span: 3 }}
                  label="用途描述"
                  name="infoTarget"
                  rules={[{ required: true, message: '请输入描述信息' }]}>
                  <Input.TextArea rows={3} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item labelCol={{ span: 3 }} label="是否公开" name="infoPublic">
                  <Radio.Group defaultValue="yes">
                    <Radio value="yes">是</Radio>
                    <Radio value="no">否</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item labelCol={{ span: 3 }} label="信息的制定提供方式" name="infoProvider">
                  <Radio.Group defaultValue="paper">
                    <Radio value="paper">纸质</Radio>
                    <Radio value="mail">电子邮件</Radio>
                    <Radio value="cd">光盘</Radio>
                    <Radio value="post">邮寄</Radio>
                    <Radio value="fax">传真</Radio>
                    <Radio value="self-collection">自行领取</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <h6>
                  【选填说明】：公告、法人或者其他组织向公开人申请提供与其自身相关的税费交纳、社会保障、医疗卫生等政府信息的，
                  应当出示有效身份证件或者证明文件。
                </h6>
              </Col>
            </Row>
          </>
        )}
        <Form.Item wrapperCol={{ offset: 11, span: 16 }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    )
    return this.renderRow('form', content)
  }
  renderAlcTitle = () => this.renderTitle('申请人信息')
  renderInfoTitle = () => this.renderTitle('所需信息情况')

  render() {
    const { prefixCls } = this.props
    return (
      <div className={prefixCls}>
        <Block.Center>
          <section className={`${prefixCls}__content`}>
            {this.renderBreadcrumb()}
            {this.renderHelperInfo()}
            {this.renderForm()}
          </section>
        </Block.Center>
      </div>
    )
  }
}

export default Application
