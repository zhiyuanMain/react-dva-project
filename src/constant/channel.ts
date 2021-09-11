import { tuple } from 'src/utils/type'

const channelList = tuple(
  'sjgk', // 市局概况 article
  'znjs', // 职能介绍 article
  'ldjs', // 领导介绍 article
  'wsdc', // 网上调查
  'zwgk', // 政务公开 特殊1
  'wmhf', // 网民回复 特殊2
  'lyb', // 留言板   特殊3
  'ztzl', // 专题专栏
  'bszn', // 办事指南 第三方链接
  'zxyw', // 最新要闻
  'tzgg', // 通知公告
  'qxdt', // 区县动态
  'zcfg', // 政策法规
  'kjjy', // 科技教育
  'zlaq', // 质量安全
  'zhzf', // 综合执法
  'dflz', // 党风廉政
  'spxw', // 视频新闻
  'ltqy', // 龙头企业
  'ycyp', // 一村一品
  'gsyy', // 果桑园艺
  'njgl', // 农经管理
  'zzny', // 种子能源
  'bgxz', // 表格下载
  'wsdc' // 网上调查
)
export type ChannelType = typeof channelList[number]

export const channelRefArticleList = tuple(
  'sjgk', // 市局概况
  'znjs', // 职能介绍
  'ldjs' // 领导介绍
)
export type ChannelRefArticleList = typeof channelRefArticleList[number]

export type ChannelContentType = Omit<ChannelType, ChannelRefArticleList>
const CHANNEL_CONSTANTS = channelList.reduce(
  (prevVal, currentVal) => ({
    ...prevVal,
    [`${currentVal}`]: currentVal
  }),
  {} as { [key in ChannelType]: string }
)

export const CHANNEL_CONSTANTS_CFG = {
  [`${CHANNEL_CONSTANTS.sjgk}`]: { name: '市局概况', type: 'article' },
  [`${CHANNEL_CONSTANTS.znjs}`]: { name: '职能介绍', type: 'article' },
  [`${CHANNEL_CONSTANTS.ldjs}`]: { name: '领导介绍', type: 'article' },
  [`${CHANNEL_CONSTANTS.wsdc}`]: { name: '网上调查', type: 'list' },
  [`${CHANNEL_CONSTANTS.zwgk}`]: { name: '政务公开', type: 'privateLink1' },
  [`${CHANNEL_CONSTANTS.wmhf}`]: { name: '网民回复', type: 'privateLink2' },
  [`${CHANNEL_CONSTANTS.lyb}`]: { name: '我要留言', type: 'privateLink3' },
  [`${CHANNEL_CONSTANTS.ztzl}`]: { name: '专题专栏', type: 'list' },
  [`${CHANNEL_CONSTANTS.bszn}`]: { name: '办事指南', type: 'hyperLink' },
  [`${CHANNEL_CONSTANTS.zxyw}`]: { name: '最新要闻', type: 'list' },
  [`${CHANNEL_CONSTANTS.tzgg}`]: { name: '通知公告', type: 'list' },
  [`${CHANNEL_CONSTANTS.qxdt}`]: { name: '区县动态', type: 'list' },
  [`${CHANNEL_CONSTANTS.zcfg}`]: { name: '政策法规', type: 'list' },
  [`${CHANNEL_CONSTANTS.kjjy}`]: { name: '科技教育', type: 'list' },
  [`${CHANNEL_CONSTANTS.zlaq}`]: { name: '质量安全', type: 'list' },
  [`${CHANNEL_CONSTANTS.zhzf}`]: { name: '综合执法', type: 'list' },
  [`${CHANNEL_CONSTANTS.dflz}`]: { name: '党风廉政', type: 'list' },
  [`${CHANNEL_CONSTANTS.spxw}`]: { name: '视频新闻', type: 'list' },
  [`${CHANNEL_CONSTANTS.ltqy}`]: { name: '龙头企业', type: 'list' },
  [`${CHANNEL_CONSTANTS.ycyp}`]: { name: '一村一品', type: 'list' },
  [`${CHANNEL_CONSTANTS.gsyy}`]: { name: '果桑园艺', type: 'list' },
  [`${CHANNEL_CONSTANTS.njgl}`]: { name: '农经管理', type: 'list' },
  [`${CHANNEL_CONSTANTS.zzny}`]: { name: '种子能源', type: 'list' },
  [`${CHANNEL_CONSTANTS.bgxz}`]: { name: '表格下载', type: 'list' },
  [`${CHANNEL_CONSTANTS.wsdc}`]: { name: '网上调查', type: 'list' }
}

export default CHANNEL_CONSTANTS
