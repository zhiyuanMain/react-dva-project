import { tuple } from 'src/utils/type'

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
const CHANNEL_CONSTANTS = channelList.reduce(
  (prevVal, currentVal) => ({
    ...prevVal,
    [`${currentVal}`]: currentVal
  }),
  {} as { [key in ChannelType]: string }
)
console.log(CHANNEL_CONSTANTS)

export default CHANNEL_CONSTANTS
