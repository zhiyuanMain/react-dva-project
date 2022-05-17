import React from 'react'
import { Carousel } from 'antd'
import { Block, TabBox } from 'src/components'
import './BannerRow.less'
import { convertLinkData, TabItem } from 'src/components/tab-box'
import gateway from 'src/services/gateway'
import { Link } from 'dva/router'
import bannerImg from 'src/assets/img/banner-img.jpg'
import moment from 'moment'
import { PlusCircleOutlined } from '@ant-design/icons'
interface BannerRowProps {
  prefixCls?: string
}

interface BannerRowState {
  currentCarouselIdx: number
  bannerList: api.BannerList
  newsList: TabItem[]
  legalimgVisible: boolean
}
class BannerRow extends React.Component<BannerRowProps, BannerRowState> {
  constructor(props: BannerRowProps | Readonly<BannerRowProps>) {
    super(props)
  }

  static defaultProps = {
    prefixCls: 'dashboard-page-bannerrow'
  }

  state: BannerRowState = {
    currentCarouselIdx: 1,
    bannerList: [],
    newsList: [],
    legalimgVisible: true
  }

  componentDidMount() {
    gateway.banner.req().then((res) => {
      this.setState({
        bannerList: [...res.bannerInfo]
      })
    })
    gateway.news.req().then((res) => {
      this.setState({
        newsList: [
          { tabTitle: '要闻新闻', list: convertLinkData([...res.realtimeNews]), type: 'zxyw' },
          { tabTitle: '最新通知', list: convertLinkData([...res.noticeMsg]), type: 'tzgg' },
          { tabTitle: '区县动态', list: convertLinkData([...res.qxdt]), type: 'qxdt' },
          { tabTitle: '党风廉政', list: convertLinkData([...res.dflz]), type: 'dflz' }
        ]
      })
    })
  }

  handleAfterChange = (current: number) => {
    this.setState({
      currentCarouselIdx: current + 1
    })
  }
  renderLeft = () => {
    const { prefixCls } = this.props
    const { currentCarouselIdx, bannerList } = this.state
    const wrapCls = `${prefixCls}__left`
    return (
      <div className={wrapCls}>
        <Carousel autoplay fade dots={false} afterChange={this.handleAfterChange}>
          {bannerList.map((item) => (
            <div className={`${wrapCls}__box`} key={item.id}>
              <Link to={item.to}>
                {/* <img src={item.img} /> */}
                <img src={item.img} />

                <article>
                  <h1 dangerouslySetInnerHTML={{ __html: item.title }}></h1>
                  <dl>
                    <dt>{currentCarouselIdx}</dt>
                    <dd>/{bannerList.length}</dd>
                  </dl>
                </article>
              </Link>
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
        <TabBox tabs={this.state.newsList} height={300} />
      </div>
    )
  }

  renderImg = () => {
    const { prefixCls } = this.props
    const wrapCls = `${prefixCls}__img`
    const today = moment(new Date())
    const endday = moment(new Date('2022-8-7'))
    const diff = endday.diff(today, 'days')
    if (diff <= 0) return null
    return (
      <a className={wrapCls} target="_blank" href="https://17.ylrb.com/" rel="noreferrer">
        <img src={bannerImg} />
        <span>{diff}</span>
      </a>
    )
  }

  renderLegalimg = () => {
    const { prefixCls } = this.props
    const wrapCls = `${prefixCls}__legalimg`
    if (!this.state.legalimgVisible) return null
    return (
      <section className={wrapCls}>
        <PlusCircleOutlined
          style={{
            color: '#383d42',
            transform: 'rotateZ(45deg)',
            paddingRight: 4,
            cursor: 'pointer'
          }}
          onClick={() => {
            this.setState({
              legalimgVisible: false
            })
          }}
        />
        <img src={require('src/assets/img/banner-legal.jpg')} />
      </section>
    )
  }

  render() {
    const { prefixCls } = this.props
    return (
      <div className={prefixCls}>
        <Block.Center>
          {this.renderLegalimg()}
          {this.renderLeft()}
          {this.renderRight()}
          {this.renderImg()}
        </Block.Center>
      </div>
    )
  }
}

export default BannerRow
