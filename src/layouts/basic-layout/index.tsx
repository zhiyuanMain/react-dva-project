import React from 'react'
import LogoRow from '../components/LogoRow'
import HeaderRow from '../components/HeaderRow'
import NavRow from '../components/NavRow'

interface BasicLayoutProps {
  prefixCls?: string
}
class BasicLayout extends React.Component<BasicLayoutProps, {}> {
  constructor(props: BasicLayoutProps | Readonly<BasicLayoutProps>) {
    super(props)
  }

  static defaultProps = {
    prefixCls: 'suprl-basiclayout'
  }

  renderHeader = () => {
    const { prefixCls } = this.props
    const wrapCls = `${prefixCls}__header`

    return (
      <section className={wrapCls}>
        <HeaderRow />
        <LogoRow />
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
