import { Tabs } from 'antd'
import React from 'react'
import { LinkItem } from 'src/services/gateway'
import { formatTime } from 'src/utils/helper'
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
  height?: number | 'string'
  tabs: TabItem[]
}

class TabBox extends React.Component<TabBoxProps, {}> {
  constructor(props: TabBoxProps | Readonly<TabBoxProps>) {
    super(props)
  }

  static defaultProps = {
    prefixCls: 'suprc-tab-box',
    textOverhidden: 1,
    height: 330
  }

  render() {
    const { prefixCls, tabs, style = {}, textOverhidden, height } = this.props
    return (
      <div className={prefixCls} style={style}>
        <Tabs defaultActiveKey="0" size="small">
          {tabs.map((item, index) => (
            <Tabs.TabPane tab={item.tabTitle} key={`${index}`}>
              <PanelList height={height} list={item.list} textOverhidden={textOverhidden} />
            </Tabs.TabPane>
          ))}
        </Tabs>
      </div>
    )
  }
}

export default TabBox

export const convertLinkData = (data: LinkItem[]): PanelListItem[] => {
  return data.map((item) => ({
    id: item.id,
    url: item.to,
    title: item.title,
    time: formatTime(item.publishTime)
  }))
}
