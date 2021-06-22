import React from 'react'
import { BlockProps } from './index'
import './Center.less'

// eslint-disable-next-line
interface CenterProps extends BlockProps {}
class Center extends React.Component<CenterProps, {}> {
  constructor(props: CenterProps | Readonly<CenterProps>) {
    super(props)
  }

  static defaultProps = {
    prefixCls: 'suprc-block-center'
  }

  render() {
    const { prefixCls, children, style = {} } = this.props
    return (
      <section className={prefixCls} style={style}>
        {children}
      </section>
    )
  }
}

export default Center
