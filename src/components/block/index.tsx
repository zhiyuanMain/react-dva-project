import React from 'react'
import './index.less'

interface BlockProps {
  prefixCls?: string
  style?: React.CSSProperties
}

// eslint-disable-next-line
interface CenterProps extends BlockProps {}
class Center extends React.Component<CenterProps, {}> {
  constructor(props: {} | Readonly<BlockProps>) {
    super(props)
  }

  static defaultProps = {
    prefixCls: 'rc-center'
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

const Block = {
  Center
}
export default Block
