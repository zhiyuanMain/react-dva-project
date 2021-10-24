import { Breadcrumb, Spin } from 'antd'
import classNames from 'classnames'
import { Link } from 'dva/router'
import React from 'react'
import gateway from 'src/services/gateway'
import { Vote } from 'src/services/gateway/article'
import { formatTime } from 'src/utils/helper'
import './HArticle.less'
import HVotes from './HVotes'

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
  isLoading: boolean
  breadcrumb: BreadcrumbListItem[]
  title: string
  info: Info
  body: string
  refs: {
    prev: Partial<RefInfo>
    next: Partial<RefInfo>
  }
  // 投票相关信息
  voteRef: {
    list: Vote[]
    status: string
    beginTime: number
    endTime: number
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
    isLoading: true,
    breadcrumb: [],
    title: '',
    info: {
      time: '',
      count: 0,
      src: '',
      author: ''
    },
    body: '',
    refs: {
      prev: {},
      next: {}
    },
    voteRef: {
      list: [],
      status: '',
      beginTime: new Date().getTime(),
      endTime: new Date().getTime()
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
          isLoading: true,
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
          body: res.body || '',
          voteRef: {
            status: res.tpzt || '',
            list: res.votes || [],
            beginTime: res.publishTime || new Date().getTime(),
            endTime: res.updateTime || new Date().getTime()
          }
        },
        () => {
          // 请求上一篇下一篇
          gateway.articleRef.req(res.columnId, this.props.id).then((rres) => {
            const prevItem = rres.find((item) => item.sort === '0')
            const nextItem = rres.find((item) => item.sort === '1')
            this.setState(
              {
                refs: {
                  prev: prevItem ? { title: prevItem.title, id: prevItem.id } : {},
                  next: nextItem ? { title: nextItem.title, id: nextItem.id } : {}
                }
              },
              () => {
                setTimeout(() => {
                  this.setState({ isLoading: false })
                  if (!this.state.voteRef.list.length) {
                    this.fillContent(this.state.body)
                  }
                }, 300)
              }
            )
          })
        }
      )
    })
  }

  fillContent = (content: string) => {
    const containerDivs = document.getElementsByClassName('_ARTICLE_PAGE_')[0]
    const range = document.createRange()
    // // make the parent of the first div in the document becomes the context node
    range.selectNode(containerDivs)
    const documentFragment = range.createContextualFragment(content)
    const containerMain = document.getElementById('_ARTICLE_PAGE_main')
    containerMain?.appendChild(documentFragment)
  }

  renderRow = (rowCls: string, content: React.ReactNode) => {
    const { prefixCls } = this.props
    const { voteRef } = this.state
    const { list } = voteRef
    const isMainBox = rowCls === 'main'
    const wrapCls = classNames([`${prefixCls}__${rowCls}`, isMainBox ? '_ARTICLE_PAGE_' : ''])
    return (
      <div className={wrapCls} id={`_ARTICLE_PAGE_${rowCls}`}>
        {isMainBox && list.length ? <HVotes list={list} onAfterSuccess={this.getData} /> : content}
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
    const { info, voteRef } = this.state
    const { list, status, beginTime, endTime } = voteRef
    const content = list.length ? (
      <HVotes.Breadcrumb
        status={status}
        beginTime={beginTime}
        endTime={endTime}></HVotes.Breadcrumb>
    ) : (
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
    if (this.state.isLoading) {
      return (
        <div className={prefixCls}>
          <div className={`${prefixCls}__spin`}>
            <Spin></Spin>
          </div>
        </div>
      )
    }
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
