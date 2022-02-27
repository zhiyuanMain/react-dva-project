import {
  Breadcrumb,
  Button,
  Col,
  Form,
  FormInstance,
  Input,
  message,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Upload
} from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { UploadFile, UploadProps } from 'antd/lib/upload/interface'
import { Link } from 'dva/router'
import React from 'react'
import { Block } from 'src/components'
import './index.less'
import gateway from 'src/services/gateway'
import { SendApplicationReqParams } from 'src/services/gateway/sendApplication'
import FooterRow from '../dashboard/components/FooterRow'
import pickerrorImg from 'src/assets/img/pickerror.png'

const BREADCRUMBLIST: BreadcrumbListItem[] = [
  { title: '首页', path: '/', category: 'link' },
  { title: '政务公开', path: '/zwgk', category: 'link' },
  { title: '依申请公开', category: 'text' }
]
const INIT_VALUES: SendApplicationReqParams = {
  alcType: '公民', // 公民、法人或者其他组织
  alcName: '', // 姓名
  alcWorkUnit: '', // 工作单位
  alcCertType: '身份证', // 证件名称
  alcCertCode: '', // 证件号码
  alcAttachmentFront: '', // 证件扫描件正面 --文件
  alcAttachmentReide: '', // 证件扫描件反面 --文件
  alcTelPhone: '', // 联系电话
  alcFax: '', // 联系传真
  alcPhone: '', // 手机号码
  alcMail: '', // 电子邮箱
  alcAddress: '', // 通讯地址
  alcPostcode: '', // 邮政编码
  alcOrganizationCode: '', // 组织机构代码
  alcLicenseCode: '', // 营业执照代码
  alcLegal: '', // 法人代表
  alcContacts: '', // 联系人
  alcAttachmentScanning: '', // 法人证件扫描件或照片
  infoDesc: '', // 所需信息描述
  infoTarget: '', // 用途描述
  infoPublic: '是', // 是否公开
  infoProvider: '纸质' // 信息的制定提供方式
}

const CURRENTALCTYPE = ['公民', '法人或者其他组织']

interface ApplicationProps {
  prefixCls?: string
}
interface ApplicationState {
  breadcrumb: BreadcrumbListItem[]
  fileListFront: UploadFile[]
  fileListReide: UploadFile[]
  fileListScanning: UploadFile[]
  currentAlcType: string
  shouldRenderForm: boolean
}
type BreadcrumbListItem = {
  title: string
  path?: string
  category: 'text' | 'link'
}

class Application extends React.Component<ApplicationProps, ApplicationState> {
  constructor(props: ApplicationProps | Readonly<ApplicationProps>) {
    super(props)
  }

  static defaultProps = {
    prefixCls: 'application-page'
  }

  state: ApplicationState = {
    breadcrumb: [...BREADCRUMBLIST],
    fileListFront: [],
    fileListReide: [],
    fileListScanning: [],
    currentAlcType: INIT_VALUES.alcType,
    shouldRenderForm: true
  }

  formRef = React.createRef<FormInstance>()

  genUploadProps = (type: 'Front' | 'Reide' | 'Scanning'): UploadProps => ({
    // action: '/upload/image/api/yihegui/uploadyhg.jsp',
    // action: 'https://nyj.yl.gov.cn/api/yihegui/uploadyhg.jsp',
    action: '/api/yihegui/uploadyhg.jsp',
    onRemove: (file) => {
      const isFront = type === 'Front'
      const fileList = isFront ? [...this.state['fileListFront']] : [...this.state['fileListReide']]
      const index = fileList.indexOf(file)
      const newFileList = fileList.slice()
      newFileList.splice(index, 1)
      const key = `fileList${type}`
      const newState = { [key]: newFileList } as any
      this.setState({
        ...newState
      })
    },
    beforeUpload: (file) => {
      const isImage = file.type.indexOf('image/') > -1
      if (!isImage) {
        message.error('请上传图片类型的文件！')
      } else {
        const key = `fileList${type}`
        const prevList = [...this.state[`fileList${type}`]]
        const newState = { [key]: [...prevList, file] } as any
        this.setState({
          ...newState
        })
      }
      return isImage
    },
    onChange: (info) => {
      const { file } = info
      const key = `fileList${type}`
      if (file.status === 'done') {
        const newState = { [key]: [file] } as any
        this.setState({
          ...newState
        })
      }
      if (file.status === 'error') {
        message.error('上传失败，请重试')
        const newState = { [key]: [] } as any
        this.setState({
          ...newState
        })
      }
    }
  })

  handleAlcTyleChange = (e: RadioChangeEvent) => {
    this.setState({
      currentAlcType: e.target.value
    })
  }

