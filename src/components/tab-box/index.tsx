import { Tabs } from 'antd'
import React from 'react'
import { ChannelContentType } from 'src/constant/channel'
import { LinkItem } from 'src/services/gateway'
import { formatTime } from 'src/utils/helper'
import PanelList, { PanelListItem } from '../panel-list'
import './index.less'

export interface TabItem {
  tabTitle: string
  list: PanelListItem[]
  type?: ChannelContentType
}
interface TabBoxProps {
  prefixCls?: string
  style?: React.CSSProperties
  textOverhidden?: number
  height?: number | 'string'
  tabs: TabItem[]
  shouldRenderTime?: boolean
}

class TabBox extends React.Component<TabBoxProps, {}> {
  constructor(props: TabBoxProps | Readonly<TabBoxProps>) {
    super(props)
  }

  static defaultProps = {
    prefixCls: 'suprc-tab-box',
    textOverhidden: 1,
    height: 360,
    shouldRenderTime: true
  }

  render() {
    const { prefixCls, tabs, style = {}, textOverhidden, height, shouldRenderTime } = this.props
    return (
      <div className={prefixCls} style={style}>
        <Tabs defaultActiveKey="0" size="small">
          {tabs.map((item, index) => (
            <Tabs.TabPane tab={item.tabTitle} key={`${index}`}>
              <PanelList
                height={height}
                list={item.list}
                textOverhidden={textOverhidden}
                shouldRenderTime={shouldRenderTime}
                type={item.type}
              />
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
