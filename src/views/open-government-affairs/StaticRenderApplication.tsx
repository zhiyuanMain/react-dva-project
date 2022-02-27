import React from 'react'
import { Button } from 'antd'

import './StaticRenderApplication.less'
import { Link } from 'dva/router'
type RenderContentProps = {
  type: 'title' | 'subtitle' | 'article'
  content: string
}
const RenderContent: React.FC<RenderContentProps> = (props: RenderContentProps) => (
  <div className={`staticrender-application__${props.type}`}>{props.content}</div>
)
interface StaticRenderApplicationProps {
  prefixCls?: string
}
interface StaticRenderApplicationState {
  currentCount: number
}
class StaticRenderApplication extends React.Component<
  StaticRenderApplicationProps,
  StaticRenderApplicationState
> {
  private _timer: NodeJS.Timeout | null = null
  constructor(props: StaticRenderApplicationProps | Readonly<StaticRenderApplicationProps>) {
    super(props)
  }

  static defaultProps = {
    prefixCls: 'staticrender-application'
  }
  state: StaticRenderApplicationState = {
    currentCount: 5
  }

  componentDidMount() {
    this._timer = setInterval(() => {
      if (this.state.currentCount > 0) {
        this.setState((prev) => ({
          currentCount: prev.currentCount - 1
        }))
      } else {
        this._timer && clearInterval(this._timer)
      }
    }, 1000)
  }

  componentWillUnmount() {
    if (this._timer) {
      clearInterval(this._timer)
      this._timer = null
    }
  }

  render() {
    const { prefixCls } = this.props
    const { currentCount } = this.state
    return (
      <div className={prefixCls}>
        <RenderContent type="title" content="依申请公开信息说明" />
        <section className={`${prefixCls}__showbox`}>
          <RenderContent
            type="subtitle"
            content="公民、法人或者其他组织可根据自身生产、生活、科研等特殊需要，向榆林市农业农村局申请获取主动公开以外的政府信息。依据《中华人民共和国政府信息公开条例》精神，行政机关一般不承担为申请人汇总、加工或重新制作政府信息，以及向其他行政机关和公民、法人或者其他组织搜集信息的义务。"
          />
          <RenderContent type="article" content="一、受理机构" />
          <RenderContent
            type="article"
            content="榆林市农业农村局受理政府信息公开申请机构为榆林市农业农村局政秘科。"
          />
          <RenderContent
            type="article"
            content="办公时间：上午8：00-12：00，下午14：00-17：30（7月1日至8月31日下午15：00-18：00，法定节假日除外）。"
          />
          <RenderContent
            type="article"
            content="办公地址：陕西省榆林市榆阳区榆林大道158号农业大厦四楼。"
          />
          <RenderContent
            type="article"
            content="通讯地址：陕西省榆林市榆阳区榆林大道158号农业大厦"
          />
          <RenderContent type="article" content="邮编：719000" />
          <RenderContent type="article" content="电话：0912--6662688" />
          <RenderContent type="article" content="传真：0912—6662688" />
          <RenderContent type="article" content="二、申请步骤" />
          <RenderContent type="article" content="（一）提交申请" />
          <RenderContent
            type="article"
            content="申请人填写《榆林市农业农村局依申请公开政府信息申请表》（以下简称《申请表》），提出申请；也可以在我局门户网站进行网上申请。《申请表》可以从本局门户网站下载，也可以到本局政府信息公开工作办公室（政秘科）领取。《申请表》应填写完整，内容真实有效。"
          />
          <RenderContent
            type="article"
            content="申请人应出示有效身份证明，提交身份证明复印件，并对申请材料的真实性负责；对所需信息描述详尽、准确，尽可能提供该信息的标题、发布时间、文号或者其他有助于确定信息载体的提示。"
          />
          <RenderContent type="article" content="（二）申请方式" />
          <RenderContent
            type="article"
            content="公民、法人或者其他组织可采用书面形式（包括数据电文形式）向榆林市农业农村局申请获取政府信息。采用书面形式确有困难的，申请人可口头提出，由受理机构代为填写政府信息公开申请。申请人可现场递交申请，也可通过信函、传真、电子邮件等方式递交填写完整的《申请表》。通过信函方式提出申请的，采用特快专递或挂号信方式投寄，并在信封左下角注明“政府信息公开申请”字样；通过传真方式提出申请的，请在传真左上角注明“政府信息公开申请”字样；通过电子邮件方式提出申请的，请在邮件主题中注明“政府信息公开申请”字样，邮箱地址：647247781@qq.com；申请人也可通过市农业农村局门户网站，在政府信息公开栏目下“依申请公开”子栏目里填写有关信息后进行网上申请。"
          />
          <RenderContent type="article" content="（三）受理程序" />
          <RenderContent
            type="article"
            content="榆林市农业农村局收到《申请表》或网上申请后，按程序进行审查。"
          />
          <RenderContent
            type="article"
            content="对申请信息填写完整且有关证明材料齐全的申请正式登记受理。能够当场答复的，当场予以答复；不能当场答复的，自收到申请（指可以正式受理的申请）之日起20个工作日内予以答复。需延长答复期限的，书面告知申请人，延长答复的期限最长不超过20个工作日。申请公开的政府信息涉及第三方权益的，榆林市农业农村局征求第三方意见所需时间不计算在上述规定期限内。"
          />
          <RenderContent
            type="article"
            content="对申请信息填写不完整、内容不明确或未按要求提供有关证明材料的申请，将要求补充或更正。如申请公开的政府信息不存在或者不属于公开范围的，应书面说明不予公开的理由。"
          />
          <RenderContent type="article" content="三、不予公开的政府信息" />
          <RenderContent type="article" content="1.属于国家秘密的；" />
          <RenderContent type="article" content="2.属于工作秘密、内部资料和个人隐私的；" />
          <RenderContent
            type="article"
            content="3.在未作出具体行政行为之前予以公开，可能影响国家利益、公共利益和执法活动的；"
          />
          <RenderContent type="article" content="4.法律、法规和规章规定免予公开的其他政府信息。" />
        </section>
        <section className={`${prefixCls}__linkrow`}>
          <Button type="primary" disabled={currentCount > 0}>
            {currentCount ? `${currentCount}s 我要申请` : <Link to="/application">我要申请</Link>}
          </Button>
        </section>
      </div>
    )
  }
}

export default StaticRenderApplication
