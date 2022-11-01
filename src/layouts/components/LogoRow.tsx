import React from 'react'
import { Input } from 'antd'
import { Block } from 'src/components'
import logo from 'src/assets/img/logo-text.png'
import nationalEmblem from 'src/assets/img/national-emblem.png'
import './LogoRow.less'
import { Link } from 'dva/router'

const { Search } = Input
interface LogoRowProps {
  prefixCls?: string
  history: any
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
    this.props.history.push(`/search?keyword=${e}`)
  }
  renderSearch = () => {
    const { prefixCls, showSerarch } = this.props
    if (!showSerarch) return null
    const wrapCls = `${prefixCls}__search`

    return (
      <div className={wrapCls}>
        <Search
          style={{ width: 330 }}
          placeholder="请输入内容"
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
          <Link to="/dashboard">
            <img src={nationalEmblem} className={`${prefixCls}__national`} />
            <img src={logo} className={`${prefixCls}__logo`} />
          </Link>
          <a
            target="_blank"
            href="http://www.gov.cn/zhuanti/zggcddescqgdbdh/index.htm"
            rel="noreferrer">
            <img src="http://www.gov.cn/govweb/xhtml/2019zhuanti/20thCPCNationalCongress/images/danghuiicon.png" />
          </a>
          {this.renderSearch()}
        </Block.Center>
      </div>
    )
  }
}

export default LogoRow
