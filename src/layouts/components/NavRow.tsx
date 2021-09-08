import React from 'react'
import { Menu } from 'antd'
import { Block } from 'src/components'
import './NavRow.less'
import { Link } from 'dva/router'
import CHANNEL_CONSTANTS, { CHANNEL_CONSTANTS_CFG } from 'src/constant/channel'

type NavListItem = {
  key: string
  title: string
}
const NavList: NavListItem[] = [
  { key: 'dashboard', title: '首页' },
  { key: CHANNEL_CONSTANTS.sjgk, title: CHANNEL_CONSTANTS_CFG.sjgk.name },
  { key: CHANNEL_CONSTANTS.znjs, title: CHANNEL_CONSTANTS_CFG.znjs.name },
  { key: CHANNEL_CONSTANTS.wsfw, title: CHANNEL_CONSTANTS_CFG.wsfw.name },
  { key: CHANNEL_CONSTANTS.zwgk, title: CHANNEL_CONSTANTS_CFG.zwgk.name },
  { key: CHANNEL_CONSTANTS.wmhf, title: CHANNEL_CONSTANTS_CFG.wmhf.name },
  { key: CHANNEL_CONSTANTS.ztzl, title: CHANNEL_CONSTANTS_CFG.ztzl.name },
  { key: CHANNEL_CONSTANTS.dflz, title: CHANNEL_CONSTANTS_CFG.dflz.name }
]

interface NavRowProps {
  prefixCls?: string
}
class NavRow extends React.Component<NavRowProps, {}> {
  constructor(props: NavRowProps | Readonly<NavRowProps>) {
    super(props)
  }

  static defaultProps = {
    prefixCls: 'suprlc-navrow'
  }

  // eslint-disable-next-line
  handleClick = (res: any) => {}

  render() {
    const { prefixCls } = this.props
    return (
      <div className={prefixCls}>
        <Block.Center>
          <Menu
            className={`${prefixCls}__menu`}
            onClick={this.handleClick}
            defaultSelectedKeys={[NavList[0].key]}
            mode="horizontal">
            {NavList.map((item) => (
              <Menu.Item key={item.key}>
                {item.key === 'dashboard' ? (
                  <Link to={'/dashboard'}>{item.title}</Link>
                ) : item.key === CHANNEL_CONSTANTS.zwgk ? (
                  <Link to={`/${item.key}`}>{item.title}</Link>
                ) : (
                  <Link to={`/list/${item.key}`}>{item.title}</Link>
                )}
              </Menu.Item>
            ))}
          </Menu>
        </Block.Center>
      </div>
    )
  }
}

export default NavRow
