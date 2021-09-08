import { ChannelContentType } from 'src/constant/channel'
import requestProxy from 'src/utils/request'
import { LinkItem } from './index'

export interface ResChannel {
  level: 1 | 2
  list: LinkItem[]
  pageNumber: number
  pageSize: number
  totalPage: number
  totalRow: number
  yphLists: LinkItem[] // 月排行
  zphLists: LinkItem[] // 总排行
}
export const req = (channelKey: ChannelContentType, pageNumber = 1) =>
  requestProxy<ResChannel>({
    method: 'get',
    url: `/list/${channelKey}?pageNumber=${pageNumber}&pageSize=25`
  })
