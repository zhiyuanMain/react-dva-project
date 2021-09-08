import * as banner from './banner'
import * as news from './news'
import * as article from './article'
import * as articleRef from './articleRef'
import * as privateChannel from './privateChannel'
import * as channel from './channel'

export interface LinkItem {
  id: string
  img: string
  name: string
  title: string
  to: string
  publishTime: number
}

const gateway = {
  banner,
  news,
  article,
  articleRef,
  privateChannel,
  channel
}

export default gateway