  onFinish = (values: any) => {
    message.success('您的申请我们已收到，我们会尽快处理！正在跳转至首页')
    this.setState({
      shouldRenderForm: false
    })
    setTimeout(() => {
      window.location.href = '/'
    }, 3000)
    const { currentAlcType, fileListFront, fileListReide, fileListScanning } = this.state
    const isPerson = currentAlcType === CURRENTALCTYPE[0]
    if (isPerson) {
      if (fileListFront.length <= 0) {
        this.formRef.current?.setFieldsValue({
          alcAttachmentFront: ''
        })
        this.formRef.current?.validateFields()
        return
      }
      if (fileListReide.length <= 0) {
        this.formRef.current?.setFieldsValue({
          alcAttachmentReide: ''
        })
        this.formRef.current?.validateFields()
        return
      }
    } else {
      if (fileListScanning.length <= 0) {
        this.formRef.current?.setFieldsValue({
          alcAttachmentScanning: ''
        })
        this.formRef.current?.validateFields()
        return
      }
    }

    const { alcAttachmentFront, alcAttachmentReide, alcAttachmentScanning, ...rest } = values
    const requestJson: SendApplicationReqParams = {
      ...rest,
      alcType: rest.alcType,
      alcCertType: rest.alcCertType,
      infoPublic: rest.infoPublic,
      infoProvider: rest.infoProvider,
      alcAttachmentFront: isPerson ? alcAttachmentFront.file.response[0].url : '',
      alcAttachmentReide: isPerson ? alcAttachmentReide.file.response[0].url : '',
      alcAttachmentScanning: isPerson ? '' : alcAttachmentScanning.file.response[0].url
    }
    gateway.sendApplication.req({ ...requestJson }).then((res) => {
      if (res.success) {
        message.success('您的申请我们已收到，我们会尽快处理！正在跳转至首页')
        this.setState({
          shouldRenderForm: false
        })
        setTimeout(() => {
          window.location.href = '/'
        }, 3000)
      }
    })
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
        ref={this.formRef}
        onFinish={this.onFinish}
        autoComplete="off"
        initialValues={INIT_VALUES}
        labelCol={{ span: 7 }}>
        {this.renderAlcTitle()}
        <Form.Item name="alcType">
          {this.renderRow(
            'item',
            <Radio.Group defaultValue={INIT_VALUES.alcType} onChange={this.handleAlcTyleChange}>
              <Radio value="公民">公民</Radio>
              <Radio value="法人或者其他组织">法人或者其他组织</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        {this.renderRow(
          'item',
          <>
            {/* 公民相关 */}
            {this.state.currentAlcType === CURRENTALCTYPE[0] ? (
              <React.Fragment>
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
                      <Select defaultValue="身份证">
                        <Select.Option value="身份证">身份证</Select.Option>
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
                      rules={[{ required: true, message: '请上传身份证正面文件' }]}>
                      <Upload {...this.genUploadProps('Front')} fileList={this.state.fileListFront}>
                        <Button
                          disabled={this.state.fileListFront.length > 0}
                          icon={<UploadOutlined />}>
                          请上传身份证正面文件
                        </Button>
                      </Upload>
                    </Form.Item>
                  </Col>
                  <Col span={10} offset={2}>
                    <Form.Item
                      label=" "
                      required={false}
                      colon={false}
                      name="alcAttachmentReide"
                      rules={[{ required: true, message: '请上传身份证反面文件' }]}>
                      <Upload {...this.genUploadProps('Reide')} fileList={this.state.fileListReide}>
                        <Button
                          disabled={this.state.fileListReide.length > 0}
                          icon={<UploadOutlined />}>
                          请上传身份证反面文件
                        </Button>
                      </Upload>
                    </Form.Item>
                  </Col>
                </Row>
              </React.Fragment>
            ) : null}
            {/* 法人或者其他组织 */}
            {this.state.currentAlcType === CURRENTALCTYPE[1] ? (
              <React.Fragment>
                <Row>
                  <Col span={10}>
                    <Form.Item
                      label="组织机构代码"
                      name="alcOrganizationCode"
                      rules={[{ required: true, message: '请输入组织机构代码' }]}>
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={10} offset={2}>
                    <Form.Item
                      label="营业执照代码"
                      name="alcLicenseCode"
                      rules={[{ required: true, message: '请输入营业执照代码' }]}>
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={10}>
                    <Form.Item label="法人代表" name="alcLegal">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={10} offset={2}>
                    <Form.Item label="联系人" name="alcContacts">
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={10}>
                    <Form.Item
                      label="法人证件扫描件或照片"
                      name="alcAttachmentScanning"
                      rules={[{ required: true, message: '请上传法人证件扫描件或照片' }]}>
                      <Upload
                        {...this.genUploadProps('Scanning')}
                        fileList={this.state.fileListScanning}>
                        <Button
                          disabled={this.state.fileListScanning.length > 0}
                          icon={<UploadOutlined />}>
                          请上传证件正面文件
                        </Button>
                      </Upload>
                    </Form.Item>
                  </Col>
                </Row>
              </React.Fragment>
            ) : null}
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
                  rules={[
                    { required: true, message: '请输入手机号码' },
                    { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号码' }
                  ]}>
                  <Input maxLength={11} />
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
                  rules={[{ required: true, message: '请输入通讯地址' }]}>
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
                  <Radio.Group defaultValue={INIT_VALUES.infoPublic}>
                    <Radio value="是">是</Radio>
                    <Radio value="否">否</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item labelCol={{ span: 3 }} label="信息的制定提供方式" name="infoProvider">
                  <Radio.Group defaultValue={INIT_VALUES.infoProvider}>
                    <Radio value="纸质">纸质</Radio>
                    <Radio value="电子邮件">电子邮件</Radio>
                    <Radio value="光盘">光盘</Radio>
                    <Radio value="邮寄">邮寄</Radio>
                    <Radio value="传真">传真</Radio>
                    <Radio value="自行领取">自行领取</Radio>
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
        {this.state.shouldRenderForm ? (
          <Form.Item wrapperCol={{ offset: 11, span: 16 }} style={{ marginTop: 20 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        ) : null}
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
        <FooterRow
          renderSubImg={() => (
            <a
              href="https://zfwzzc.www.gov.cn/check_web/errorInfo/jcInfo/70f4f603-2380-409f-928e-c88a78664923-2293780979"
              target="_blank"
              rel="noreferrer">
              <img src={pickerrorImg} style={{ width: 110, height: 55 }} />
            </a>
          )}
        />
      </div>
    )
  }
}

export default Application
