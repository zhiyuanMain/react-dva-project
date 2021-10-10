import requestProxy from 'src/utils/request'
import { LinkItem } from './index'
export type GovInfoItem = {
  list: LinkItem[]
  name: string
  path: string
  to?: string
}

export type Path = {
  path: string
  title: string
}
export interface ResGovInfo {
  level: number
  list: GovInfoItem[]
  paths?: Path[]
}
export const req = (key: string) =>
  requestProxy<ResGovInfo>({
    method: 'get',
    url: `/list/${key}`
  })
