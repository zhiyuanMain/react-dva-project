import React from 'react'
import { Carousel } from 'antd'
import { Block, TabBox } from 'src/components'
import banner1 from 'src/assets/img/banner1.png'
import './BannerRow.less'
import { TabItem } from 'src/components/tab-box'
import { mockTabItem } from './_utils'

type BannerListItem = {
  img: string
  title: string
  summary: string
}
const BannerList: BannerListItem[] = [
  {
    img: banner1,
    title: '习近平主持中共中央政治局常务委员会会议',
    summary:
      '新华社北京7月17日电 中共中央政治局常务委员会7月17日召开会议，研究部署防汛救灾工作。中共中央总书记习近平主持会议并发表重要讲话。<br/> 习近平指出，6月份以来，在党中央坚强领导下，各级党委和政府紧急行动、强化措施，国家防总、各有关部门和单位履职尽责、密切协作，人民解放军和武警部队关键时刻发挥突击队作用，广大干部群众团结奋战，防洪救灾体系发挥重要作用，防汛救灾工作有序有力推进，取得了积极成效。'
  },
  {
    img: banner1,
    title: '第二个title',
    summary: '新华社北京7月17日电 <br/><br/>打卡的快乐撒加大打击啊送到家啦到家啊睡了多久啊'
  },
  {
    img: banner1,
    title: '第三个title',
    summary:
      '第三个summary 900 <br/><br/>mock datamock datamock datamock datamock datamock datamock datamock data'
  }
]

const TabLists: TabItem[] = [
  { ...mockTabItem('要闻新闻') },
  { ...mockTabItem('最新通知') },
  { ...mockTabItem('区县动态') },
  { ...mockTabItem('党风廉政') }
]
interface BannerRowProps {
  prefixCls?: string
}

interface BannerRowState {
  currentCarouselIdx: number
}
class BannerRow extends React.Component<BannerRowProps, BannerRowState> {
  constructor(props: BannerRowProps | Readonly<BannerRowProps>) {
    super(props)
  }

  static defaultProps = {
    prefixCls: 'dashboard-page-bannerrow'
  }

  state = {
    currentCarouselIdx: 1
  }

  handleAfterChange = (current: number) => {
    this.setState({
      currentCarouselIdx: current + 1
    })
  }
  renderLeft = () => {
    const { prefixCls } = this.props
    const { currentCarouselIdx } = this.state
    const wrapCls = `${prefixCls}__left`
    return (
      <div className={wrapCls}>
        <Carousel autoplay fade dots={false} afterChange={this.handleAfterChange}>
          {BannerList.map((item, index) => (
            <div className={`${wrapCls}__box`} key={index}>
              <img src={item.img} />
              <article>
                <h1 dangerouslySetInnerHTML={{ __html: item.title }}></h1>
                <h6 dangerouslySetInnerHTML={{ __html: item.summary }}></h6>
                <dl>
                  <dt>{currentCarouselIdx}</dt>
                  <dd>/{BannerList.length}</dd>
                </dl>
              </article>
            </div>
          ))}
        </Carousel>
      </div>
    )
  }

  renderRight = () => {
    const { prefixCls } = this.props
    const wrapCls = `${prefixCls}__right`
    return (
      <div className={wrapCls}>
        <TabBox tabs={TabLists} />
      </div>
    )
  }

  render() {
    const { prefixCls } = this.props
    return (
      <div className={prefixCls}>
        <Block.Center>
          {this.renderLeft()}
          {this.renderRight()}
        </Block.Center>
      </div>
    )
  }
}

export default BannerRow
