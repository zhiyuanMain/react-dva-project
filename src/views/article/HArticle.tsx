import { Breadcrumb } from 'antd'
import { Link } from 'dva/router'
import React from 'react'
import './HArticle.less'

interface HArticleProps {
  prefixCls?: string
  id?: string
}
type BreadcrumbListItem = {
  category: string
  categoryName: string
}

type Info = {
  time: string
  count: number
  src: string
  author: string
}

type RefInfo = {
  title: string
  id: number | string
}
interface HArticleState {
  breadcrumb: BreadcrumbListItem[]
  title: string
  info: Info
  main: string
  refs: {
    prev: Partial<RefInfo>
    next: Partial<RefInfo>
  }
}
class HArticle extends React.Component<HArticleProps, HArticleState> {
  constructor(props: HArticleProps | Readonly<HArticleProps>) {
    super(props)
  }

  static defaultProps = {
    prefixCls: 'article-page-harticle'
  }

  state: HArticleState = {
    breadcrumb: [],
    title: '',
    info: {
      time: '',
      count: 0,
      src: '',
      author: ''
    },
    main: '',
    refs: {
      prev: {},
      next: {}
    }
  }

  componentDidMount() {
    this.setState({
      breadcrumb: [
        { category: 'dashboard', categoryName: '首页' },
        { category: 'channel', categoryName: '政务公开' },
        { category: 'channel', categoryName: '直属单位' },
        { category: 'text', categoryName: '正文' }
      ],
      title: '榆林市农业科技试验示范中心',
      info: {
        time: '2018-07-19 10:07:00',
        count: 1259,
        src: '新闻联播',
        author: '李娜娜'
      },
      main: '<p style="text-indent:43px"><span style="font-size: 21px; font-family: 仿宋;">榆林市农业科技试验示范中心是隶属于榆林市农业局的财政差额事业单位，前身是榆林市原种场，2011年12月更名为榆林市农业科技试验示范中心。单位现有职工21人，其中专业技术人员13人。总土地面积780亩，耕地600亩，其中水浇地480亩，旱台地120亩；固定资产1219多万元，其中，办公室13间，共650平方米，新建培训室6间，共300平方米；连栋智能温室两座，占地20亩；高标准日光温室24座，占地80亩；塑料大棚46个，占地80亩；蓄水池500ｍ3、300ｍ3各1座；职工文体活动广场一处，占地2100m2；果蔬冷藏库3间，容积150吨，占地750m3;果蔬整理加工车间1间,占地100m2；种养殖一体化蓄肥池1座，库容252m3；多功能会议室、党员活动室和业务培训室各1间，总面积270m2。</span></p> <video autoplay loop src="https://www.w3school.com.cn/i/movie.ogg" />',
      refs: {
        prev: { title: '榆林市蚕桑工作站', id: 'prev123' },
        next: { title: '榆林市蚕桑工作站', id: 'next123' }
      }
    })
  }

  renderRow = (rowCls: string, content: React.ReactNode) => {
    const { prefixCls } = this.props
    const wrapCls = `${prefixCls}__${rowCls}`
    return <div className={wrapCls}>{content}</div>
  }

  renderBreadcrumb = () => {
    const { breadcrumb } = this.state
    const content = (
      <Breadcrumb>
        {breadcrumb.map((item, index) => (
          <Breadcrumb.Item key={index}>
            {item.category === 'text' ? (
              `${item.categoryName}`
            ) : item.category === 'dashboard' ? (
              <Link to={'/dashboard'}>{item.categoryName}</Link>
            ) : (
              <Link to={`/channel/${item.category}`}>{item.categoryName}</Link>
            )}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    )
    return this.renderRow('breadcrumb', content)
  }
  renderTitle = () => {
    const { title } = this.state
    const content = <h1>{title}</h1>
    return this.renderRow('title', content)
  }
  renderInfo = () => {
    const { info } = this.state
    const content = (
      <React.Fragment>
        <span>{info.time}</span>
        <span>点击：{info.count}</span>
        <span>来源：{info.src}</span>
        {info.author ? <span>作者：{info.author}</span> : null}
      </React.Fragment>
    )
    return this.renderRow('info', content)
  }
  renderMain = () => {
    const { main } = this.state
    const content = <div dangerouslySetInnerHTML={{ __html: main }}></div>
    return this.renderRow('main', content)
  }
  renderFooter = () => {
    const { refs } = this.state
    const renderLink = (data: Partial<RefInfo>, spanText: string) =>
      data && Object.keys(data || {}).length ? (
        <span>
          【{spanText}】<Link to={`/article/${refs.prev.id}`}>{refs.prev.title}</Link>
        </span>
      ) : (
        <span />
      )
    const content = (
      <React.Fragment>
        {renderLink(refs.prev, '上一篇')}
        {renderLink(refs.next, '下一篇')}
      </React.Fragment>
    )
    return this.renderRow('footer', content)
  }

  render() {
    return (
      <div className={this.props.prefixCls}>
        {this.renderBreadcrumb()}
        {this.renderTitle()}
        {this.renderInfo()}
        {this.renderMain()}
        {this.renderFooter()}
      </div>
    )
  }
}

export default HArticle
