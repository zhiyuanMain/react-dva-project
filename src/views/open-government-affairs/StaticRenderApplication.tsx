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
          <RenderContent type="subtitle" content="一、受理依据" />
          <RenderContent
            type="article"
            content="（一）按照《中华人民共和国政府信息公开条例》（以下简称《条例》）的有关规定，您可以在本栏目向本机关申请获取市政府或市政府办公室制作或保存的政府信息。"
          />
          <RenderContent type="article" content="（二）申请公开的信息类型：" />
          <RenderContent type="article" content="1、应主动公开而没有公开的政府信息；" />
          <RenderContent type="article" content="主动公开的信息包括：" />
          <RenderContent type="article" content="（1)行政法规、规章和规范性文件；" />
          <RenderContent
            type="article"
            content="（2)机关职能、机构设置、办公地址、办公时间、联系方式、负责人姓名；"
          />
          <RenderContent
            type="article"
            content="（3)国民经济和社会发展规划、专项规划、区域规划及相关政策；"
          />
          <RenderContent
            type="article"
            content="（3)国民经济和社会发展规划、专项规划、区域规划及相关政策；"
          />
          <RenderContent type="article" content="（4)国民经济和社会发展统计信息；" />
          <RenderContent
            type="article"
            content="（5)办理行政许可和其他对外管理服务事项的依据、条件、程序以及办理结果；"
          />
          <RenderContent
            type="article"
            content="（6)实施行政处罚、行政强制的依据、条件、程序以及本行政机关认为具有一定社会影响的行政处罚决定；"
          />
          <RenderContent type="article" content="（7)财政预算、决算信息；" />
          <RenderContent type="article" content="（8)行政事业性收费项目及其依据、标准；" />
          <RenderContent type="article" content="（9)政府集中采购项目的目录、标准及实施情况；" />
          <RenderContent type="article" content="（10)重大建设项目的批准和实施情况；" />
          <RenderContent
            type="article"
            content="（11)扶贫、教育、医疗、社会保障、促进就业等方面的政策、措施及其实施况；"
          />
          <RenderContent
            type="article"
            content="（12)突发公共事件的应急预案、预警信息及应对情况；"
          />
          <RenderContent
            type="article"
            content="（13)环境保护、公共卫生、安全生产、食品药品、产品质量的监督检查情况；"
          />
          <RenderContent
            type="article"
            content="（14)公务员招考的职位、名额、报考条件等事项以及录用结果；"
          />
          <RenderContent
            type="article"
            content="（15)市政建设、公共服务、公益事业、土地征收、房屋征收、治安管理、社会救助等方面的政府信息；"
          />
          <RenderContent
            type="article"
            content="（16)法律、法规、规章和国家有关规定规定应当主动公开的其他政府信息。"
          />
          <RenderContent
            type="article"
            content="２、其它政府信息（包括与申请者本人相关的政府信息）。"
          />
          <RenderContent type="article" content="（三）不予公开的政府信息：" />
          <RenderContent type="article" content="1、国家秘密；" />
          <RenderContent
            type="article"
            content="2、法律、行政法规禁止公开的政府信息，以及公开后可能危及国家安全、公共安全、经济安全、社会稳定的政府信息；"
          />
          <RenderContent
            type="article"
            content="3、涉及商业秘密、个人隐私等公开会对第三方合法权益造成损害的政府信息；"
          />
          <RenderContent
            type="article"
            content="4、行政机关的内部事务信息，包括人事管理、后勤管理、内部工作流程等方面的信息；"
          />
          <RenderContent
            type="article"
            content="5、行政机关在履行行政管理职能过程中形成的讨论记录、过程稿、磋商信函、请示报告等过程性信息以及行政执法案卷信息。"
          />
          <RenderContent type="subtitle" content="二、申请公开受理流程" />
          <RenderContent type="subtitle" content="三、说明" />
          <RenderContent
            type="article"
            content="（一）根据《条例》及相关规定，我市政府及政府办公室已主动公开大量政府信息。建议您在填写政府信息公开申请表之前，先通过市政府门户网站使用检索功能进行查找。如果没有查询到所需的政府信息，请您提交政府信息公开申请；"
          />
          <RenderContent
            type="article"
            content="（二）本平台仅受理政府信息公开事宜。涉及到信访、投诉、举报等问题，请通过市政府门户网站“网上信访”、“市长信箱”、“咨询投诉”等栏目或者纪检渠道反映。 "
          />
          <RenderContent
            type="article"
            content="（三）申请公开的政府信息，应该是已制作或者获取的信息，不包括需要进行加工、分析的政府信息。 "
          />
          <RenderContent
            type="article"
            content="（四）为提高工作效率，方便申请人尽快获取所申请公开的信息，请采取“一事一申请”方式提出，即一个政府信息公开申请只对应一个政府信息项目。 "
          />
          <RenderContent
            type="article"
            content="（五）申请公开的政府信息的内容描述应当明确需要获取的政府信息的名称、文号或者便于行政机关查询的其他特征性描述，尽量避免使用如XXX等信息、XXX所有信息、XXX相关信息等模糊性描述。 "
          />
          <RenderContent
            type="article"
            content="（六）本机关已就申请人提出的政府信息公开申请作出答复、申请人重复申请公开相同政府信息的，不予重复处理； "
          />
          <RenderContent
            type="article"
            content="（七）本机关自收到《申请表》之日起20个工作日内予以答复，需要延长答复期限的，经本机关负责人同意并将告知申请人，延长的期限最长不超过20个工作日。 "
          />
          <RenderContent type="article" content="（八）附件下载：" />
          <RenderContent type="article" content="1.受理依申请政府信息公开表格下载.doc " />
          <RenderContent type="article" content="咨询电话：0912-3895356 （可传真）" />
        </section>
        <section className={`${prefixCls}__linkrow`}>
          <Button type="primary" disabled={currentCount > 0}>
            {currentCount ? `${currentCount}s 我要申请` : <Link to="/">我要申请</Link>}
          </Button>
        </section>
      </div>
    )
  }
}

export default StaticRenderApplication
