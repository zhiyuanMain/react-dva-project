import React from 'react'
import './index.less'

interface CodeNodeProps {
  prefixCls?: string
}

interface CodeNodeState {
  timestamp: number
}
class CodeNode extends React.Component<CodeNodeProps, CodeNodeState> {
  constructor(props: CodeNodeProps | Readonly<CodeNodeProps>) {
    super(props)
  }

  static defaultProps = {
    prefixCls: 'codenode-page'
  }

  state: CodeNodeState = {
    timestamp: new Date().getTime()
  }

  handleChange = () => {
    this.setState({
      timestamp: new Date().getTime()
    })
  }
  render() {
    const styles: React.CSSProperties = {
      cursor: 'pointer',
      position: 'absolute',
      top: 2,
      left: 130
    }
    return (
      <img
        style={styles}
        src={`${process.env.API_ASSETS}/yzm?t=${this.state.timestamp}`}
        onClick={this.handleChange}
      />
    )
  }
}

export default CodeNode
