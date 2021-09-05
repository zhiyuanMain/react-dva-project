import requestProxy from 'src/utils/request'
import { LinkItem } from './index'

export interface ResItem extends LinkItem {
  summary: string
}
export interface ResBanner {
  bannerInfo: ResItem[]
}
export const req = () =>
  requestProxy<ResBanner>({
    method: 'get',
    url: '/queryBannerInfo.json'
  })
