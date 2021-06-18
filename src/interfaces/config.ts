import * as SETTINGS_CONSTANTS from '../constant/configs'
/**
 * 支持的语言包集合
 */
export type LangUnionProps = typeof SETTINGS_CONSTANTS.LNG_UNION
/**
 * 支持的语言包
 */
export type LangProps = typeof SETTINGS_CONSTANTS.LNG_UNION[number]
/**
 * 支持的主题色集合
 */
export type ThemeModeUnionProps = typeof SETTINGS_CONSTANTS.THEME_UNION
/**
 * 支持的主题色
 */
export type ThemeModeProps = typeof SETTINGS_CONSTANTS.THEME_UNION[number]

export interface GlobalConfigsRes {
  settings: {
    langUnion: LangUnionProps
    lang: LangProps
    themeModeUnion: ThemeModeUnionProps
    themeMode: ThemeModeProps
  }
  token: string
}
