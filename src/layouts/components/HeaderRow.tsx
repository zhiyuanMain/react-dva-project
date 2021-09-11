import React from 'react'
import { Block } from 'src/components'
import { getCurrentTime } from 'src/utils/helper'
import './HeaderRow.less'

interface HeaderProps {
  prefixCls?: string
}
interface HeaderState {
  currentTime: string
}
class Header extends React.Component<HeaderProps, HeaderState> {
  timer: NodeJS.Timeout | undefined
  constructor(props: HeaderProps | Readonly<HeaderProps>) {
    super(props)
  }

  static defaultProps = {
    prefixCls: 'suprlc-headerrow'
  }

  state = {
    currentTime: getCurrentTime()
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        currentTime: getCurrentTime()
      })
    }, 1000)
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }

  render() {
    const { prefixCls } = this.props
    const { currentTime } = this.state
    return (
      <div className={prefixCls}>
        <Block.Center>
          <h1>欢迎光临榆林市农业农村网</h1>
          <h2>{currentTime}</h2>
        </Block.Center>
      </div>
    )
  }
}

export default Header
