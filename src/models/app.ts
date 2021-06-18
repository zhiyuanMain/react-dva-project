import { GlobalConfigsRes } from 'src/interfaces/config'
import { fetchMockName, FetchMockNameParams } from '../services/app'

const initStates = {
  name: `${process.env.REACT_APP_NAME}`,
  globalConfigs: {} as Partial<GlobalConfigsRes>
}

export type AppState = typeof initStates

const appModel: dvaRoot.DvaModel = {
  namespace: 'app',
  state: {
    ...initStates
  },

  effects: {
    *asyncUpdateName(action: dvaRoot.Action, effects: dvaRoot.Effects) {
      const { payload } = action
      const { call, put } = effects
      const params: FetchMockNameParams = {
        requestName: payload
      }

      const resName = yield call(fetchMockName, params)
      yield put({
        type: 'updateName',
        payload: resName
      })
    }
  },

  reducers: {
    updateName(state: AppState, action: dvaRoot.Action) {
      return {
        ...state,
        name: action.payload
      }
    },
    resetName(state: AppState) {
      return {
        ...state,
        name: initStates.name
      }
    },
    setGlobalConfigs(state: AppState, action: dvaRoot.Action) {
      return {
        ...state,
        globalConfigs: action.payload
      }
    }
  }
}
export default appModel
