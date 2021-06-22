import { Popover } from 'antd'
import React from 'react'
import { Block } from 'src/components'
import './FooterRow.less'

interface FooterRowProps {
  prefixCls?: string
}
class FooterRow extends React.Component<FooterRowProps, {}> {
  constructor(props: FooterRowProps | Readonly<FooterRowProps>) {
    super(props)
  }

  static defaultProps = {
    prefixCls: 'dashboard-page-footerrow'
  }

  renderLeft = () => {
    const { prefixCls } = this.props
    const wrapCls = `${prefixCls}__left`

    return (
      <div className={wrapCls}>
        <img src={require('../../../assets/img/type.png')} />
        <article>
          <address>地址：榆林市兴榆路榆林农业大厦 主办单位</address>
          <p>E-mail：ylnyxxw@126.com 陕ICP备20005710 网站标识码：6108000013</p>
          <p>电话：0912－6662688 陕公网安备 61080202000240号</p>
        </article>
      </div>
    )
  }

  renderRight = () => {
    const { prefixCls } = this.props
    const wrapCls = `${prefixCls}__right`
    const content = (
      <img src={require('../../../assets/img/qrcode.png')} style={{ width: 120, height: 120 }} />
    )

    return (
      <div className={wrapCls}>
        <section className={`${wrapCls}__wechat`}>
          <img src={require('../../../assets/img/wechat.png')} />
          <p>欢迎关注</p>
          <p>官方微信公众号</p>
        </section>
        <section className={`${wrapCls}__qrcode`}>
          <Popover content={content}>
            <img src={require('../../../assets/img/qrcode.png')} />
          </Popover>
        </section>
      </div>
    )
  }

  render() {
    const { prefixCls } = this.props
    return (
      <div className={prefixCls}>
        <Block.Center>
          <div className={`${prefixCls}__main`}>
            {this.renderLeft()}
            {this.renderRight()}
          </div>
        </Block.Center>
      </div>
    )
  }
}

export default FooterRow
