import React from 'react'
import LogoRow from '../components/LogoRow'
import './index.less'

interface RequireLayoutProps {
  prefixCls?: string
  history: any
}
class RequireLayout extends React.Component<RequireLayoutProps, {}> {
  constructor(props: RequireLayoutProps | Readonly<RequireLayoutProps>) {
    super(props)
  }

  static defaultProps = {
    prefixCls: 'suprl-requirelayout'
  }

  renderHeader = () => {
    const { prefixCls, history } = this.props
    const wrapCls = `${prefixCls}__header`

    return (
      <section className={wrapCls}>
        <LogoRow showSerarch={false} history={history} />
      </section>
    )
  }

  renderTitle = () => {
    const { prefixCls } = this.props
    const wrapCls = `${prefixCls}__title`

    return (
      <section className={wrapCls}>
        <h1>政府信息公开</h1>
      </section>
    )
  }

  render() {
    const { prefixCls, children } = this.props
    return (
      <div className={prefixCls}>
        <div className={`${prefixCls}__container`}>
          {this.renderHeader()}
          {this.renderTitle()}
          <div className={`${prefixCls}__main`}>{children}</div>
        </div>
      </div>
    )
  }
}

export default RequireLayout
