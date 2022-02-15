import React from 'react'
import { Block } from 'src/components'
import './LinkRow.less'

const imgList = [
  { key: 'nyb', url: 'http://www.moa.gov.cn/' },
  { key: 'sxnyt', url: 'http://nynct.shaanxi.gov.cn/' },
  { key: 'ylgov', url: 'http://www.yl.gov.cn/' },
  { key: 'ylrb', url: 'http://www.ylrb.com/' }
]

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
            <a target="_black" href={item.url}>
              <img src={require(`src/assets/img/com-${item.key}.png`)} />
            </a>
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
