import { RouteComponentProps } from 'dva/router'
import React from 'react'
import queryString from 'query-string'
import QRCode from 'qrcode'
import './index.less'

type ShareProps = RouteComponentProps & {
  prefixCls?: string
}

class Share extends React.Component<ShareProps, {}> {
  private _container: HTMLCanvasElement | null = null
  constructor(props: ShareProps | Readonly<ShareProps>) {
    super(props)
  }
  static defaultProps = {
    prefixCls: 'share-page'
  }
  componentDidMount() {
    this.generateQRCode()
  }
  generateQRCode = () => {
    const { url } = queryString.parse(this.props.location.search)
    if (this._container) {
      QRCode.toCanvas(this._container, url as string, {
        width: 200
      })
    }
  }

  render() {
    const { prefixCls } = this.props
    return (
      <div className={prefixCls}>
        <h5>分享到微信</h5>
        <canvas ref={(e) => (this._container = e)} />
        <p>用微信“扫一扫”，点击右上角分享按钮，即可将网页分享给您的微信好友或朋友圈。</p>
      </div>
    )
  }
}

export default Share
