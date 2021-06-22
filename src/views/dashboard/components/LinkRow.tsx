import { Link } from 'dva/router'
import React from 'react'
import { Block } from 'src/components'
import './LinkRow.less'

const imgList = ['ylrb', 'nyb', 'sxnyt', 'ylgov']

interface LinkRowProps {
  prefixCls?: string
}
class LinkRow extends React.Component<LinkRowProps, {}> {
  constructor(props: LinkRowProps | Readonly<LinkRowProps>) {
    super(props)
  }

  static defaultProps = {
    prefixCls: 'dashboard-page-linkrow'
  }

  renderIntro = () => {
    const { prefixCls } = this.props
    const wrapCls = `${prefixCls}__img`
    return (
      <ul className={wrapCls}>
        {imgList.map((item, index) => (
          <li key={index}>
            <Link to="/">
              <img src={require(`../../../assets/img/${item}-com.png`)} />
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  render() {
    const { prefixCls } = this.props
    return (
      <div className={prefixCls}>
        <Block.Center>
          <Block.Title icon="link" name="友情链接" />
        </Block.Center>
        <Block.Center>{this.renderIntro()}</Block.Center>
      </div>
    )
  }
}

export default LinkRow
