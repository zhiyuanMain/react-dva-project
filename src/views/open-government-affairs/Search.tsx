import { Input } from 'antd'
import React from 'react'
import './Search.less'

interface SearchProps {
  prefixCls?: string
}
class Search extends React.Component<SearchProps, {}> {
  constructor(props: SearchProps | Readonly<SearchProps>) {
    super(props)
  }

  static defaultProps = {
    prefixCls: 'open-government-affairs-page__searchrow'
  }

  handleSearch = (e: string) => {
    console.log(e)
  }

  render() {
    return (
      <div className={this.props.prefixCls}>
        <Input.Search style={{ width: 510, borderRadius: 9 }} onSearch={this.handleSearch} />
      </div>
    )
  }
}

export default Search
