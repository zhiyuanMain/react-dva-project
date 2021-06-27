import { Link } from 'dva/router'
import React from 'react'
import { Block, PanelList } from 'src/components'
import './GroupRow.less'
import { mockPanelList } from './_utils'

const imgList = ['leader', 'function', 'bureau', 'company', 'plan']
interface GroupRowProps {
  prefixCls?: string
}
class GroupRow extends React.Component<GroupRowProps, {}> {
  constructor(props: GroupRowProps | Readonly<GroupRowProps>) {
    super(props)
  }

  static defaultProps = {
    prefixCls: 'dashboard-page-grouprow'
  }

  renderIntro = () => {
    const { prefixCls } = this.props
    const wrapCls = `${prefixCls}__img`
    return (
      <ul className={wrapCls}>
        {imgList.map((item, index) => (
          <li key={index}>
            <Link to={`/channel/${item}`}>
              <img src={require(`src/assets/img/intro-${item}.png`)} />
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  renderInfo = () => {
    const { prefixCls } = this.props
    const wrapCls = `${prefixCls}__info`
    return (
      <div className={wrapCls}>
        <div className={`${wrapCls}__block`}>
          <PanelList shouldRenderTime={true} list={[...mockPanelList('市农业局', 10)]} />
        </div>
        <div className={`${wrapCls}__block`}>
          <PanelList shouldRenderTime={true} list={[...mockPanelList('区政府工作报告', 10)]} />
        </div>
      </div>
    )
  }
  render() {
    const { prefixCls } = this.props
    return (
      <div className={prefixCls}>
        <Block.Center>
          <Block.Title icon="group" name="政务公开" />
        </Block.Center>
        <Block.Center>{this.renderIntro()}</Block.Center>
        <Block.Center>{this.renderInfo()}</Block.Center>
      </div>
    )
  }
}

export default GroupRow
