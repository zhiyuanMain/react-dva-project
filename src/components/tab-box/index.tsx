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
  textOverhidden?: number
  tabs: TabItem[]
}

class TabBox extends React.Component<TabBoxProps, {}> {
  constructor(props: TabBoxProps | Readonly<TabBoxProps>) {
    super(props)
  }

  static defaultProps = {
    prefixCls: 'suprc-tab-box',
    textOverhidden: 1
  }

  render() {
    const { prefixCls, tabs, style = {}, textOverhidden } = this.props
    return (
      <div className={prefixCls} style={style}>
        <Tabs defaultActiveKey="0" size="small">
          {tabs.map((item, index) => (
            <Tabs.TabPane tab={item.tabTitle} key={`${index}`}>
              <PanelList list={item.list} textOverhidden={textOverhidden} />
            </Tabs.TabPane>
          ))}
        </Tabs>
      </div>
    )
  }
}

export default TabBox
