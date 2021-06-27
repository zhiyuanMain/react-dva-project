import { appStore } from 'src/App'
import { GlobalConfigsRes } from 'src/interfaces/config'

export default async (): Promise<GlobalConfigsRes> => {
  const globalConfigs: GlobalConfigsRes = {
    settings: {
      lang: 'zh-CN',
      langUnion: ['zh-CN', 'en-US'],
      themeMode: 'lightMode',
      themeModeUnion: ['lightMode', 'darkMode']
    },
    token: ''
  }
  // console.info(globalConfigs)
  return new Promise((resolve) => {
    // 这里可以做ReactDOM.render之前的所有准备工作
    appStore.dispatch({
      type: 'app/setGlobalConfigs',
      payload: { ...globalConfigs }
    })
    resolve(globalConfigs)
  })
}
