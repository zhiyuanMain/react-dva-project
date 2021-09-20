import React from 'react'
import LogoRow from '../components/LogoRow'
import HeaderRow from '../components/HeaderRow'
import NavRow from '../components/NavRow'

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
        {this.renderHeader()}
        <div className={`${prefixCls}__main`}>{children}</div>
      </div>
    )
  }
}

export default BasicLayout
