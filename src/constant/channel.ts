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
  'cityBureauProfile', // 市局概况
  'functionIntroduction', // 职能介绍
  'onlineServices', // 网上服务
  'openGovernmentAffairs', // 政务公开
  'replyFromNetizens', // 网民回复
  'specialColumn', // 专题专栏
  'otherInformation' // 其他资讯
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
