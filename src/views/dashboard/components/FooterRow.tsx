import { Popover } from 'antd'
import React from 'react'
import { Block } from 'src/components'
import './FooterRow.less'

interface FooterRowProps {
  prefixCls?: string
  renderSubImg?: () => React.ReactNode
}
class FooterRow extends React.Component<FooterRowProps, {}> {
  constructor(props: FooterRowProps | Readonly<FooterRowProps>) {
    super(props)
  }

  static defaultProps = {
    prefixCls: 'dashboard-page-footerrow'
  }

  renderLeft = () => {
    const { prefixCls, renderSubImg } = this.props
    const wrapCls = `${prefixCls}__left`

    return (
      <div className={wrapCls}>
        <a
          target="_blank"
          href="http://bszs.conac.cn/sitename?method=show&id=4FAF54D2A68D5963E053012819ACEE33"
          rel="noreferrer">
          <img src={require('src/assets/img/type.png')} />
        </a>
        {typeof renderSubImg === 'function' ? renderSubImg() : null}

        <article>
          <address>地址：陕西省榆林市榆阳区榆林大道158号 主办单位: 榆林市农业农村局</address>
          <p>
            E-mail：ylnyxxw@126.com{' '}
            <a target="_blank" href="https://beian.miit.gov.cn/" rel="noreferrer">
              陕ICP备20005710号
            </a>{' '}
            网站标识码：6108000013
          </p>
          <p>
            电话：0912－6662688{' '}
            <a
              target="_blank"
              href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=61080202000240"
              rel="noreferrer">
              陕公网安备 61080202000240号
            </a>
          </p>
        </article>
      </div>
    )
  }

  renderRight = () => {
    const { prefixCls } = this.props
    const wrapCls = `${prefixCls}__right`
    const content = (
      <img src={require('src/assets/img/qrcode.jpeg')} style={{ width: 120, height: 120 }} />
    )

    return (
      <div className={wrapCls}>
        <section className={`${wrapCls}__wechat`}>
          <img src={require('src/assets/img/wechat.png')} />
          <p>欢迎关注</p>
          <p>官方微信公众号</p>
        </section>
        <section className={`${wrapCls}__qrcode`}>
          <Popover content={content}>
            <img src={require('src/assets/img/qrcode.jpeg')} />
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
