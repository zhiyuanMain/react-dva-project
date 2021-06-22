import { Link } from 'dva/router'
import React from 'react'
import './index.less'

export interface PanelListItem {
  url: string
  id: string
  title: string
  time?: string
}
interface PanelListProps {
  prefixCls?: string
  list: PanelListItem[]
  shouldRenderTime?: boolean
}

class PanelList extends React.Component<PanelListProps, {}> {
  constructor(props: PanelListProps | Readonly<PanelListProps>) {
    super(props)
  }

  static defaultProps = {
    prefixCls: 'suprc-panel-list',
    shouldRenderTime: false
  }

  render() {
    const { prefixCls, list, shouldRenderTime } = this.props
    return (
      <ul className={prefixCls}>
        {list.map((item) => (
          <li key={item.id}>
            <Link title={item.title} to={item.url}>
              {item.title}
            </Link>
            {shouldRenderTime && <span className="time">{item.time}</span>}
          </li>
        ))}
      </ul>
    )
  }
}

export default PanelList
