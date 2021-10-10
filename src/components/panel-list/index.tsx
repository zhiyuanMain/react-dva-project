import { Link } from 'dva/router'
import React from 'react'
import { ChannelContentType } from 'src/constant/channel'
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
  type?: ChannelContentType
  moreText?: string
}

class PanelList extends React.Component<PanelListProps, {}> {
  constructor(props: PanelListProps | Readonly<PanelListProps>) {
    super(props)
  }

  static defaultProps = {
    prefixCls: 'suprc-panel-list',
    textOverhidden: 1,
    shouldRenderTime: true,
    moreText: '更多>>'
  }

  render() {
    const { prefixCls, list, shouldRenderTime, textOverhidden, height, type, moreText } = this.props
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
      <dl className={prefixCls} style={{ height }}>
        {list.map((item) => (
          <dd key={item.id}>
            <Link style={liStyles} title={item.title} to={item.url}>
              {item.title}
            </Link>
            {shouldRenderTime && <span className="time">{item.time}</span>}
          </dd>
        ))}
        {type ? (
          <dt className={`${prefixCls}__morebtn`}>
            <Link style={liStyles} to={`/list/${type}`}>
              {moreText}
            </Link>
          </dt>
        ) : null}
      </dl>
    )
  }
}

export default PanelList
