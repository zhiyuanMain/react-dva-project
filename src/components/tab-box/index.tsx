import { Tabs } from 'antd'
import React from 'react'
import PanelList, { PanelListItem } from '../panel-list'
import './index.less'

export interface TabItem {
  tabTitle: string
  list: PanelListItem[]
}
interface TabBoxProps {
  prefixCls?: string
  style?: React.CSSProperties
  tabs: TabItem[]
}

class TabBox extends React.Component<TabBoxProps, {}> {
  constructor(props: TabBoxProps | Readonly<TabBoxProps>) {
    super(props)
  }

  static defaultProps = {
    prefixCls: 'suprc-tab-box'
  }

  render() {
    const { prefixCls, tabs, style = {} } = this.props
    return (
      <div className={prefixCls} style={style}>
        <Tabs defaultActiveKey="0" size="small">
          {tabs.map((item, index) => (
            <Tabs.TabPane tab={item.tabTitle} key={`${index}`}>
              <PanelList list={item.list} />
            </Tabs.TabPane>
          ))}
        </Tabs>
      </div>
    )
  }
}

export default TabBox
