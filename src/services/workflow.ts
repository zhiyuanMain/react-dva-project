// import request from '../utils/request'
// import serviceList from './vars'

export interface FetchUserGroupResopnseItem {
  id: number
  name: string
  remarks: string
  roleId: number
  type: string
  uuid: string
}
export function fetchUserGroup() {
  // return request<FetchUserGroupResopnseItem[]>({
  //   url: `${constant.basicServer()}/v1/sys/organization/userGroup`,
  //   method: 'get',
  //   data: {
  //     a: 1,
  //     b: 2
  //   }
  // })
  return Promise.resolve([
    { name: '1', id: 1 },
    { name: 2, id: 2 }
  ])
}
