import requestProxy from 'src/utils/request'
import { LinkItem } from './index'

export interface ResNews {
  dflz: LinkItem[]
  noticeMsg: LinkItem[]
  qxdt: LinkItem[]
  realtimeNews: []
}
export const req = () =>
  requestProxy<ResNews>({
    method: 'get',
    url: '/queryNews.json'
  })
