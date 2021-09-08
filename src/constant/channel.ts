import { tuple } from 'src/utils/type'

// const channelList = [
//   {key: 'cityBureauProfile', title: '市局概况'},
//   {key: 'functionIntroduction', title: '职能介绍'},
//   {key: 'onlineServices', title: '网上服务'},
//   {key: 'openGovernmentAffairs', title: '政务公开'},
//   {key: 'replyFromNetizens', title: '网民回复'},
//   {key: 'specialColumn', title: '专题专栏'},
//   {key: 'otherInformation', title: '其他资讯'},
//   {key: 'latestNews', title: '最新要闻'},
//   {key: 'notice', title: '通知公告'},
//   {key: 'DistrictCountyNews', title: '区县动态'},
//   {key: 'PartyConduct', title: '党风廉政'},
//   {key: 'latestPublication', title: '最新公开'}
// ]
const channelList = tuple(
  'sjgk', // 市局概况
  'znjs', // 职能介绍
  'wsfw', // 网上服务
  'zwgk', // 政务公开
  'wmhf', // 网民回复
  'ztzl', // 专题专栏
  'dfjs', // 党风建设
  'ldjs', // 领导介绍
  'zwgk', // 政务公开
  'bgxz', // 表格下载
  'wsdc', // 网上调查
  'spxw', // 视频新闻
  'ltqy', // 龙头企业
  'kjjy', // 科技教育
  'zcfg', // 政策法规
  'zhzf', // 综合执法
  'zlaq', // 质量安全
  'ycyp', // 一村一品
  'gscy', // 果桑茶艺
  'njgl', // 农经管理
  'zzny' // 种子能源
)

export type ChannelType = typeof channelList[number]
export type ChannelContentType = Omit<ChannelType, 'sjgk' | 'znjs' | 'ldjs'>
const CHANNEL_CONSTANTS = channelList.reduce(
  (prevVal, currentVal) => ({
    ...prevVal,
    [`${currentVal}`]: currentVal
  }),
  {} as { [key in ChannelType]: string }
)

export default CHANNEL_CONSTANTS
