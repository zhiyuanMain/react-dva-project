import requestProxy from 'src/utils/request'
export interface SendApplicationReqParams {
  alcType: string // 公民、法人或者其他组织
  alcName: string // 姓名
  alcWorkUnit: string // 工作单位
  alcCertType: string // 证件名称
  alcCertCode: string // 证件号码
  alcAttachmentFront: any // 证件扫描件正面 --文件
  alcAttachmentReide: any // 证件扫描件反面 --文件
  alcTelPhone: string // 联系电话
  alcFax: string // 联系传真
  alcPhone: string // 手机号码
  alcMail: string // 电子邮箱
  alcAddress: string // 通讯地址
  alcPostcode: string // 邮政编码
  infoDesc: string // 所需信息描述
  infoTarget: string // 用途描述
  infoPublic: string // 是否公开
  infoProvider: string // 信息的制定提供方式
}

export const req = (data: SendApplicationReqParams) => {
  return requestProxy<any>({
    method: 'post',
    filter: false,
    url: '/according2application',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    data: { ...data }
  })
}
