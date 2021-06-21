import moment from 'moment'

/**
 * 获取当前星期几
 * @returns
 */
export const getToday = () => {
  return moment().format('YYYY/MM/DD dddd')
}
