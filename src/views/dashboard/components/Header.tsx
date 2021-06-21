import React from 'react'
import { Block } from 'src/components'
import { getToday } from 'src/utils/helper'
import './Header.less'

interface HeaderProps {
  prefixCls?: string
}
class Header extends React.Component<HeaderProps, {}> {
  constructor(props: HeaderProps | Readonly<HeaderProps>) {
    super(props)
  }

  static defaultProps = {
    prefixCls: 'dashboard-page-header'
  }

  render() {
    const { prefixCls } = this.props
    return (
      <div className={prefixCls}>
        <Block.Center>
          <h1>欢迎光临榆林市农业农村网</h1>
          <h2>{getToday()}</h2>
        </Block.Center>
      </div>
    )
  }
}

export default Header
