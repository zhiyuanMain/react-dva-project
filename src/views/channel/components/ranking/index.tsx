import React from 'react'
import TabBox, { TabItem } from 'src/components/tab-box'
import { ChannelContentType } from 'src/constant/channel'
import { mockTabItem } from 'src/views/dashboard/components/_utils'
import './index.less'

interface RankingProps {
  prefixCls?: string
  type: ChannelContentType
}

const genTabLists = (title: string): TabItem[] => [{ ...mockTabItem(title, 5) }]

class Ranking extends React.Component<RankingProps, {}> {
  constructor(props: RankingProps | Readonly<RankingProps>) {
    super(props)
  }

  static defaultProps = {
    prefixCls: 'channel-page-ranking',
    list: []
  }

  render() {
    const { prefixCls, type } = this.props
    return (
      <section className={prefixCls}>
        <div className={`${prefixCls}__block`}>
          <TabBox tabs={genTabLists(`${type} 总排行`)} textOverhidden={2} />
        </div>
        <div className={`${prefixCls}__block`}>
          <TabBox tabs={genTabLists(`${type} 月排行`)} textOverhidden={2} />
        </div>
      </section>
    )
  }
}

export default Ranking
