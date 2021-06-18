import { tuple } from '../utils/type'
/**
 * 支持的语言包
 */
export const LNG_UNION = tuple('zh-CN', 'en-US')

/**
 * 支持的主题色
 */
export const THEME_UNION = tuple('lightMode', 'darkMode')

/**
 * adp主题色
 */
export const ADP_THEME_UNION = tuple('default', 'dark')

/**
 * 运行平台
 */
export const PLATFORM_UNION = tuple('ARE', 'ADP')
