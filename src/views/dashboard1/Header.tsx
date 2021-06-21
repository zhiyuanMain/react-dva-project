import React from 'react'
import { Button } from 'antd'
import { Link } from 'dva/router'
import './Header.less'
import withToken, { WithToken } from 'src/hoc/withToken'

type HeaderProps = WithToken & {
  prefixCls?: string
}

const defaultProps = {
  prefixCls: 'tool-header'
}

class Header extends React.Component<HeaderProps, {}> {
  public static defaultProps = { ...defaultProps }

  public render(): JSX.Element {
    const { prefixCls } = this.props
    console.log(this.props)
    return (
      <div className={prefixCls}>
        <Button type="link">
          <Link to={`/user?pageId=${Math.random()}`}>To User Page</Link>
        </Button>
        <Button type="link">
          <Link to="/demo">To Demo Page</Link>
        </Button>
      </div>
    )
  }
}

export default withToken(Header)
