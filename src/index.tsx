import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import * as serviceWorker from './serviceWorker'
import { ConfigProvider } from 'antd'
import { I18nextProvider } from 'react-i18next'
import 'moment/locale/zh-cn'
import i18nConfig from './i18next'
import App from './App'
import './index.less'
import startUp from './utils/startUp'
import { LangProps, LangUnionProps, ThemeModeProps } from './interfaces/config'
import zhCN from 'antd/lib/locale/zh_CN'
import enUS from 'antd/lib/locale/en_US'
// import { GlobalModal } from './components'

interface RootProps {
  langUnion: LangUnionProps
  lang: LangProps
  themeMode: ThemeModeProps
}

class Root extends React.Component<RootProps, {}> {
  lang: LangProps
  antdLocale: any
  constructor(props: Readonly<RootProps>) {
    super(props)
    // 设置语言
    this.lang = props.lang
    this.antdLocale = zhCN
    if (this.lang === 'en-US') {
      this.antdLocale = enUS
    } else {
      this.antdLocale = zhCN
    }
  }

  state = {
    appAreConfigs: {
      themeMode: this.props.themeMode,
      localeValue: this.props.lang
    }
  }

  componentDidMount(): void {
    this.init()
  }

  componentWillUnmount(): void {}

  init = () => {}

  render(): JSX.Element {
    const { lang, langUnion } = this.props
    return (
      <AppContainer>
        <ConfigProvider locale={this.antdLocale}>
          <I18nextProvider i18n={i18nConfig(lang, langUnion)}>
            <React.Fragment>
              {/* <GlobalModal /> */}
              <App />
            </React.Fragment>
          </I18nextProvider>
        </ConfigProvider>
      </AppContainer>
    )
  }
}

startUp().then((res) => {
  ReactDOM.render(
    <Root
      lang={res.settings.lang}
      langUnion={res.settings.langUnion}
      themeMode={res.settings.themeMode}
    />,
    document.getElementById('root') as HTMLElement
  )
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
