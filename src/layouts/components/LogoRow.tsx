import React from 'react'
import { Input } from 'antd'
import { Block } from 'src/components'
import logo from 'src/assets/img/logo.png'
import './LogoRow.less'

const { Search } = Input
interface LogoRowProps {
  prefixCls?: string
  showSerarch?: boolean
}
class LogoRow extends React.Component<LogoRowProps, {}> {
  constructor(props: LogoRowProps | Readonly<LogoRowProps>) {
    super(props)
  }

  static defaultProps = {
    prefixCls: 'suprlc-logorow',
    showSerarch: true
  }

  handleSearch = (e: string) => {
    console.log(e)
  }
  renderSearch = () => {
    const { prefixCls, showSerarch } = this.props
    if(!showSerarch) return null
    const wrapCls = `${prefixCls}__search`

    return (
      <div className={wrapCls}>
        <Search
          placeholder="请输入内容"
          allowClear
          enterButton="搜索"
          onSearch={this.handleSearch}
        />
      </div>
    )
  }
  render() {
    const { prefixCls } = this.props
    return (
      <div className={prefixCls}>
        <Block.Center style={{ height: 117 }}>
          <img src={logo} className={`${prefixCls}__logo`} />
          {this.renderSearch()}
        </Block.Center>
      </div>
    )
  }
}

export default LogoRow
