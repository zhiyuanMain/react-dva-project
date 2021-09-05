import requestProxy from 'src/utils/request'
import { LinkItem } from './index'

export type Path = {
  path: string
  title: string
}
export interface ResArticle extends LinkItem {
  author: string
  body: string
  paths: Path[]
  source: string
  totalView: number
}
export const req = (id: string | number) =>
  requestProxy<ResArticle>({
    method: 'get',
    url: `/article/${id}`
  })
