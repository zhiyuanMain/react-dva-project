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
  'qtzx' // 其他资讯
)

export type ChannelType = typeof channelList[number]
export type ChannelContentType = Omit<ChannelType, 'cityBureauProfile' | 'functionIntroduction'>
const CHANNEL_CONSTANTS = channelList.reduce(
  (prevVal, currentVal) => ({
    ...prevVal,
    [`${currentVal}`]: currentVal
  }),
  {} as { [key in ChannelType]: string }
)

export default CHANNEL_CONSTANTS
