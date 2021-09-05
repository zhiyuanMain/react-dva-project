import { Breadcrumb } from 'antd'
import { Link } from 'dva/router'
import React from 'react'
import gateway from 'src/services/gateway'
import { formatTime } from 'src/utils/helper'
import './HArticle.less'

interface HArticleProps {
  prefixCls?: string
  id: string
}
type BreadcrumbListItem = {
  title: string
  path?: string
  category: 'text' | 'link'
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

const BreadcrumbListItemMock: BreadcrumbListItem = {
  title: '正文',
  category: 'text'
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
    gateway.article.req(this.props.id).then((res) => {
      this.setState({
        breadcrumb: res.paths.map((item) => ({
          category: 'link',
          title: item.title,
          path: item.path
        })),
        title: res.title,
        info: {
          time: formatTime(res.publishTime),
          count: res.totalView,
          src: res.source,
          author: res.author
        },
        main: res.body,
        refs: {
          prev: { title: '榆林市蚕桑工作站', id: 'prev123' },
          next: { title: '榆林市蚕桑工作站', id: 'next123' }
        }
      })
    })
  }

  renderRow = (rowCls: string, content: React.ReactNode) => {
    const { prefixCls } = this.props
    const wrapCls = `${prefixCls}__${rowCls}`
    return <div className={wrapCls}>{content}</div>
  }

  renderBreadcrumb = () => {
    const { breadcrumb } = this.state
    const glist = [...breadcrumb, { ...BreadcrumbListItemMock }]
    const content = (
      <Breadcrumb>
        {glist.map((item, index) => (
          <Breadcrumb.Item key={index}>
            {item.category === 'text' ? (
              `${item.title}`
            ) : (
              <Link to={item.path as string}>{item.title}</Link>
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
