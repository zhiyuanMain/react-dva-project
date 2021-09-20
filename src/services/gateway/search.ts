import requestProxy from 'src/utils/request'
import { LinkItem } from './index'

export interface ResSearch {
  list: LinkItem[]
}
export const req = (keywords = '') =>
  requestProxy<ResSearch>({
    method: 'get',
    url: `/page/search?time=&sort=1&keywords=${keywords || undefined}`
  })
