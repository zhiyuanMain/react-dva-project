import moment from 'moment'

/**
 * 获取当前星期几
 * @returns
 */
export const getToday = () => {
  return moment().format('YYYY/MM/DD dddd')
}

/**
 * 获取今天
 */

export const getTodayYMD = () => {
  return moment().format('YYYY/MM/DD')
}

export const formatTime = (time: number) => {
  return moment(time).format('YYYY/MM/DD')
}
