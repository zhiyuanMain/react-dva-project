import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { LangProps, LangUnionProps } from 'src/interfaces/config'
import enUS from './locales/enUS'
import zhCN from './locales/zhCN'

const i18nConfig = (lng: LangProps, lngUnion: LangUnionProps) => {
  const resources = {
    [`${lngUnion[0]}`]: { ...zhCN },
    [`${lngUnion[1]}`]: { ...enUS }
  }
  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      resources,
      lng,
      keySeparator: false, // we do not use keys in form messages.welcome
      interpolation: {
        escapeValue: false // react already safes from xss
      }
    })
  return i18n
}

export { i18n as i18nInstance }
export default i18nConfig
