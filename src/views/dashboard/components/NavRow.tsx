import React from 'react'
import { Menu } from 'antd'
import { Block } from 'src/components'
import './NavRow.less'

type NavListItem = {
  key: string
  title: string
}
const NavList: NavListItem[] = [
  { key: 'dashboard', title: '首页' },
  { key: 'cityBureauProfile', title: '市局概况' },
  { key: 'functionIntroduction', title: '职能介绍' },
  { key: 'onlineServices', title: '网上服务' },
  { key: 'openGovernmentAffairs', title: '政务公开' },
  { key: 'replyFromNetizens', title: '网民回复' },
  { key: 'specialColumn', title: '专题专栏' },
  { key: 'otherInformation', title: '其他资讯' }
]

interface NavRowProps {
  prefixCls?: string
}
class NavRow extends React.Component<NavRowProps, {}> {
  constructor(props: NavRowProps | Readonly<NavRowProps>) {
    super(props)
  }

  static defaultProps = {
    prefixCls: 'dashboard-page-navrow'
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
            selectedKeys={[NavList[0].key]}
            mode="horizontal">
            {NavList.map((item) => (
              <Menu.Item key={item.key}>{item.title}</Menu.Item>
            ))}
          </Menu>
        </Block.Center>
      </div>
    )
  }
}

export default NavRow
