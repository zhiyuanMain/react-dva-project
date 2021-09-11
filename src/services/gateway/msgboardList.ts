import requestProxy from 'src/utils/request'

type MsgItem = {
  a1: string // 姓名
  a2: string // 性别
  body: string // 留言内容
  createTime: number // 创建时间
  reply: string // 回复内容
  replyTime: number // 回复时间
}

export interface ResMsgBoardList {
  totalRow: number
  totalPage: 5
  list: MsgItem[]
}
export const req = (pageNumber: number) =>
  requestProxy<ResMsgBoardList>({
    method: 'get',
    url: `/list/lyb?pageNumber=${pageNumber}&pageSize=25`
  })
