import React from 'react'
import TabBox, { TabItem } from 'src/components/tab-box'
import './index.less'
interface RankingProps {
  prefixCls?: string
  totalList: TabItem[]
  monthList: TabItem[]
}

class Ranking extends React.Component<RankingProps, {}> {
  constructor(props: RankingProps | Readonly<RankingProps>) {
    super(props)
  }

  static defaultProps = {
    prefixCls: 'channel-page-ranking',
    list: []
  }

  render() {
    const { prefixCls, totalList, monthList } = this.props
    return (
      <section className={prefixCls}>
        <div className={`${prefixCls}__block`}>
          <TabBox shouldRenderTime={false} tabs={totalList} textOverhidden={2} />
        </div>
        <div className={`${prefixCls}__block`}>
          <TabBox shouldRenderTime={false} tabs={monthList} textOverhidden={2} />
        </div>
      </section>
    )
  }
}

export default Ranking
