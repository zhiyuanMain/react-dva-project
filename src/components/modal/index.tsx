import React from 'react'
import { Button, Modal as AntdModal } from 'antd'

interface ModalProps {
  prefixCls?: string
}

interface ModalState {
  visible: boolean
}
class Modal extends React.Component<ModalProps, ModalState> {
  constructor(props: ModalProps | Readonly<ModalProps>) {
    super(props)
  }

  static defaultProps = {
    prefixCls: 'suprc-global-modal'
  }

  state: ModalState = {
    visible: true
  }

  handleClose = () => {
    this.setState({
      visible: false
    })
  }

  render() {
    const { visible } = this.state
    // if (process.env.NODE_ENV === 'development') return null
    return (
      <AntdModal
        visible={visible}
        width={450}
        footer={[
          <Button key="ok" type="primary" onClick={this.handleClose}>
            关闭
          </Button>
        ]}
        onCancel={this.handleClose}>
        <h3 style={{ paddingTop: 30, margin: 0 }}>
          榆林市农业农村局官网现已全新改版正式上线，改版后网站地址不变，新版网站仍在不断完善中，如果您有什么意见和建议欢迎给我们留言，也可拨打电话0912-6084621告诉我们改进，谢谢！
        </h3>
      </AntdModal>
    )
  }
}

export default Modal
