import React from 'react'
import LogoRow from '../components/LogoRow'
import HeaderRow from '../components/HeaderRow'
import NavRow from '../components/NavRow'
import './index.less'

interface BasicLayoutProps {
  prefixCls?: string
  history: any
}
class BasicLayout extends React.Component<BasicLayoutProps, {}> {
  constructor(props: BasicLayoutProps | Readonly<BasicLayoutProps>) {
    super(props)
  }

  static defaultProps = {
    prefixCls: 'suprl-basiclayout'
  }

  renderBgImg = () => {
    const { prefixCls } = this.props
    const wrapCls = `${prefixCls}__bgimg`

    return <img className={wrapCls} src={require('../../assets/img/dashboard-bg.png')} />
  }

  renderHeader = () => {
    const { prefixCls, history } = this.props
    const wrapCls = `${prefixCls}__header`

    return (
      <section className={wrapCls}>
        <HeaderRow />
        <LogoRow history={history} />
        <NavRow />
      </section>
    )
  }

  render() {
    const { prefixCls, children } = this.props
    return (
      <div className={prefixCls}>
        {this.renderBgImg()}
        {this.renderHeader()}
        <div className={`${prefixCls}__main`}>{children}</div>
      </div>
    )
  }
}

export default BasicLayout
