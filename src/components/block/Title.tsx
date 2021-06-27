import React from 'react'
import { tuple } from 'src/utils/type'
import { BlockProps } from './index'
import './Title.less'

const IconTypes = tuple('group', 'online', 'link')
// eslint-disable-next-line
interface TitleProps extends BlockProps {
  icon?: typeof IconTypes[number]
  name: string
}
class Title extends React.Component<TitleProps, {}> {
  constructor(props: TitleProps | Readonly<TitleProps>) {
    super(props)
  }

  static defaultProps = {
    prefixCls: 'suprc-block-title'
  }

  render() {
    const { prefixCls, name, icon } = this.props
    return (
      <div className={prefixCls}>
        <img src={require(`src/assets/img/${icon}.png`)} />
        <h1>{name}</h1>
      </div>
    )
  }
}

export default Title
