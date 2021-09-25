import moment from 'moment'

/**
 * 获取当前具体时间
 * @returns
 */
export const getCurrentTime = () => {
  return moment().format('YYYY/MM/DD dddd HH:mm:ss')
}

/**
 * 获取今天
 */

export const getTodayYMD = () => {
  return moment().format('YYYY/MM/DD')
}

export const formatTime = (time: number) => {
  return moment(time).format('YYYY-MM-DD')
}
