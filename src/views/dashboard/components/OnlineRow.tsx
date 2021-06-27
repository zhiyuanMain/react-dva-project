import { Link } from 'dva/router'
import React from 'react'
import { Block } from 'src/components'
import TabBox, { TabItem } from 'src/components/tab-box'
import './OnlineRow.less'
import { mockTabItem } from './_utils'

const imgList = ['message', 'guide', 'excel', 'investigation', 'video']

const TabLists1: TabItem[] = [
  { ...mockTabItem('龙头企业') },
  { ...mockTabItem('科技教育') },
  { ...mockTabItem('政策法规') },
  { ...mockTabItem('综合执法') },
  { ...mockTabItem('质量安全') }
]
const TabLists2: TabItem[] = [
  { ...mockTabItem('一村一品') },
  { ...mockTabItem('果桑园艺') },
  { ...mockTabItem('农经管理') },
  { ...mockTabItem('种子能源') }
]
interface OnlineRowProps {
  prefixCls?: string
}
class OnlineRow extends React.Component<OnlineRowProps, {}> {
  constructor(props: OnlineRowProps | Readonly<OnlineRowProps>) {
    super(props)
  }

  static defaultProps = {
    prefixCls: 'dashboard-page-onlinerow'
  }

  renderIntro = () => {
    const { prefixCls } = this.props
    const wrapCls = `${prefixCls}__img`
    return (
      <ul className={wrapCls}>
        {imgList.map((item, index) => (
          <li key={index}>
            <Link to="/">
              <img src={require(`src/assets/img/online-${item}.png`)} />
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  renderInfo = () => {
    const { prefixCls } = this.props
    const wrapCls = `${prefixCls}__info`
    return (
      <div className={wrapCls}>
        <div className={`${wrapCls}__block`}>
          <TabBox tabs={TabLists1} />
        </div>
        <div className={`${wrapCls}__block`}>
          <TabBox tabs={TabLists2} />
        </div>
      </div>
    )
  }
  render() {
    const { prefixCls } = this.props
    return (
      <div className={prefixCls}>
        <Block.Center>
          <Block.Title icon="group" name="网上服务" />
        </Block.Center>
        <Block.Center>{this.renderIntro()}</Block.Center>
        <Block.Center>{this.renderInfo()}</Block.Center>
      </div>
    )
  }
}

export default OnlineRow
