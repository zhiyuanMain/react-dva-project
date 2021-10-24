import requestProxy from 'src/utils/request'
import { LinkItem } from './index'
import printLog from '../../utils/log'

export type Path = {
  path: string
  title: string
}

export type Vote = {
  articleId: string
  createTime: number
  id: string
  items: VoteItem[]
  title: string
  totalNum: number
  type: number
}

export type VoteItem = {
  id: string
  name: string
  num: number
  per: number
  voteId: string
}
export interface ResArticle extends LinkItem {
  author: string
  body?: string
  columnId: string
  describe: string
  paths: Path[]
  source: string
  totalView: number
  votes?: Vote[]
  tpzt?: string
  publishTime: number
  updateTime: number
}
export const req = async (id: string | number) => {
  const res = await requestProxy({
    method: 'get',
    url: `/articleView/${id}`
  })
  printLog.success('view add', res)
  return requestProxy<ResArticle>({
    method: 'get',
    url: `/article/${id}`
  })
}
