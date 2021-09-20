import React from 'react'
import queryString from 'query-string'
import { connect } from 'dva'
import { Block } from 'src/components'
import './index.less'
import gateway from 'src/services/gateway'
import PanelList, { PanelListItem } from 'src/components/panel-list'
import { formatTime } from 'src/utils/helper'
import { Empty } from 'antd'

interface SearchProps {
  prefixCls?: string
  history: any
}

interface SearchState {
  keyword: string
  list: PanelListItem[]
}
class Search extends React.Component<SearchProps, SearchState> {
  constructor(props: SearchProps | Readonly<SearchProps>) {
    super(props)
  }

  static defaultProps = {
    prefixCls: 'search-page'
  }

  state: SearchState = {
    list: [],
    keyword: ''
  }

  componentDidMount() {
    this.getData()
  }

  componentDidUpdate() {
    const currentKeyword = this.getKeyword(this.props.history)
    if (currentKeyword !== this.state.keyword) {
      this.getData()
    }
  }

  getData = () => {
    const currentKeyword = this.getKeyword(this.props.history) || ''
    gateway.search.req(currentKeyword).then((res) => {
      this.setState({
        list: res.list.map((item) => ({
          url: item.to,
          id: item.id,
          time: formatTime(item.publishTime),
          title: item.title
        })),
        keyword: currentKeyword
      })
    })
  }

  getKeyword = (currentHistory: any): string => {
    return queryString.parse(currentHistory.location.search).keyword as string
  }

  render() {
    const { prefixCls } = this.props
    return (
      <Block.Center>
        <div className={prefixCls}>
          {this.state.list.length ? <PanelList list={this.state.list} /> : <Empty />}
        </div>
      </Block.Center>
    )
  }
}

export default connect()(Search)
