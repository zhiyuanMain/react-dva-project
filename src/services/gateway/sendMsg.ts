import requestProxy from 'src/utils/request'
interface ReqParams {
  columnId: string
  title: string
  a1: string // 姓名
  a2: string // 性别
  a3: string // qq号
  a4: string // 邮箱
  a5: string // 手机号
  typeid: string | number // 类别
  body: string // 留言内容
  yzm: string // 验证码
}

export const req = (data: ReqParams) => {
  return requestProxy<any>({
    method: 'post',
    filter: false,
    url: '/message/send',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    data: { ...data }
  })
}
