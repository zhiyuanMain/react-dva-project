import React from 'react'
import TabBox, { TabItem } from 'src/components/tab-box'
import { mockTabItem } from 'src/views/dashboard/components/_utils'
import './index.less'

interface RankingProps {
  prefixCls?: string
}

const TabLists1: TabItem[] = [{ ...mockTabItem('总排行') }]
const TabLists2: TabItem[] = [{ ...mockTabItem('月排行') }]

class Ranking extends React.Component<RankingProps, {}> {
  constructor(props: RankingProps | Readonly<RankingProps>) {
    super(props)
  }

  static defaultProps = {
    prefixCls: 'channel-page-ranking',
    list: []
  }

  render() {
    const { prefixCls } = this.props
    return (
      <section className={prefixCls}>
        <div className={`${prefixCls}__block`}>
          <TabBox tabs={TabLists1} />
        </div>
        <div className={`${prefixCls}__block`}>
          <TabBox tabs={TabLists2} />
        </div>
      </section>
    )
  }
}

export default Ranking
