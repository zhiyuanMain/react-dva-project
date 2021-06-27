import React from 'react'
import { connect } from 'dva'
import { RouteComponentProps } from 'dva/router'
import './index.less'
import { Block } from 'src/components'
import HArticle from './HArticle'

type ArticleProps = RouteComponentProps<{ id?: string }> & {
  prefixCls?: string
}

class Article extends React.Component<ArticleProps & RouteComponentProps, {}> {
  constructor(props: ArticleProps | Readonly<ArticleProps>) {
    super(props)
  }

  static defaultProps = {
    prefixCls: 'article-page'
  }

  render() {
    const { prefixCls, match } = this.props
    return (
      <div className={prefixCls}>
        <Block.Center>
          <HArticle id={match.params.id} />
        </Block.Center>
      </div>
    )
  }
}

export default connect()(Article)
