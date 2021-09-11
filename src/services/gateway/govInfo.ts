import requestProxy from 'src/utils/request'
import { LinkItem } from './index'
type GovInfoItem = {
  list: LinkItem[]
  name: string
  path: string
}
export interface ResGovInfo {
  level: number
  list: GovInfoItem[]
}
export const req = () =>
  requestProxy<ResGovInfo>({
    method: 'get',
    url: '/list/zfxxgk'
  })
