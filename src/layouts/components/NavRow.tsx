import React from 'react'
import { Menu } from 'antd'
import { Block } from 'src/components'
import './NavRow.less'
import { Link } from 'dva/router'
import CHANNEL_CONSTANTS from 'src/constant/channel'

type NavListItem = {
  key: string
  title: string
}
const NavList: NavListItem[] = [
  { key: 'dashboard', title: '首页' },
  { key: CHANNEL_CONSTANTS.cityBureauProfile, title: '市局概况' },
  { key: CHANNEL_CONSTANTS.functionIntroduction, title: '职能介绍' },
  { key: CHANNEL_CONSTANTS.onlineServices, title: '网上服务' },
  { key: CHANNEL_CONSTANTS.openGovernmentAffairs, title: '政务公开' },
  { key: CHANNEL_CONSTANTS.replyFromNetizens, title: '网民回复' },
  { key: CHANNEL_CONSTANTS.specialColumn, title: '专题专栏' },
  { key: CHANNEL_CONSTANTS.otherInformation, title: '其他资讯' }
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
                ) : item.key === CHANNEL_CONSTANTS.openGovernmentAffairs ? (
                  <Link to={`/${item.key}`}>{item.title}</Link>
                ): (
                  <Link to={`/channel/${item.key}`}>{item.title}</Link>
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
