import moment from 'moment'
import { fetchUserGroup, FetchUserGroupResopnseItem } from '../services/workflow'

const dateFormat = 'YYYY-MM-DD HH:mm:ss'

const initStates = {
  beginTime: moment().format(dateFormat),
  endTime: moment().format(dateFormat),
  userGroup: [] as FetchUserGroupResopnseItem[]
}

export type WorkflowState = typeof initStates

const WorkflowStateModel: dvaRoot.DvaModel = {
  namespace: 'workflow',
  state: {
    ...initStates
  },

  effects: {
    *queryUserGroup(action: dvaRoot.Action, effects: dvaRoot.Effects) {
      const { call, put } = effects
      // 判断接口是否正常返回，防止dva内部出错导致阻塞代码
      try {
        const res = yield call(fetchUserGroup, {
          ...action.payload
        })
        yield put({
          type: 'setUserGroup',
          payload: res
        })
        return res
      } catch (err) {
        console.log(err)
      }
    }
  },
  reducers: {
    setUserGroup(state: WorkflowState, action: dvaRoot.Action) {
      return {
        ...state,
        userGroup: action.payload
      }
    }
  }
}
export default WorkflowStateModel
