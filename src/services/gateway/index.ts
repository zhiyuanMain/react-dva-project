import * as banner from './banner'
import * as news from './news'
import * as article from './article'

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
  article
}

export default gateway
