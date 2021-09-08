import { ChannelType } from 'src/constant/channel'
import requestProxy from 'src/utils/request'
import { ResArticle } from './article'

export type ResPrivateChannel = ResArticle
export const req = (key?: ChannelType) =>
  requestProxy<ResPrivateChannel>({
    method: 'get',
    url: `/list/${key}`
  })
