import { Breadcrumb } from 'antd'
import classNames from 'classnames'
import { Link } from 'dva/router'
import React from 'react'
import gateway from 'src/services/gateway'
import { formatTime } from 'src/utils/helper'
import './HArticle.less'

interface HArticleProps {
  prefixCls?: string
  id: string
  shouldRenderBreadcrumb?: boolean
  shouldRenderInfo?: boolean
  shouldRenderFooter?: boolean
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
    prefixCls: 'article-page-harticle',
    shouldRenderBreadcrumb: true,
    shouldRenderInfo: true,
    shouldRenderFooter: true
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
    this.getData()
  }

  componentDidUpdate(prevProps: HArticleProps) {
    if (this.props.id !== prevProps.id) {
      this.getData()
    }
  }

  getData = () => {
    // 获取文章内容
    gateway.article.req(this.props.id).then((res) => {
      this.setState(
        {
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
          main: res.body
        },
        () => {
          // 请求上一篇下一篇
          gateway.articleRef.req(res.columnId, this.props.id).then((rres) => {
            const prevItem = rres.find((item) => item.sort === '0')
            const nextItem = rres.find((item) => item.sort === '1')
            this.setState({
              refs: {
                prev: prevItem ? { title: prevItem.title, id: prevItem.id } : {},
                next: nextItem ? { title: nextItem.title, id: nextItem.id } : {}
              }
            })

            const containerDivs = document.getElementsByClassName('_ARTICLE_PAGE_')[0]
            const range = document.createRange()
            // // make the parent of the first div in the document becomes the context node
            range.selectNode(containerDivs)
            const documentFragment = range.createContextualFragment(res.body)
            const containerMain = document.getElementById('_ARTICLE_PAGE_main')
            containerMain?.appendChild(documentFragment)
          })
        }
      )
    })
  }

  renderRow = (rowCls: string, content: React.ReactNode) => {
    const { prefixCls } = this.props
    const isMainBox = rowCls === 'main'
    const wrapCls = classNames([`${prefixCls}__${rowCls}`, isMainBox ? '_ARTICLE_PAGE_' : ''])
    return (
      <div className={wrapCls} id={`_ARTICLE_PAGE_${rowCls}`}>
        {content}
      </div>
    )
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
    return this.renderRow('main', null)
  }
  renderFooter = () => {
    const { refs } = this.state
    const renderLink = (data: Partial<RefInfo>, spanText: string, type: 'prev' | 'next') =>
      data && Object.keys(data || {}).length ? (
        <span>
          【{spanText}】
          <Link to={`/article/${refs[type].id}`} title={refs[type].title}>
            {refs[type].title}
          </Link>
        </span>
      ) : (
        <span />
      )
    const content = (
      <React.Fragment>
        {renderLink(refs.prev, '上一篇', 'prev')}
        {renderLink(refs.next, '下一篇', 'next')}
      </React.Fragment>
    )
    return this.renderRow('footer', content)
  }

  render() {
    const { prefixCls, shouldRenderBreadcrumb, shouldRenderFooter, shouldRenderInfo } = this.props
    return (
      <div className={prefixCls}>
        {shouldRenderBreadcrumb && this.renderBreadcrumb()}
        {this.renderTitle()}
        {shouldRenderInfo && this.renderInfo()}
        {this.renderMain()}
        {shouldRenderFooter && this.renderFooter()}
      </div>
    )
  }
}

export default HArticle
