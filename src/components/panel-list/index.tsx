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
  textOverhidden: number
  height?: string | number
}

class PanelList extends React.Component<PanelListProps, {}> {
  constructor(props: PanelListProps | Readonly<PanelListProps>) {
    super(props)
  }

  static defaultProps = {
    prefixCls: 'suprc-panel-list',
    textOverhidden: 1,
    shouldRenderTime: false
  }

  render() {
    const { prefixCls, list, shouldRenderTime, textOverhidden, height } = this.props
    let liStyles = {}
    if (textOverhidden > 1) {
      liStyles = {
        display: '-webkit-box',
        '-webkit-box-orient': 'vertical',
        '-webkit-line-clamp': `${textOverhidden}`,
        'white-space': 'normal'
      }
    }
    return (
      <ul className={prefixCls} style={{ height }}>
        {list.map((item) => (
          <li key={item.id}>
            <Link style={liStyles} title={item.title} to={item.url}>
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
